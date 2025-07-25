import React from "react";
import { Droplet, Sun, Leaf, ThermometerSnowflake, Bug } from "lucide-react";

const mistakes = [
  {
    icon: <Droplet className="text-blue-500 w-6 h-6" />,
    title: "Overwatering",
    desc: "Too much water suffocates roots and causes rot. Always let the soil dry slightly before watering again.",
  },
  {
    icon: <Sun className="text-yellow-500 w-6 h-6" />,
    title: "Insufficient Light",
    desc: "Plants need light for photosynthesis. Know your plant’s light needs—shade, indirect, or direct sunlight.",
  },
  {
    icon: <Leaf className="text-green-500 w-6 h-6" />,
    title: "Ignoring Dead Leaves",
    desc: "Not trimming dead leaves can attract pests and slow plant growth. Keep your plant clean and tidy.",
  },
  {
    icon: <ThermometerSnowflake className="text-purple-500 w-6 h-6" />,
    title: "Wrong Temperature",
    desc: "Sudden cold drafts or extreme heat can shock your plant. Keep them in a stable environment.",
  },
  {
    icon: <Bug className="text-red-500 w-6 h-6" />,
    title: "Neglecting Pests",
    desc: "Ignoring pests like spider mites or aphids can cause serious damage. Regularly inspect and treat them.",
  },
];

const TopPlantCareMistakes = () => {
  return (
    <section className="my-16 px-4 lg:px-12">
      <h2 className="text-4xl font-bold text-center text-[var(--primary)] mb-6">
        🌿 Top Plant Care Mistakes
      </h2>
      <p className="text-center text-lg text-[var(--neutral)] mb-10 max-w-3xl mx-auto">
        Avoid these common mistakes to keep your green friends thriving and
        happy.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {mistakes.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[var(--card-bg)] p-6 rounded-xl border shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center mb-4 gap-4">
              <div className="bg-gray-100 p-3 rounded-full shadow-inner">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-[var(--accent)]">
                {item.title}
              </h3>
            </div>
            <p className="text-[var(--text)] text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopPlantCareMistakes;
