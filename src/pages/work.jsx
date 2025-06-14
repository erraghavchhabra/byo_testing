import React, { useEffect, useState } from "react";
import HomeProjects from "../components/home/homeProjects";
import innAnimation from "../components/innAnimation";
import sanityClient from "../server/sanityClient";
import { allCategoriesQuery, allProjectsQuery } from "../server/querys";
const Work = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [allCategories, setAllCategories] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  innAnimation();
  useEffect(() => {
    const fetchGalleryImages = async () => {
      const data = await sanityClient.fetch(allCategoriesQuery);
      console.log("cate", data);

      setAllCategories(data);
    };

    fetchGalleryImages();
  }, []);
  useEffect(() => {
    const fetchGalleryImages = async () => {
      const data = await sanityClient.fetch(allProjectsQuery);
      console.log(1555151, data);

      setAllProjects(data);
    };

    fetchGalleryImages();
  }, []);
  useEffect(() => {
    if (activeTab === "all") {
      setProjects(allProjects);
    } else {
      const filteredProjects = allProjects.filter(
        (project) => project.category?.name == activeTab
      );
      setProjects(filteredProjects);
    }
  }, [activeTab, allProjects]);
  return (
    <>
      <section className="inner-sec">
        <div className="container inn-container">
          <div className="row">
            <div className="col-lg-4">
              <h1 className="inn-title">Projects</h1>
              <p className="inn-p">
                {" "}
                Our team helps companies develop their ideas into cutting-edge
                products that will cause customers to love and enjoy.
              </p>
            </div>
            <div className="col-lg-8 align-items-end">
              <div className="nav-holder">
                <ul className="nav m-nav-tabs nav-tabs" id="workTabs">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "all" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("all")}
                    >
                      All Work
                    </button>
                  </li>
                  {allCategories?.map((category, index) => (
                    <li key={index} className="nav-item">
                      <button
                        className={`nav-link ${
                          activeTab === category?.name ? "active" : ""
                        }`}
                        onClick={() => setActiveTab(category?.name)}
                      >
                        {category?.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="tab-content mt-3">
            <HomeProjects data={projects} showViewButton={false} />
            {/* {activeTab === "all" && (
            )}
            {activeTab === "branding" && (
              <HomeProjects showViewButton={false} category="branding" />
            )}
            {activeTab === "packaging" && (
              <HomeProjects showViewButton={false} category="packaging" />
            )}
            {activeTab === "websites" && (
              <HomeProjects showViewButton={false} category="websites" />
            )} */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Work;
