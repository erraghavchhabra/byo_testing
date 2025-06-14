import React, { useEffect, useState } from "react";
import Hero from "../components/home/hero";
import HomeAccordion from "../components/home/homeAccordion";
import HomeClients from "../components/home/homeClients";
import HomeProjects from "../components/home/homeProjects";
import HomeTransform from "../components/home/homeTransform";
import FAQSection from "../components/home/homeFaq";
import sanityClient from "../server/sanityClient";
import { homeProjectsQuery, homeQuery } from "../server/querys";
const Home = () => {
  const [data, setData] = useState(null);
  const [projects , setProjects] = useState([])
  useEffect(() => {
    const fetchGalleryImages = async () => {
      const data = await sanityClient.fetch(homeQuery);

      setData(data);
    };

    fetchGalleryImages();
  }, []);
  useEffect(() => {
    const fetchGalleryImages = async () => {
      const data = await sanityClient.fetch(homeProjectsQuery);

      setProjects(data);
    };

    fetchGalleryImages();
  }, []);
  return (
    <div>
      <Hero data={data} />
      <HomeAccordion data={data} />
      <HomeClients />
      <HomeProjects data={projects}/>
      <HomeTransform homeData={data} />
      <FAQSection />
    </div>
  );
};

export default Home;
