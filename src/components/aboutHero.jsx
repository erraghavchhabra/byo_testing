import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MainImg from "../assets/img/main.svg";
import MainFrame from "../assets/img/main-frame.svg";
import MainClock from "../assets/img/clock.svg";
import MainImageSection from "../assets/img/image-section.jpg";

gsap.registerPlugin(ScrollTrigger);

const AboutHero = ({aboutData}) => {
  const frameRef = useRef(null);
  const clockRef = useRef(null);
  const containerRef = useRef(null);
  const sectionImgRef = useRef(null);
  const imgSectionRef = useRef(null); // New ref for scroll trigger
  const mainImgRef = useRef(null);

  useEffect(() => {
    // Entry animation for main images
    gsap.fromTo(
      frameRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 2, ease: "power3.out" }
    );
    gsap.fromTo(
      clockRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 2, ease: "power3.out" }
    );

    // Hero heading animation
    gsap.fromTo(
      ".hero-h",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 2, ease: "power3.out" }
    );

    // Parallax scroll movement
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      animation: gsap.timeline()
        .to(frameRef.current, { x: -50 }, 0)
        .to(clockRef.current, { x: 50 }, 0),
    });

    // Scroll scale + fade-in animation for image section
    gsap.fromTo(
      sectionImgRef.current,
      { scale: 0.7, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imgSectionRef.current, // Use outer section as trigger
          start: "top 80%",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // Mouse-based parallax movement
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = clientX / window.innerWidth - 0.5;
      const y = clientY / window.innerHeight - 0.5;

      gsap.to(frameRef.current, {
        x: x * 100,
        y: y * 100,
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(clockRef.current, {
        x: x * -100,
        y: y * -100,
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(mainImgRef.current, {
        x: x * 50,
        y: y * 50,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
              <div className="main-images">
                <img
                  src={MainFrame}
                  ref={frameRef}
                  className="img-fluid main-frame"
                  alt="Main Frame"
                />
                <img
                  src={MainClock}
                  ref={clockRef}
                  className="img-fluid main-clock"
                  alt="Main Clock"
                />
                <img
                  src={MainImg}
                  ref={mainImgRef}
                  className="img-fluid main-img"
                  alt="Main"
                />
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
