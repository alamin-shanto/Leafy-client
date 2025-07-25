import React from "react";

import Banner from "./../Components/Banner";
import NewPlants from "../Components/NewPlants";
import BeginnerFriendlyPlants from "../Components/BeginnerFriendlyPlants";
import TopPlantCareMistakes from "../Components/TopPlantCareMistakes";
import WhyChooseLeafy from "../Components/WhyChooseLeafy";

const Home = () => {
  return (
    <div className="">
      <Banner />
      <NewPlants />
      <BeginnerFriendlyPlants />
      <TopPlantCareMistakes />
      <WhyChooseLeafy />
    </div>
  );
};

export default Home;
