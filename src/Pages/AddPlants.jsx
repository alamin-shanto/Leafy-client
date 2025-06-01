import React from "react";

const AddPlants = () => {
  return (
    <div className="bg-[var(--primary)] m-5 p-5 text-center lg:w-[70%] lg:mx-auto">
      <h1 className="m-5 font-bold text-xl lg:text-2xl">Add Your Own Plants</h1>
      <form action="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <input
            type="text"
            className="bg-[var(--base-100)] px-5 p-1 w-[70%] mx-auto"
            placeholder="Plant Name"
          />
          <input
            type="text"
            className="bg-[var(--base-100)] px-5 p-1 w-[70%] mx-auto"
            placeholder="Short Description"
          />
          <select
            type="text"
            className="appearance-none bg-[var(--base-100)] px-5 p-1 w-[70%] mx-auto"
            defaultValue=""
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="flowering plants">Flowering Plants</option>
            <option value="ferns">Ferns</option>
            <option value="succulents">Succulents</option>
            <option value="trees">Trees</option>
            <option value="shrubs">Shrubs</option>
            <option value="herbs">Herbs</option>
            <option value="aquatic plants">Aquatic Plants</option>
            <option value="vines">Vines</option>
            <option value="carnivorous plants">Carnivorous Plants</option>
          </select>
          <select
            type="text"
            className="appearance-none bg-[var(--base-100)] px-5 p-1 w-[70%] mx-auto"
            defaultValue=""
          >
            <option value="" disabled>
              Care Level
            </option>
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="difficult">Difficult</option>
          </select>
          <input
            type="number"
            min="0"
            max="30"
            step="1"
            className="bg-[var(--base-100)] px-5 p-1 w-[70%] mx-auto"
            placeholder="Watering Frequency"
          />
          <input
            type="number"
            min="0"
            max="100"
            step="1"
            className="bg-[var(--base-100)] px-5 p-1 w-[70%] mx-auto"
            placeholder="Health Status (%)"
          />

          <input
            type="date"
            className="bg-[var(--base-100)] px-5 p-1 w-[70%] mx-auto"
            placeholder="Last Watering Date"
          />
          <input
            type="date"
            className="bg-[var(--base-100)] px-5 p-1 w-[70%] mx-auto"
            placeholder="Next Watering Date"
          />
        </div>
        <div className="mt-5 w-full text-center space-y-5">
          <input
            type="text"
            className="bg-[var(--base-100)] px-5 p-1 w-[70%] lg:w-[85%] mx-auto"
            placeholder="User Name"
          />
          <input
            type="email"
            className="bg-[var(--base-100)] px-5 p-1 w-[70%] lg:w-[85%] mx-auto"
            placeholder="User Email"
          />
          <input
            type="url"
            className="bg-[var(--base-100)] px-5 p-1 w-[70%] lg:w-[85%] mx-auto"
            placeholder="Image URL"
          />
        </div>
        <button className="font-bold bg-[var(--info)] mt-5 w-[70%] lg:w-[85%] mx-auto p-2 rounded-2xl">
          Submit the Form
        </button>
      </form>
    </div>
  );
};

export default AddPlants;
