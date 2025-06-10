import React from "react";
import Hero from "../components/home/hero";
import HomeAccordion from "../components/home/homeAccordion";
import HomeClients from "../components/home/homeClients";
import HomeProjects from "../components/home/homeProjects";
import HomeTransform from "../components/home/homeTransform";
import FAQSection from "../components/home/homeFaq";
const Home = () => {
  return (
    <div>
      <Hero />
      <HomeAccordion />
      <HomeClients />
      <HomeProjects />
      <HomeTransform />
      <FAQSection />
    </div>
  );
};

export default Home;
