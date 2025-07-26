import React, { useEffect, useState, useContext, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import Swal from "sweetalert2";
import SubSpinner from "../Components/SubSpinner";

const normalizeDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const localDate = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
};

const MyPlants = () => {
  const { user } = useContext(AuthContext);
  const [myPlants, setMyPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPlants = useCallback(() => {
    if (!user?.email) return;
    setLoading(true);
    fetch(`https://leafy-server-seven.vercel.app/plants?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((plant) => plant.Email === user.email);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        filtered.forEach((plant) => {
          let lastWatered = new Date(plant.Last_Watering_Date);
          let nextWatering = new Date(plant.Next_Watering_Date);
          const freq = Number(plant.Watering_Frequency);

          lastWatered.setHours(0, 0, 0, 0);
          nextWatering.setHours(0, 0, 0, 0);

          let updated = false;
          while (nextWatering <= today) {
            lastWatered = new Date(nextWatering);
            nextWatering.setDate(nextWatering.getDate() + freq);
            updated = true;
          }

          if (updated) {
            const updatedPlant = {
              ...plant,
              Last_Watering_Date: normalizeDate(lastWatered),
              Next_Watering_Date: normalizeDate(nextWatering),
            };

            fetch(`https://leafy-server-seven.vercel.app/plants/${plant._id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatedPlant),
            }).catch((err) => console.error("Auto update failed:", err));

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
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your plant.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://leafy-server-seven.vercel.app/plants/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to delete plant");
            setMyPlants((prev) => prev.filter((plant) => plant._id !== id));
            Swal.fire("Deleted!", "Your plant has been deleted.", "success");
          })
          .catch((err) =>
            Swal.fire("Error", err.message || "Delete failed", "error")
          );
      }
    });
  };

  if (loading) return <SubSpinner />;

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
        {myPlants.map((plant) => (
          <PlantCard
            key={plant._id}
            plant={plant}
            onDelete={() => handleDelete(plant._id)}
            onUpdate={() => navigate(`/plants/update/${plant._id}`)}
          />
        ))}
      </div>
    </div>
  );
};

const PlantCard = ({ plant, onUpdate, onDelete }) => (
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
          ? normalizeDate(plant.Last_Watering_Date)
          : "N/A"}
      </li>
      <li>
        <strong>Next Watering:</strong>{" "}
        {plant.Next_Watering_Date
          ? normalizeDate(plant.Next_Watering_Date)
          : "N/A"}
      </li>
    </ul>
    <div className="flex gap-3 mt-auto">
      <button
        onClick={onUpdate}
        className="btn bg-[var(--info)] hover:bg-[var(--accent)] text-white flex-grow"
      >
        Update
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

export default MyPlants;
