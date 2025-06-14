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
  const videoRef = useRef(null);
  const mainImgRef = useRef(null); // Reference for main image

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

    // Slide effect for Hero text (h1.hero-h)
    gsap.fromTo(
      ".hero-h",
      { y: 100, opacity: 0 }, // Start off below the viewport and invisible
      { y: 0, opacity: 1, duration: 2, ease: "power3.out" }
    );

    // Scroll animation for images (Parallax)
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

    // Video scale animation with ScrollTrigger
    gsap.fromTo(
      videoRef.current,
      { scale: 0.7, opacity: 0 }, // Initial state
      {
        scale: 1, // Final scale
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top 80%", // When the video comes into view
          end: "bottom top", // When the video is fully out of view
          scrub: true, // This makes the scale smooth as you scroll
        },
      }
    );

    // Mouse movement effect for main image
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = clientX / window.innerWidth - 0.5;
      const y = clientY / window.innerHeight - 0.5;

      // Apply movement to images based on mouse position
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

    // Adding event listener for mouse movement
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      // Cleanup the event listener when component is unmounted
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <section className="hero-sec" ref={containerRef}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 my-auto">
              <h1 className="hero-h">
                {data?.heroTitle ||
                  "Byo: Unleashing Creativity in Branding and UX Design!"}
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

        {/* Video section */}
        <div className="container-fluid video-wrapper" ref={videoRef}>
          <video
            muted
            autoPlay
            playsInline
            preload="auto"
            className="video-element"
          >
            {data?.introVideo?.asset?.url && (
              <source src={data.introVideo.asset.url} type="video/mp4" />
            )}
          </video>
        </div>
      </section>
    </>
  );
};

export default Hero;
