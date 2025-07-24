import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewPlants = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/plants")
      .then((res) => res.json())
      .then((data) => {
        const latestSix = data.reverse().slice(0, 6);
        setPlants(latestSix);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load plants:", err);
        setError("Failed to load plants");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <p className="text-center my-10 text-lg font-semibold">
        Loading plants...
      </p>
    );
  }

  if (error) {
    return <p className="text-center my-10 text-red-500">{error}</p>;
  }

  return (
    <section className="my-12 px-4 lg:px-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-[var(--neutral)]">
        🌱 Recently Added Plants
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {plants.map((plant) => (
          <div
            key={plant._id}
            className="bg-[var(--base-100)] border border-[var(--secondary)] rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <img
              src={plant.Image}
              alt={plant["Plant Name"]}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-bold text-[var(--accent)]">
                {plant["Plant Name"]}
              </h3>
              <p className="text-sm text-[var(--neutral)] opacity-80">
                {plant.Description?.length > 90
                  ? plant.Description.slice(0, 90) + "..."
                  : plant.Description}
              </p>
              <div className="text-sm text-[var(--neutral)] space-y-1">
                <p>
                  <span className="font-medium">Category:</span>{" "}
                  {plant.Category}
                </p>
                <p>
                  <span className="font-medium">Care:</span>{" "}
                  {plant["Care Level"]}
                </p>
                <p>
                  <span className="font-medium">Watering:</span> Every{" "}
                  {plant["Watering Frequency"]} day(s)
                </p>
                <p>
                  <span className="font-medium">Health:</span> {plant.Health}%
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

export default NewPlants;
