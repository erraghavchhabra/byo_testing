import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import pro1 from "../../assets/img/03.png";
import pro2 from "../../assets/img/04.png";
import pro3 from "../../assets/img/Swee.png";
import sanityClient from "../../server/sanityClient";
import { homeProjectsQuery } from "../../server/querys";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const HomeProjects = ({data, showViewButton = true }) => {
  useEffect(() => {
    gsap.utils.toArray(".project-box").forEach((box) => {
      gsap.set(box, { y: 100, opacity: 0 });

      ScrollTrigger.create({
        trigger: box,
        start: "top 90%",
        end: "bottom top",
        onEnter: () => {
          gsap.to(box, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
        },
        onLeaveBack: () => {
          gsap.to(box, {
            y: 100,
            opacity: 0,
            duration: 0.8,
            ease: "power3.in",
          });
        },
      });
    });
  }, []);
  
  return (
    <section className="client-sec">
      <div className="container">
        <div className="row project-row">
          {data?.map((item, index) => (
            <div key={index} className="col-lg-6">
              <Link to={`/work-detail/${item?.title}`} className="project-box">
                <div className="project-img">
                  <img
                    src={item?.coverImage?.asset?.url}
                    className="img-fluid"
                    alt="Kout"
                  />
                </div>
                <p>{item.title}</p>
              </Link>
            </div>
          ))}
        </div>
        {/* Conditionally render the button */}
        {showViewButton && (
          <div className="text-center mt-4">
            <Link to={"/work"} className="view-btn">
              <span>Explore Our Works</span>{" "}
              <i className="bi bi-arrow-right-short"></i>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeProjects;
