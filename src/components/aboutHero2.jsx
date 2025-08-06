import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hemi from "../assets/img/hemi.svg";
import Ball1 from "../assets/img/ball-1.png";

gsap.registerPlugin(ScrollTrigger);

const AboutHero = ({ aboutData }) => {
  const hemiRef = useRef(null);
  const ball1Ref = useRef(null);
  const ball2Ref = useRef(null);
  const sectionImgRef = useRef(null);
  const imgSectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
 gsap.to(hemiRef.current, {
      scale: 1.05,
      rotation: 360,
      duration: 80, // slower
      repeat: -1,
      ease: "linear",
      transformOrigin: "50% 50%",
    });

  
    const floatFreely = (target, range = 100, speed = 2) => {
      gsap.to(target, {
        x: () => gsap.utils.random(-range, range),
        y: () => gsap.utils.random(-range, range),
        duration: speed,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        onRepeat() {
          this.vars.x = gsap.utils.random(-range, range);
          this.vars.y = gsap.utils.random(-range, range);
        },
      });
    };


    floatFreely(ball1Ref.current, 120, 1.8); // faster
    floatFreely(ball2Ref.current, 150, 2.2); // faster
  }, []);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;

    // Animate heading on load
    gsap.fromTo(
      ".hero-h",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 2, ease: "power3.out" }
    );

    // Scroll image reveal
    if (isDesktop) {
      gsap.fromTo(
        sectionImgRef.current,
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imgSectionRef.current,
            start: "top 80%",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <>
      <section className="hero-sec inn-hero" ref={containerRef}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 my-auto">
              <h1 className="hero-h">
                We transform brands through elevated digital experiences
              </h1>
            </div>
            <div className="col-lg-4 my-auto">
              <div className="about-images">
                <div className="about-images-inn">
                  <img
                    src={Hemi}
                    className="img-fluid big-hemi"
                    alt="Main Hemisphere"
                    ref={hemiRef}
                  />
                  <img
                    src={Ball1}
                    className="img-fluid ball-1 ball-shadow"
                    alt="ball-1"
                    ref={ball1Ref}
                  />
                  <img
                    src={Ball1}
                    className="img-fluid ball-2 ball-shadow"
                    alt="ball-2"
                    ref={ball2Ref}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="img-sec" ref={imgSectionRef}>
        <div className="container-fluid image-wrapper">
          <img
            src={aboutData?.aboutHeaderImageUrl}
            alt="Creative Visual"
            className="img-fluid w-100 image-element"
            ref={sectionImgRef}
          />
        </div>
      </section>
    </>
  );
};

export default AboutHero;
