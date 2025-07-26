import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BeginnerFriendlyPlants = () => {
  const [easyPlants, setEasyPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://leafy-server-seven.vercel.app/plants")
      .then((res) => res.json())
      .then((data) => {
        const veryEasy = data.filter(
          (plant) => plant.Care_Level?.toLowerCase() === "very easy"
        );
        setEasyPlants(veryEasy.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch beginner-friendly plants:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading beginner plants...</p>;
  if (!easyPlants.length)
    return (
      <p className="text-center text-gray-500">No beginner plants found.</p>
    );

  return (
    <section className="my-12 px-4 lg:px-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-[var(--neutral)]">
        🪴 Beginner-Friendly Plants
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {easyPlants.map((plant) => (
          <div
            key={plant._id}
            className="bg-[var(--base-100)] border border-[var(--secondary)] rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <img
              src={plant.Image}
              alt={plant.Plant_Name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-bold text-[var(--accent)]">
                {plant.Plant_Name}
              </h3>
              <p className="text-sm text-[var(--neutral)] opacity-80">
                {plant.Description?.length > 90
                  ? plant.Description.slice(0, 90) + "..."
                  : plant.Description}
              </p>
              <div className="text-sm text-[var(--neutral)] space-y-1">
                <p>
                  <span className="font-medium">Care:</span> {plant.Care_Level}
                </p>
                <p>
                  <span className="font-medium">Watering:</span> Every{" "}
                  {plant.Watering_Frequency} day(s)
                </p>
              </div>
              <Link
                to={`/plants/${plant._id}`}
                className="inline-block mt-4 text-center bg-[var(--info)] text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition font-semibold"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BeginnerFriendlyPlants;
