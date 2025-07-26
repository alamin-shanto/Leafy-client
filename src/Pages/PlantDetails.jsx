import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PlantNotFound from "./PlantNotFound";
import { Droplet, Calendar, Heart, User, Mail } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

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

const careLevelColors = {
  "very easy": "bg-green-300 text-green-900",
  easy: "bg-lime-300 text-lime-900",
  moderate: "bg-yellow-300 text-yellow-900",
  difficult: "bg-red-300 text-red-900",
};

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
    <section className="max-w-4xl mx-auto px-6 py-12">
      <Link
        to="/allplants"
        className="inline-flex items-center gap-2 mb-8 px-5 py-2 bg-[var(--primary)] text-white font-semibold rounded-full hover:bg-[var(--accent)] transition-shadow shadow-md"
      >
        ← Back to All Plants
      </Link>

      <div className="bg-white dark:bg-[var(--card-bg)] rounded-3xl shadow-2xl border border-gray-200 dark:border-[var(--border-color)] overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <img
            src={plant.Image || "/Images/placeholder-plant.png"}
            alt={plant.Plant_Name}
            className="w-full md:w-1/2 h-80 object-cover"
          />

          <div className="p-8 flex flex-col justify-between md:w-1/2">
            <div>
              <h1 className="text-4xl font-extrabold text-[var(--primary)] mb-4">
                {plant.Plant_Name}
              </h1>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {plant.Description || "No description provided."}
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <Badge
                  label={plant.Category}
                  className={categoryColors[plant.Category?.toLowerCase()]}
                />
                <Badge
                  label={plant.Care_Level}
                  className={careLevelColors[plant.Care_Level?.toLowerCase()]}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                <InfoItem
                  icon={<Droplet size={20} />}
                  label="Watering Frequency"
                  value={`Every ${plant.Watering_Frequency} day${
                    plant.Watering_Frequency > 1 ? "s" : ""
                  }`}
                />
                <InfoItem
                  icon={<Calendar size={20} />}
                  label="Last Watered"
                  value={
                    plant.Last_Watering_Date
                      ? `${format(
                          new Date(plant.Last_Watering_Date),
                          "PPP"
                        )} (${formatDistanceToNow(
                          new Date(plant.Last_Watering_Date)
                        )} ago)`
                      : "N/A"
                  }
                />
                <InfoItem
                  icon={<Calendar size={20} />}
                  label="Next Watering"
                  value={
                    plant.Next_Watering_Date
                      ? `${format(
                          new Date(plant.Next_Watering_Date),
                          "PPP"
                        )} (${formatDistanceToNow(
                          new Date(plant.Next_Watering_Date),
                          { addSuffix: true }
                        )})`
                      : "N/A"
                  }
                />

                <InfoItem
                  icon={<Heart size={20} />}
                  label="Health"
                  value={`${plant.Health}%`}
                  extra={
                    <progress
                      className="progress progress-success w-full"
                      value={plant.Health}
                      max="100"
                      aria-label="Health status progress bar"
                    />
                  }
                />
              </div>
            </div>

            <div className="mt-8 border-t border-gray-300 dark:border-gray-700 pt-6 text-sm text-gray-600 dark:text-gray-400">
              <p className="flex items-center gap-2">
                <User size={18} />{" "}
                <span className="font-semibold mr-1">User:</span>{" "}
                {plant.UserName || "Unknown"}
              </p>
              <p className="flex items-center gap-2 mt-2 break-all">
                <Mail size={18} />{" "}
                <span className="font-semibold mr-1">Email:</span>{" "}
                {plant.Email || "Unknown"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Badge = ({ label, className }) => (
  <span
    className={`inline-block px-4 py-1 rounded-full font-semibold text-sm uppercase tracking-wide ${
      className || "bg-gray-200 text-gray-700"
    }`}
  >
    {label}
  </span>
);

const InfoItem = ({ icon, label, value, extra }) => (
  <div className="flex flex-col">
    <div className="flex items-center gap-2 mb-1 text-[var(--primary)] font-semibold">
      {icon}
      {label}
    </div>
    <div className="text-[var(--neutral)] text-base">{value}</div>
    {extra && <div className="mt-1">{extra}</div>}
  </div>
);

export default PlantDetails;
