import React from "react";

const AddPlants = () => {
  const handleAddPlants = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newPlant = Object.fromEntries(formData.entries());

    fetch("http://localhost:3000/plants", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newPlant),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Plant added:", data);
        form.reset();
      });
  };

  return (
    <div className="bg-[var(--base-100)] text-[var(--text)] p-10 rounded-3xl shadow-2xl max-w-6xl mx-auto my-12">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-[var(--primary)] tracking-tight">
        🌿 Add a New Plant
      </h1>

      <form onSubmit={handleAddPlants} className="space-y-12">
        {/* 🌱 Basic Info */}
        <div>
          <h2 className="section-title">📝 Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input
              label="Plant Name"
              name="Plant Name"
              placeholder="e.g., Snake Plant"
            />
            <Input
              label="Short Description"
              name="Description"
              placeholder="Indoor air-purifying plant"
            />

            <Select
              label="Category"
              name="Category"
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
            />

            <Select
              label="Care Level"
              name="Care Level"
              options={["very easy", "easy", "moderate", "difficult"]}
            />
          </div>
        </div>

        {/* 💧 Care Info */}
        <div>
          <h2 className="section-title">💧 Care Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Input
              label="Watering Frequency (days)"
              name="Watering Frequency"
              type="number"
              placeholder="e.g., 5"
            />
            <Input
              label="Health Status (%)"
              name="Health"
              type="number"
              placeholder="e.g., 90"
            />
            <Input
              label="Image URL"
              name="Image"
              type="url"
              placeholder="https://..."
            />
          </div>
        </div>

        {/* 📅 Watering Dates */}
        <div>
          <h2 className="section-title">📅 Watering Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input
              label="Last Watering Date"
              name="Last Watering Date"
              type="date"
            />
            <Input
              label="Next Watering Date"
              name="Next Watering Date"
              type="date"
            />
          </div>
        </div>

        {/* 👤 User Info */}
        <div>
          <h2 className="section-title">👤 User Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input
              label="User Name"
              name="UserName"
              placeholder="e.g., Mohammad"
            />
            <Input
              label="Email Address"
              name="Email"
              type="email"
              placeholder="you@email.com"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-12 block mx-auto bg-[var(--primary)] hover:bg-[var(--accent)] text-white font-bold text-lg px-12 py-4 rounded-full shadow-lg transition-all"
        >
          🌱 Submit Plant
        </button>
      </form>
    </div>
  );
};

// 🌟 Reusable Input Field Component
const Input = ({ label, name, type = "text", placeholder }) => (
  <div>
    <label
      htmlFor={name}
      className="block mb-2 text-[var(--neutral)] font-semibold tracking-wide"
    >
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      required
      className="w-full bg-white dark:bg-[var(--card-bg)] text-[var(--text)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-4 focus:ring-[var(--primary)] transition"
    />
  </div>
);

// 🌟 Reusable Select Dropdown
const Select = ({ label, name, options }) => (
  <div>
    <label
      htmlFor={name}
      className="block mb-2 text-[var(--neutral)] font-semibold tracking-wide"
    >
      {label}
    </label>
    <select
      id={name}
      name={name}
      required
      defaultValue=""
      className="w-full bg-white dark:bg-[var(--card-bg)] text-[var(--text)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-4 focus:ring-[var(--primary)] transition"
    >
      <option value="" disabled>
        Select {label}
      </option>
      {options.map((opt) => (
        <option value={opt} key={opt}>
          {opt[0].toUpperCase() + opt.slice(1)}
        </option>
      ))}
    </select>
  </div>
);

// 🌟 Tailwind Utility
const style = document.createElement("style");
style.innerHTML = `
  .section-title {
    @apply text-2xl font-bold text-[var(--primary)] mb-6 border-b pb-2 border-[var(--border-color)];
  }
`;
document.head.appendChild(style);

export default AddPlants;
