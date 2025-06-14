import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Lead from "../assets/img/lead.png";
import Key from "../assets/img/key.avif";
import Proof from "../assets/img/proof.avif";

const WhyByo = ({ aboutData }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const boxes = sectionRef.current.querySelectorAll(".why-box");

    boxes.forEach((box) => {
      const text = box.querySelector(".col-lg-6");
      const image = box.querySelector("img");

      gsap.fromTo(
        text,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: box,
            start: "top 80%",
            toggleActions: "play none none reset", // ensures it animates every time
          },
        }
      );

      gsap.fromTo(
        image,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: box,
            start: "top 80%",
            toggleActions: "play none none reset", // same here
          },
        }
      );
    });
  }, []);
  const data = [
    {
      number: "01",
      title: "Teams Led by Co-Founders",
      img: Lead,
      text1:
        "We differentiate ourselves from large agencies where junior talent typically handles most of the work, and interactions with design leaders are limited.",
      text2:
        "At Clay, our co-founders lead dedicated, senior-level teams with cross-disciplinary expertise to ensure project success.",
    },
    {
      number: "02",
      title: "Collaboration Is Key",
      img: Key,
      text1:
        "We prioritize communication and transparency in all our interactions with the aim of providing a premium client experience from the beginning to the end of the project.",
      text2:
        "Our work with startups has made us more agile, and our experience with enterprise companies has allowed us to develop a refined approach to project management.",
    },
    {
      number: "03",
      title: "Our Work Is Future-Proof",
      img: Proof,
      text1:
        "We create designs that can easily scale and sustain your business goals for years to come.",
      text2:
        "Our portfolio features multiple websites and products that have remained untouched for 5+ years, proving our work is future-proof.",
    },
  ];
  return (
    <div ref={sectionRef}>
      <section className="why-sec">
        <div className="container">
          <div className="hq">
            <h2 className="hq-title">Why Byo</h2>
          </div>
        </div>

        {/* WHY BOXES */}
        {aboutData?.whyByo?.map((item, index) => (
          <div className="why-box" key={index}>
            <div className="container">
              <div className="row">
                <div className="col-lg-6 my-auto">
                  <h3 className="why-number">
                    {index + 1 < 10 ? "0" : ""}
                    {index + 1}
                  </h3>
                  <h4 className="why-title">{item.name}</h4>
                  <p className="whitespace-pre-wrap">{item.description}</p>
                </div>
                <div className="col-lg-5 offset-lg-1">
                  <img src={item.imageUrl} className="img-fluid w-100" alt="" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default WhyByo;
