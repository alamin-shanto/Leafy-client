import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../Context/AuthContext";
import {
  Sprout,
  Info,
  Tag,
  Droplet,
  HeartHandshake,
  Calendar,
  User,
  Mail,
} from "lucide-react";

// Utility for formatting date inputs
const normalizeDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const localDate = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
};

const UpdatePlant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    Plant_Name: "",
    Description: "",
    Category: "",
    Care_Level: "",
    Watering_Frequency: 1,
    Health: 100,
    Last_Watering_Date: "",
    Next_Watering_Date: "",
    UserName: "",
    Email: "",
    Image: "",
  });

  useEffect(() => {
    fetch(`https://leafy-server-seven.vercel.app/plants/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch plant");
        return res.json();
      })
      .then((data) => {
        setFormData({
          Plant_Name: data.Plant_Name || "",
          Description: data.Description || "",
          Category: data.Category || "",
          Care_Level: data.Care_Level || "",
          Watering_Frequency: data.Watering_Frequency || 1,
          Health: data.Health || 100,
          Last_Watering_Date: normalizeDate(data.Last_Watering_Date),
          Next_Watering_Date: normalizeDate(data.Next_Watering_Date),
          UserName: data.UserName || user?.displayName || "",
          Email: data.Email || user?.email || "",
          Image: data.Image || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        Swal.fire("Error", "Could not load plant data", "error", err.message);
        setLoading(false);
      });
  }, [id, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user || user.email !== formData.Email) {
      Swal.fire(
        "Unauthorized",
        "You're not allowed to update this plant",
        "error"
      );
      return;
    }

    const updatedPlant = {
      ...formData,
      Watering_Frequency: Number(formData.Watering_Frequency),
      Health: Number(formData.Health),
    };

    fetch(`https://leafy-server-seven.vercel.app/plants/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPlant),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update plant");
        return res.json();
      })
      .then(() => {
        Swal.fire("Updated!", "Plant updated successfully", "success").then(
          () => navigate("/myplants")
        );
      })
      .catch((err) =>
        Swal.fire("Error", err.message || "Update failed", "error")
      );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-500">Loading Plant Info...</p>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto p-8 mt-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
      <Link
        to="/myplants"
        className="inline-block mb-6 text-green-500 font-medium hover:underline"
      >
        ← Back to My Plants
      </Link>

      <h2 className="text-4xl font-extrabold text-green-700 mb-10">
        Update Your Plant 🌿
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputWithIcon
          label="Plant Name"
          name="Plant_Name"
          icon={<Sprout />}
          value={formData.Plant_Name}
          onChange={handleChange}
          required
        />
        <TextareaWithIcon
          label="Description"
          name="Description"
          icon={<Info />}
          value={formData.Description}
          onChange={handleChange}
          required
        />

        <div className="grid md:grid-cols-2 gap-6">
          <SelectWithIcon
            label="Category"
            name="Category"
            icon={<Tag />}
            options={[
              "flowering plants",
              "ferns",
              "succulents",
              "trees",
              "shrubs",
              "herbs",
              "aquatic plants",
              "vines",
              "indoor foliage",
              "carnivorous plants",
            ]}
            value={formData.Category}
            onChange={handleChange}
            required
          />
          <SelectWithIcon
            label="Care Level"
            name="Care_Level"
            icon={<HeartHandshake />}
            options={["very easy", "easy", "moderate", "difficult"]}
            value={formData.Care_Level}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <InputWithIcon
            label="Watering Frequency (days)"
            name="Watering_Frequency"
            type="number"
            icon={<Droplet />}
            value={formData.Watering_Frequency}
            onChange={handleChange}
            min={1}
            required
          />
          <InputWithIcon
            label="Health (%)"
            name="Health"
            type="number"
            icon={<HeartHandshake />}
            value={formData.Health}
            onChange={handleChange}
            min={0}
            max={100}
            required
          />
        </div>

        <InputWithIcon
          label="Image URL"
          name="Image"
          type="url"
          icon={<Info />}
          value={formData.Image}
          onChange={handleChange}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <InputWithIcon
            label="Last Watered Date"
            name="Last_Watering_Date"
            type="date"
            icon={<Calendar />}
            value={formData.Last_Watering_Date}
            onChange={handleChange}
          />
          <InputWithIcon
            label="Next Watering Date"
            name="Next_Watering_Date"
            type="date"
            icon={<Calendar />}
            value={formData.Next_Watering_Date}
            onChange={handleChange}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <InputWithIcon
            label="User Name"
            name="UserName"
            icon={<User />}
            value={formData.UserName}
            onChange={handleChange}
            disabled
          />
          <InputWithIcon
            label="Email"
            name="Email"
            type="email"
            icon={<Mail />}
            value={formData.Email}
            onChange={handleChange}
            disabled
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 mt-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300"
        >
          Update Plant
        </button>
      </form>
    </section>
  );
};

// === REUSABLE COMPONENTS ===

const InputWithIcon = ({ label, icon, ...props }) => (
  <div>
    <label
      htmlFor={props.name}
      className="block text-sm font-semibold mb-1 text-gray-800"
    >
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500">
        {icon}
      </div>
      <input
        {...props}
        className={`pl-10 pr-4 py-3 w-full rounded-lg border bg-white/30 backdrop-blur-md text-gray-900 font-medium border-green-300 
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
          transition-shadow duration-200 ${
            props.disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
      />
    </div>
  </div>
);

const TextareaWithIcon = ({ label, icon, ...props }) => (
  <div>
    <label
      htmlFor={props.name}
      className="block text-sm font-semibold mb-1 text-gray-800"
    >
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-3 top-3 text-green-500">{icon}</div>
      <textarea
        {...props}
        rows={4}
        className="pl-10 pr-4 py-3 w-full rounded-lg border bg-white/30 backdrop-blur-md text-gray-900 font-medium border-green-300 
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
          transition-shadow duration-200 resize-none"
      />
    </div>
  </div>
);

const SelectWithIcon = ({ label, icon, options, ...props }) => (
  <div>
    <label
      htmlFor={props.name}
      className="block text-sm font-semibold mb-1 text-gray-800"
    >
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500">
        {icon}
      </div>
      <select
        {...props}
        className="pl-10 pr-4 py-3 w-full rounded-lg border bg-white/30 backdrop-blur-md text-gray-900 font-medium border-green-300 
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
          transition-shadow duration-200"
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt[0].toUpperCase() + opt.slice(1)}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default UpdatePlant;
