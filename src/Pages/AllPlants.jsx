import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const categoryColors = {
  "flowering plants": "bg-pink-200 text-pink-800",
  ferns: "bg-green-200 text-green-800",
  succulents: "bg-yellow-200 text-yellow-800",
  trees: "bg-teal-200 text-teal-800",
  shrubs: "bg-purple-200 text-purple-800",
  herbs: "bg-indigo-200 text-indigo-800",
  "aquatic plants": "bg-blue-200 text-blue-800",
  vines: "bg-amber-200 text-amber-800",
  "indoor foliage": "bg-lime-200 text-lime-800",
  "carnivorous plants": "bg-red-200 text-red-800",
};

const wateringFrequencyColors = (days) => {
  if (days <= 3) return "bg-red-200 text-red-800";
  if (days <= 7) return "bg-yellow-200 text-yellow-800";
  return "bg-green-200 text-green-800";
};

const categoryDescriptions = {
  "flowering plants": "These plants produce flowers and need moderate care.",
  ferns: "Ferns prefer shady and moist environments.",
  succulents:
    "Succulents store water in their leaves and need less frequent watering.",
  trees: "Trees provide shade and oxygen, requiring long-term care.",
  shrubs: "Shrubs are bushy plants that can be decorative or functional.",
  herbs: "Herbs are aromatic plants used in cooking and medicine.",
  "aquatic plants": "Aquatic plants grow in or near water bodies.",
  vines: "Vines climb and spread, great for vertical gardens.",
  "indoor foliage": "Indoor foliage plants improve air quality inside homes.",
  "carnivorous plants": "Carnivorous plants trap insects for nutrients.",
};

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
      <h2 className="text-4xl font-extrabold mb-8 text-center text-[var(--primary)] tracking-wide drop-shadow-md">
        All Plants
      </h2>

      {/* Sorting Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {[
          { label: "Name", field: "Plant_Name" },
          { label: "Category", field: "Category" },
          { label: "Watering Frequency", field: "Watering_Frequency" },
        ].map(({ label, field }) => (
          <button
            key={field}
            onClick={() => handleSortChange(field)}
            className={`btn px-5 py-2 rounded-full font-semibold transition ${
              sortField === field
                ? "bg-[var(--accent)] text-white shadow-lg"
                : "bg-gray-100 text-gray-800 hover:bg-[var(--accent)] hover:text-white"
            }`}
          >
            Sort by {label}{" "}
            {sortField === field ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </button>
        ))}
      </div>

      {/* --- Table View for md+ --- */}
      <div className="hidden md:block overflow-x-auto w-full rounded-lg shadow-lg border border-gray-300">
        <table className="min-w-full bg-white dark:bg-[var(--base-100)] rounded-lg">
          <thead className="bg-[var(--primary)] text-white">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Plant</th>
              <th
                className="px-6 py-4 text-left font-semibold"
                data-tooltip-id="category-tooltip"
                data-tooltip-content="Plant category description"
              >
                Category
              </th>
              <th
                className="px-6 py-4 text-left font-semibold"
                data-tooltip-id="watering-tooltip"
                data-tooltip-content="How often to water this plant (in days)"
              >
                Watering Frequency
              </th>
              <th className="px-6 py-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlants.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No plants found.
                </td>
              </tr>
            ) : (
              sortedPlants.map((plant) => (
                <tr
                  key={plant._id}
                  className="border-b hover:bg-[var(--accent-light)]"
                >
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img
                      src={plant.Image || "/Images/placeholder-plant.png"}
                      alt={plant.Plant_Name}
                      className="w-12 h-12 rounded-lg object-cover shadow-md"
                    />
                    <span className="font-semibold text-lg text-[var(--primary)]">
                      {plant.Plant_Name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        categoryColors[plant.Category?.toLowerCase()] ||
                        "bg-gray-200 text-gray-700"
                      }`}
                      data-tooltip-id="category-desc-tooltip"
                      data-tooltip-content={
                        categoryDescriptions[plant.Category?.toLowerCase()] ||
                        "No description available"
                      }
                    >
                      {plant.Category}
                    </span>
                    <ReactTooltip id="category-desc-tooltip" />
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${wateringFrequencyColors(
                        plant.Watering_Frequency
                      )}`}
                      data-tooltip-id="watering-frequency-tooltip"
                      data-tooltip-content={`Water every ${
                        plant.Watering_Frequency
                      } day${plant.Watering_Frequency > 1 ? "s" : ""}`}
                    >
                      Every {plant.Watering_Frequency} day
                      {plant.Watering_Frequency > 1 ? "s" : ""}
                    </span>
                    <ReactTooltip id="watering-frequency-tooltip" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      to={`/plants/${plant._id}`}
                      className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white px-4 py-2 rounded-lg shadow-md transition"
                    >
                      <Eye size={18} />
                      View Details
                    </Link>
                    <ReactTooltip id="view-details-tooltip" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- Card View for Mobile (below md) --- */}
      <div className="md:hidden grid grid-cols-1 gap-6">
        {sortedPlants.map((plant) => (
          <div
            key={plant._id}
            className="relative bg-white/80 dark:bg-[var(--base-100)] backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-5 transition-transform hover:scale-[1.02]"
          >
            {/* Image & Name */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={plant.Image || "/Images/placeholder-plant.png"}
                alt={plant.Plant_Name}
                className="w-16 h-16 object-cover rounded-xl shadow-sm border border-green-300"
              />
              <h3 className="text-xl font-extrabold text-[var(--primary)] tracking-tight">
                {plant.Plant_Name}
              </h3>
            </div>

            {/* Category */}
            <div className="mb-2">
              <span className="block text-sm font-medium text-gray-500">
                Category
              </span>
              <span
                className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
                  categoryColors[plant.Category?.toLowerCase()] ||
                  "bg-gray-200 text-gray-700"
                }`}
              >
                {plant.Category}
              </span>
            </div>

            {/* Watering */}
            <div className="mb-4">
              <span className="block text-sm font-medium text-gray-500">
                Watering
              </span>
              <span
                className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full ${wateringFrequencyColors(
                  plant.Watering_Frequency
                )}`}
              >
                Every {plant.Watering_Frequency} day
                {plant.Watering_Frequency > 1 ? "s" : ""}
              </span>
            </div>

            {/* View Button */}
            <Link
              to={`/plants/${plant._id}`}
              className="inline-flex items-center justify-center gap-2 w-full mt-2 py-2 text-sm font-semibold text-white bg-[var(--accent)] hover:bg-[var(--accent-dark)] rounded-xl shadow-md transition"
            >
              <Eye size={18} />
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* Tooltips */}
      <ReactTooltip id="category-tooltip" />
      <ReactTooltip id="watering-tooltip" />
    </section>
  );
};

export default AllPlants;
