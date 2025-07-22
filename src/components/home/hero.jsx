import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MainImg from "../../assets/img/main.svg";
import MainFrame from "../../assets/img/main-frame.svg";
import MainClock from "../../assets/img/clock.svg";

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ data }) => {
  const frameRef = useRef(null);
  const clockRef = useRef(null);
  const containerRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const videoRef = useRef(null);
  const mainImgRef = useRef(null);

  useEffect(() => {
    // Entry animation for images
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

    // Slide effect for Hero text
    gsap.fromTo(
      ".hero-h",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 2, ease: "power3.out" }
    );

    // Parallax scroll for images
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      animation: gsap
        .timeline()
        .to(frameRef.current, { x: -50 }, 0)
        .to(clockRef.current, { x: 50 }, 0),
    });

    // Smooth FULL-WIDTH-like video reveal with delay
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: videoWrapperRef.current,
        start: "top 85%",
        end: "top 40%",
        scrub: true,
      },
    });

    // Width & opacity comes first
    tl.fromTo(
      videoWrapperRef.current,
      {
        width: "70%",               // starts narrower
        borderRadius: "0px",
        opacity: 0.5,
      },
      {
        width: "calc(100% - 30px)", // leaves 15px gap left & right
        borderRadius: "0px",       // slight curve remains
        opacity: 1,
        ease: "power3.out",
        duration: 1.2,
      }
    );

    // Slightly delayed scaling for smoothness
    tl.fromTo(
      videoWrapperRef.current,
      { scale: 0.9 },
      {
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
      },
      ">-0.3" // starts a bit after width animates
    );

    // Mouse movement parallax effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = clientX / window.innerWidth - 0.5;
      const y = clientY / window.innerHeight - 0.5;

      gsap.to(frameRef.current, { x: x * 100, y: y * 100, duration: 0.3, ease: "power3.out" });
      gsap.to(clockRef.current, { x: x * -100, y: y * -100, duration: 0.3, ease: "power3.out" });
      gsap.to(mainImgRef.current, { x: x * 50, y: y * 50, duration: 0.3, ease: "power3.out" });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="hero-sec" ref={containerRef}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 my-auto">
            <h1 className="hero-h">
              {data?.heroTitle || "Byo: Unleashing Creativity in Branding and UX Design!"}
            </h1>
          </div>
          <div className="col-lg-4 my-auto">
            <div className="main-images">
              <img src={MainFrame} ref={frameRef} className="img-fluid main-frame" alt="Main Frame" />
              <img src={MainClock} ref={clockRef} className="img-fluid main-clock" alt="Main Clock" />
              <img src={MainImg} ref={mainImgRef} className="img-fluid main-img" alt="Main" />
            </div>
          </div>
        </div>
      </div>

      {/* Video section with smooth scaling + gap */}
      <div
        ref={videoWrapperRef}
        className="video-wrapper"
        style={{
          margin: "120px auto",
          overflow: "hidden",
          paddingInline: "0px", // ensures gap left & right
          transformOrigin: "center center",
        }}
      >
        <video
          ref={videoRef}
          muted
          autoPlay
          playsInline
          preload="auto"
          className="video-element"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            borderRadius: "inherit",
          }}
        >
          {data?.introVideo?.asset?.url && (
            <source src={data.introVideo.asset.url} type="video/mp4" />
          )}
        </video>
      </div>
    </section>
  );
};

export default Hero;
