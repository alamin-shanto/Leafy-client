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
      <section id="recent-plants">
        <NewPlants />
      </section>
      <section id="beginner-plants">
        <BeginnerFriendlyPlants />
      </section>
      <section id="top-mistakes">
        <TopPlantCareMistakes />
      </section>
      <section id="leafy">
        <WhyChooseLeafy />
      </section>
    </div>
  );
};

export default Home;
