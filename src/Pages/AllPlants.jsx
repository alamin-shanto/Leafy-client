import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllPlants = () => {
  const [plants, setPlants] = useState([]);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("https://leafy-server-seven.vercel.app/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data))
      .catch((err) => console.error("Failed to fetch plants", err));
  }, []);

  const sortedPlants = [...plants].sort((a, b) => {
    if (!sortField) return 0;
    const valueA = a[sortField];
    const valueB = b[sortField];

    if (typeof valueA === "string") {
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
  });

  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">All Plants</h2>

      {/* Sorting Controls */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        <button
          className="btn"
          onClick={() => handleSortChange("Watering_Frequency")}
        >
          Sort by Watering Frequency{" "}
          {sortField === "Watering_Frequency" ? `(${sortOrder})` : ""}
        </button>
        <button className="btn" onClick={() => handleSortChange("Health")}>
          Sort by Health {sortField === "Health" ? `(${sortOrder})` : ""}
        </button>
      </div>

      {/* Grid of Plant Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPlants.map((plant) => (
          <div key={plant._id} className="card">
            <img
              src={plant.Image}
              alt={plant["Plant_Name"]}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{plant.Plant_Name}</h3>

            <p className="text-sm mb-1">🌱 Category: {plant.Category}</p>
            <p className="text-sm mb-1">
              💧 Watering Frequency: {plant.Watering_Frequency} days
            </p>
            <p className="text-sm mb-1">❤️ Health: {plant.Health}%</p>
            <p className="text-sm mb-2">🧪 Care Level: {plant.Care_Level}</p>
            <Link
              to={`/plants/${plant._id}`}
              className="btn mt-2 w-full text-center"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllPlants;
