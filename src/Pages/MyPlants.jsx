import React, { useEffect, useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import Swal from "sweetalert2";

const normalizeDate = (date) => {
  if (!date) return "";
  if (typeof date === "string") return date.slice(0, 10);
  return new Date(date).toISOString().slice(0, 10);
};

const MyPlants = () => {
  const { user } = useContext(AuthContext);
  const [myPlants, setMyPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPlantId, setEditingPlantId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const fetchPlants = useCallback(() => {
    if (!user?.email) return;
    setLoading(true);
    fetch(`http://localhost:3000/plants?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((plant) => plant.Email === user.email);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        filtered.forEach((plant) => {
          const nextWatering = new Date(plant.Next_Watering_Date);
          nextWatering.setHours(0, 0, 0, 0);

          if (nextWatering.getTime() === today.getTime()) {
            const updatedPlant = {
              ...plant,
              Last_Watering_Date: normalizeDate(today),
              Next_Watering_Date: normalizeDate(
                new Date(
                  today.getTime() +
                    plant.Watering_Frequency * 24 * 60 * 60 * 1000
                )
              ),
            };

            // Update backend
            fetch(`http://localhost:3000/plants/${plant._id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatedPlant),
            }).catch((err) => console.error("Auto update failed:", err));

            // Update local copy
            Object.assign(plant, updatedPlant);
          }
        });

        setMyPlants(filtered);
      })
      .catch((err) => console.error("Failed to fetch plants:", err))
      .finally(() => setLoading(false));
  }, [user?.email]);

  useEffect(() => {
    fetchPlants();
  }, [fetchPlants]);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this plant?")) return;

    fetch(`http://localhost:3000/plants/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete plant");
        setMyPlants((prev) => prev.filter((plant) => plant._id !== id));
      })
      .catch((err) => alert(err.message));
  };

  const handleEditClick = (plant) => {
    setEditingPlantId(plant._id);
    setEditFormData({
      Plant_Name: plant.Plant_Name || "",
      Description: plant.Description || "",
      Category: plant.Category || "",
      Care_Level: plant.Care_Level || "",
      Watering_Frequency: plant.Watering_Frequency || 0,
      Health: plant.Health || 0,
      Last_Watering_Date: normalizeDate(plant.Last_Watering_Date),
      Next_Watering_Date: normalizeDate(plant.Next_Watering_Date),
      UserName: plant.UserName || "",
      Email: plant.Email || "",
      Image: plant.Image || "",
    });
  };

  const handleCancelEdit = () => {
    setEditingPlantId(null);
    setEditFormData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updateData = {
      Plant_Name: editFormData.Plant_Name,
      Description: editFormData.Description,
      Category: editFormData.Category,
      Care_Level: editFormData.Care_Level,
      Watering_Frequency: Number(editFormData.Watering_Frequency),
      Health: Number(editFormData.Health),
      Last_Watering_Date: editFormData.Last_Watering_Date,
      Next_Watering_Date: editFormData.Next_Watering_Date,
      UserName: editFormData.UserName,
      Email: editFormData.Email,
      Image: editFormData.Image,
    };

    fetch(`http://localhost:3000/plants/${editingPlantId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update plant");
        return res.json();
      })
      .then(() => {
        Swal.fire("Updated!", "Plant info updated successfully", "success");
        setEditingPlantId(null);
        setMyPlants((prev) =>
          prev.map((plant) =>
            plant._id === editingPlantId ? { ...plant, ...updateData } : plant
          )
        );
      })
      .catch((err) => Swal.fire("Error", err.message, "error"));
  };

  if (loading)
    return <p className="text-center mt-10">Loading your plants...</p>;

  if (!myPlants.length)
    return (
      <p className="text-center mt-10 text-gray-500">
        You have no plants added yet.
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-[var(--primary)]">
        My Plants
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {myPlants.map((plant) =>
          editingPlantId === plant._id ? (
            <EditPlantForm
              key={plant._id + "-edit"}
              formData={editFormData}
              onChange={handleChange}
              onCancel={handleCancelEdit}
              onSubmit={handleUpdate}
            />
          ) : (
            <PlantCard
              key={plant._id}
              plant={plant}
              onEdit={() => handleEditClick(plant)}
              onDelete={() => handleDelete(plant._id)}
            />
          )
        )}
      </div>
    </div>
  );
};

const PlantCard = ({ plant, onEdit, onDelete }) => (
  <div className="card p-6 rounded-xl shadow-md bg-[var(--card-bg)] border border-[var(--border-color)] hover:shadow-lg transition relative flex flex-col">
    {plant.Image ? (
      <img
        src={plant.Image}
        alt={plant.Plant_Name}
        className="w-full h-48 object-cover rounded-lg mb-4"
        loading="lazy"
      />
    ) : (
      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400">
        No Image
      </div>
    )}
    <h2 className="text-xl font-semibold mb-2 text-[var(--primary)]">
      {plant.Plant_Name}
    </h2>
    <p className="text-[var(--text)] mb-2">{plant.Description}</p>
    <ul className="text-sm text-[var(--neutral)] mb-4 space-y-1 flex-grow">
      <li>
        <strong>Category:</strong> {plant.Category}
      </li>
      <li>
        <strong>Care Level:</strong> {plant.Care_Level}
      </li>
      <li>
        <strong>Watering Frequency:</strong> {plant.Watering_Frequency} days
      </li>
      <li>
        <strong>Health:</strong> {plant.Health}%
      </li>
      <li>
        <strong>Last Watered:</strong>{" "}
        {plant.Last_Watering_Date
          ? plant.Last_Watering_Date.slice(0, 10)
          : "N/A"}
      </li>
      <li>
        <strong>Next Watering:</strong>{" "}
        {plant.Next_Watering_Date
          ? plant.Next_Watering_Date.slice(0, 10)
          : "N/A"}
      </li>
    </ul>
    <div className="flex gap-3 mt-auto">
      <button
        onClick={onEdit}
        className="btn bg-[var(--info)] hover:bg-[var(--accent)] text-white flex-grow"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="btn bg-red-600 hover:bg-red-700 text-white flex-grow"
      >
        Delete
      </button>
    </div>
  </div>
);

const EditPlantForm = ({ formData, onChange, onCancel, onSubmit }) => (
  <form
    onSubmit={onSubmit}
    className="card p-6 rounded-xl shadow-md bg-[var(--card-bg)] border border-[var(--border-color)] transition space-y-4"
  >
    {[
      { name: "Plant_Name", placeholder: "Plant Name", type: "text" },
      { name: "Description", placeholder: "Description", type: "text" },
      { name: "Category", placeholder: "Category", type: "text" },
      { name: "Care_Level", placeholder: "Care Level", type: "text" },
      {
        name: "Watering_Frequency",
        placeholder: "Watering Frequency",
        type: "number",
      },
      { name: "Health", placeholder: "Health", type: "number" },
      { name: "Last_Watering_Date", type: "date" },
      { name: "Next_Watering_Date", type: "date" },
      { name: "UserName", placeholder: "User Name", type: "text" },
      {
        name: "Email",
        placeholder: "User Email",
        type: "email",
        disabled: true,
      },
      { name: "Image", placeholder: "Image URL", type: "url" },
    ].map((field) => (
      <input
        key={field.name}
        type={field.type}
        name={field.name}
        value={formData[field.name] || ""}
        onChange={onChange}
        required={!field.disabled}
        placeholder={field.placeholder}
        className="input-field"
        disabled={field.disabled}
      />
    ))}
    <div className="flex justify-between gap-4">
      <button
        type="submit"
        className="btn bg-[var(--success)] hover:bg-green-600 text-white flex-grow"
      >
        Save
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="btn bg-gray-400 hover:bg-gray-500 text-white flex-grow"
      >
        Cancel
      </button>
    </div>
  </form>
);

export default MyPlants;
