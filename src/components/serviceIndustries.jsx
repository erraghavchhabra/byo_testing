import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import innAnimation from "../components/innAnimation";

gsap.registerPlugin(ScrollTrigger);

const Industries = ({ servicesData }) => {
  useEffect(() => {
    gsap.utils.toArray(".indus-box").forEach((box) => {
      gsap.fromTo(
        box,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: box,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
            markers: false, // set to true for debugging
          },
        }
      );
    });
  }, []);

  innAnimation();

  return (
    <section className="industries">
      <div className="container inn-container">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="row">
              <div className="col-lg-6">
                <h4 className="inn-title">
                  {servicesData?.industries?.title || "Industries"}
                </h4>
                <p className="inn-p whitespace-pre-wrap">
                  {servicesData?.industries?.description}
                </p>
              </div>
            </div>

            {servicesData?.industries?.industriesList?.map((item, index) => (
              <div className="indus-box" key={index}>
                <div className="row">
                  <div className="col-lg-4">
                    <h3 className="indus-title">{item?.title}</h3>
                  </div>
                  <div className="col-lg-8">
                    <p className="whitespace-pre-wrap">{item?.names}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;
