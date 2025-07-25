import React from "react";

import Banner from "./../Components/Banner";
import NewPlants from "../Components/NewPlants";
import BeginnerFriendlyPlants from "../Components/BeginnerFriendlyPlants";
import TopPlantCareMistakes from "../Components/TopPlantCareMistakes";

const Home = () => {
  return (
    <div className="">
      <Banner />
      <NewPlants />
      <BeginnerFriendlyPlants />
      <TopPlantCareMistakes />
    </div>
  );
};

export default Home;
