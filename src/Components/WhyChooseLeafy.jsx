import React from "react";
import { Sparkles, ShieldCheck, HeartHandshake, Bot } from "lucide-react";

const features = [
  {
    icon: <Sparkles size={28} />,
    title: "Personalized Plant Care",
    desc: "Get smart, plant-specific care tips to keep your greens healthy and happy.",
    color: "bg-gradient-to-tr from-green-400 to-lime-500",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Trusted Community",
    desc: "Join thousands of plant lovers who trust Leafy for advice and support.",
    color: "bg-gradient-to-tr from-emerald-400 to-teal-500",
  },
  {
    icon: <HeartHandshake size={28} />,
    title: "Eco-Friendly Mission",
    desc: "Every plant counts. Leafy promotes sustainable living and green practices.",
    color: "bg-gradient-to-tr from-pink-400 to-rose-500",
  },
  {
    icon: <Bot size={28} />,
    title: "AI-Powered Suggestions",
    desc: "Let our smart assistant guide you with reminders and plant insights.",
    color: "bg-gradient-to-tr from-yellow-400 to-orange-500",
  },
];

const WhyChooseLeafy = () => {
  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center text-[var(--primary)] mb-6">
        🌱 Why Choose <span className="text-[var(--accent)]">Leafy</span>?
      </h2>
      <p className="text-center text-[var(--text)] mb-12 max-w-2xl mx-auto text-lg">
        Discover how Leafy helps plant parents grow better, greener, and
        smarter.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, desc, color }, idx) => (
          <div
            key={idx}
            className={`bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center backdrop-blur-md`}
          >
            <div
              className={`w-14 h-14 mb-4 rounded-full flex items-center justify-center text-white shadow-md ${color}`}
            >
              {icon}
            </div>
            <h3 className="text-xl font-bold text-[var(--primary)] mb-2">
              {title}
            </h3>
            <p className="text-[var(--text)] text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseLeafy;
