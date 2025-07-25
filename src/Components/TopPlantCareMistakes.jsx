import React from "react";
import { Droplet, Sun, Leaf, Thermometer, Bug } from "lucide-react";

const TopPlantCareMistakes = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-extrabold text-[var(--primary)] mb-8 text-center">
        🌿 Top Plant Care Mistakes to Avoid
      </h2>
      <p className="text-center text-[var(--text)] max-w-3xl mx-auto mb-12 text-lg">
        Caring for your plants is rewarding, but common mistakes can hold them
        back. Learn the pitfalls and keep your green friends thriving!
      </p>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Mistake 1 */}
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
          <div className="bg-blue-500 rounded-full p-4 mb-5 inline-flex items-center justify-center shadow-md">
            <Droplet size={28} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold text-[var(--primary)] mb-3">
            Overwatering
          </h3>
          <p className="text-[var(--text)]">
            Too much water suffocates roots and causes rot. Always let the soil
            dry slightly before watering again.
          </p>
        </div>

        {/* Mistake 2 */}
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
          <div className="bg-yellow-400 rounded-full p-4 mb-5 inline-flex items-center justify-center shadow-md">
            <Sun size={28} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold text-[var(--primary)] mb-3">
            Insufficient Light
          </h3>
          <p className="text-[var(--text)]">
            Plants need light for photosynthesis. Know your plant’s light
            needs—shade, indirect, or direct sunlight.
          </p>
        </div>

        {/* Mistake 3 */}
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
          <div className="bg-green-500 rounded-full p-4 mb-5 inline-flex items-center justify-center shadow-md">
            <Leaf size={28} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold text-[var(--primary)] mb-3">
            Ignoring Dead Leaves
          </h3>
          <p className="text-[var(--text)]">
            Not trimming dead leaves can attract pests and slow plant growth.
            Keep your plant clean and tidy.
          </p>
        </div>

        {/* Mistake 4 */}
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
          <div className="bg-purple-500 rounded-full p-4 mb-5 inline-flex items-center justify-center shadow-md">
            <Thermometer size={28} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold text-[var(--primary)] mb-3">
            Wrong Temperature
          </h3>
          <p className="text-[var(--text)]">
            Sudden cold drafts or extreme heat can shock your plant. Keep them
            in a stable environment.
          </p>
        </div>

        {/* Mistake 5 */}
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
          <div className="bg-red-500 rounded-full p-4 mb-5 inline-flex items-center justify-center shadow-md">
            <Bug size={28} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold text-[var(--primary)] mb-3">
            Neglecting Pests
          </h3>
          <p className="text-[var(--text)]">
            Ignoring pests like spider mites or aphids can cause serious damage.
            Regularly inspect and treat them.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TopPlantCareMistakes;
