import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Problem = ({ data }) => {
  useEffect(() => {
    const triggers = [];

    const animateElements = (selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        const anim = gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
        triggers.push(anim.scrollTrigger);
      });
    };

    animateElements(".prob-sub-h");
    animateElements(".whitespace-pre-wrap");
    animateElements(".prob-list li");

    return () => {
      triggers.forEach((trigger) => trigger?.kill());
    };
  }, [data]);

  const content = [
    {
      title: "PROBLEM",
      description: data?.problem?.description,
      points: data?.problem?.points,
    },
    {
      title: "CHALLENGES",
      description: data?.challenges?.description,
      points: data?.challenges?.points,
    },
  ];

  return (
    <section className="prob-sec">
      <div className="container">
        <div className="row justify-content-center">
          {content.map((item, index) => (
            <div key={index} className="col-lg-5">
              <h6 className="prob-sub-h">{item?.title}</h6>
              <p className="whitespace-pre-wrap">{item.description}</p>
              {item.points && (
                <ul className="list-unstyled prob-list">
                  {item.points.map((point, i) => (
                    <li key={i}>{point?.title}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
