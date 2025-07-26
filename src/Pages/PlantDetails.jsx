import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PlantNotFound from "./PlantNotFound";

const PlantDetails = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://leafy-server-seven.vercel.app/plants/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch plant");
        return res.json();
      })
      .then((data) => {
        setPlant(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Plant not found");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-green-700 p-6">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute top-0 left-0 w-full h-full border-8 border-t-green-600 border-b-green-400 border-l-transparent border-r-transparent rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-green-700 text-4xl">
            🌿
          </div>
        </div>
        <p className="text-xl font-semibold">Loading plant details...</p>
      </div>
    );
  }

  if (error === "Plant not found") {
    return <PlantNotFound />;
  }

  if (!plant) return null;

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <Link
        to="/allplants"
        className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-[var(--primary)] text-white font-medium rounded-full hover:bg-[var(--accent)] transition"
      >
        ← Back to All Plants
      </Link>

      <div className="bg-white dark:bg-[var(--card-bg)] p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-[var(--border-color)]">
        <img
          src={plant.Image}
          alt={plant.Plant_Name}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
        <h1 className="text-3xl font-bold text-[var(--primary)] mb-2">
          {plant.Plant_Name}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {plant.Description || "No description provided."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[var(--neutral)]">
          <Detail label="Category" value={plant.Category} />
          <Detail label="Care Level" value={plant.Care_Level} />
          <Detail
            label="Watering Frequency"
            value={`${plant.Watering_Frequency} day(s)`}
          />
          <Detail label="Health" value={`${plant.Health}%`} />
          <Detail
            label="Last Watered"
            value={plant.Last_Watering_Date?.slice(0, 10) || "N/A"}
          />
          <Detail
            label="Next Watering"
            value={plant.Next_Watering_Date?.slice(0, 10) || "N/A"}
          />
          <Detail label="User Name" value={plant.UserName} />
          <Detail label="Email" value={plant.Email} />
        </div>
      </div>
    </section>
  );
};

const Detail = ({ label, value }) => (
  <p>
    <span className="font-semibold">{label}:</span> {value}
  </p>
);

export default PlantDetails;
