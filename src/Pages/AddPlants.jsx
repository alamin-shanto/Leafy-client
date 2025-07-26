import React from "react";
import Swal from "sweetalert2";

const AddPlants = () => {
  const handleAddPlants = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const newPlant = {
      Plant_Name: formData.get("Plant_Name"),
      Description: formData.get("Description"),
      Category: formData.get("Category"),
      Care_Level: formData.get("Care_Level"),
      Watering_Frequency: Number(formData.get("Watering_Frequency")),
      Health: Number(formData.get("Health")),
      Image: formData.get("Image"),
      Last_Watering_Date: formData.get("Last_Watering_Date"),
      Next_Watering_Date: formData.get("Next_Watering_Date"),
      UserName: formData.get("UserName"),
      Email: formData.get("Email"),
    };

    fetch("https://leafy-server-seven.vercel.app/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlant),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId || data.acknowledged) {
          Swal.fire({
            title: "✅ Plant Added!",
            text: "Your plant was successfully added to the database.",
            icon: "success",
            confirmButtonText: "Cool",
          });
          form.reset();
        } else {
          throw new Error("Insert failed");
        }
      })
      .catch((err) => {
        console.error("Add plant error:", err);
        Swal.fire({
          title: "❌ Error",
          text: "Failed to add the plant. Please try again.",
          icon: "error",
        });
      });
  };

  return (
    <div className="bg-[var(--base-100)] text-[var(--text)] p-10 rounded-3xl shadow-2xl max-w-6xl mx-auto my-12">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-[var(--primary)] tracking-tight">
        🌿 Add a New Plant
      </h1>

      <form onSubmit={handleAddPlants} className="space-y-12">
        <Section title="📝 Basic Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input
              label="Plant Name"
              name="Plant_Name"
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
              name="Care_Level"
              options={["very easy", "easy", "moderate", "difficult"]}
            />
          </div>
        </Section>

        <Section title="💧 Care Information">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Input
              label="Watering Frequency (days)"
              name="Watering_Frequency"
              type="number"
              placeholder="e.g., 5"
              min="1"
            />
            <Input
              label="Health Status (%)"
              name="Health"
              type="number"
              placeholder="e.g., 90"
              min="0"
              max="100"
            />
            <Input
              label="Image URL"
              name="Image"
              type="url"
              placeholder="https://..."
            />
          </div>
        </Section>

        <Section title="📅 Watering Schedule">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input
              label="Last Watering Date"
              name="Last_Watering_Date"
              type="date"
            />
            <Input
              label="Next Watering Date"
              name="Next_Watering_Date"
              type="date"
            />
          </div>
        </Section>

        <Section title="👤 User Information">
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
        </Section>

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

const Input = ({ label, name, type = "text", placeholder, min, max }) => (
  <div>
    <label
      htmlFor={name}
      className="block mb-2 text-[var(--neutral)] font-semibold"
    >
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      required
      min={min}
      max={max}
      className="w-full bg-white dark:bg-[var(--card-bg)] text-[var(--text)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-4 focus:ring-[var(--primary)] transition"
    />
  </div>
);

const Select = ({ label, name, options }) => (
  <div>
    <label
      htmlFor={name}
      className="block mb-2 text-[var(--neutral)] font-semibold"
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

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-2xl font-bold text-[var(--primary)] mb-6 border-b pb-2 border-[var(--border-color)]">
      {title}
    </h2>
    {children}
  </div>
);

export default AddPlants;
