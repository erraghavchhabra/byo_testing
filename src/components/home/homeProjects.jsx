import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const HomeProjects = ({ data, showViewButton = true }) => {
  const projectRef = useRef();
  const cursorRef = useRef(null);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ✅ Animate project boxes when entering viewport
      gsap.utils.toArray(".project-box").forEach((box) => {
        gsap.set(box, { y: 100, opacity: 0 });

        ScrollTrigger.create({
          trigger: box,
          start: "top 90%",
          end: "bottom top",
          onEnter: () => {
            gsap.to(box, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
            });
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

      // ✅ Auto-play videos on scroll for screens < 992px
      if (window.innerWidth < 992) {
        gsap.utils.toArray(".project-box").forEach((box) => {
          const video = box.querySelector("video");

          if (video) {
            ScrollTrigger.create({
              trigger: box,
              start: "top 80%",
              end: "bottom 20%",
              onEnter: () => {
                video.play().catch(() => {});
                gsap.to(video, { autoAlpha: 1, duration: 0.4 });
                const img = video.previousElementSibling;
                if (img) gsap.to(img, { autoAlpha: 0, duration: 0.4 });
              },
              onLeave: () => {
                video.pause();
                video.currentTime = 0;
                gsap.to(video, { autoAlpha: 0, duration: 0.4 });
                const img = video.previousElementSibling;
                if (img) gsap.to(img, { autoAlpha: 1, duration: 0.4 });
              },
              onLeaveBack: () => {
                video.pause();
                video.currentTime = 0;
                gsap.to(video, { autoAlpha: 0, duration: 0.4 });
                const img = video.previousElementSibling;
                if (img) gsap.to(img, { autoAlpha: 1, duration: 0.4 });
              },
            });
          }
        });
      }

      ScrollTrigger.refresh();
    }, projectRef);

    return () => ctx.revert();
  }, [data]);

  // ✅ Desktop hover effect
  const handleHover = (videoRef, isHovering) => {
    if (!videoRef) return;

    const img = videoRef.previousElementSibling;

    if (isHovering) {
      if (videoRef.paused) {
        videoRef.play().catch(() => {});
      }
      gsap.to(videoRef, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });
      gsap.to(img, { autoAlpha: 0, duration: 0.4, ease: "power2.out" });
    } else {
      if (!videoRef.paused) {
        videoRef.pause();
        videoRef.currentTime = 0;
      }
      gsap.to(videoRef, { autoAlpha: 0, duration: 0.4, ease: "power2.out" });
      gsap.to(img, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });
    }
  };

  const handleMouseMove = (e) => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const isDesktop = window.innerWidth >= 992;

  return (
    <>
      <section className="client-sec" ref={projectRef}>
        <div className="container m-container">
          <div className="row project-row">
            {data?.map((item, index) => (
              <div key={index} className="col-lg-6">
                <Link to={`/work-detail/${item?.title}`} className="project-box">
                  <div
                    className="project-img"
                    // ✅ Only enable hover events on desktop
                    {...(isDesktop && {
                      onMouseEnter: (e) => {
                        handleHover(
                          e.currentTarget.querySelector("video"),
                          true
                        );
                        setShowCursor(true);
                      },
                      onMouseLeave: (e) => {
                        handleHover(
                          e.currentTarget.querySelector("video"),
                          false
                        );
                        setShowCursor(false);
                      },
                      onMouseMove: handleMouseMove,
                    })}
                  >
                    <img
                      src={item?.coverImage?.asset?.url}
                      className="img-fluid project-thumb"
                      alt={item?.title || "Project"}
                      style={{ opacity: 1 }}
                    />

                    <video
                      muted
                      playsInline
                      loop
                      preload="metadata"
                      className="project-video"
                      style={{ opacity: 0 }}
                    >
                      <source
                        src={
                          item?.hoverVideo ||
                          "https://cdn.sanity.io/files/r115idoc/production/1c651c5005c18a36ad53910194ff8cdb7fca24f7.mp4"
                        }
                        type="video/mp4"
                      />
                    </video>
                  </div>

                  <div className="project-box-d">
                    <p>{item?.title}</p>
                    {item?.description && (
                      <div className="pro-des">
                        <span className="line-clamp-2">{item?.description}</span>
                      </div>
                    )}
                    <ul className="tag-ul list-unstyled">
                      <li>Web Design</li>
                      <li>Enterprise</li>
                      <li>Development</li>
                    </ul>
                  </div>
                </Link>
              </div>
            ))}
          </div>

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

      {/* ✅ Hover cursor only for desktop */}
      {isDesktop && (
        <div
          className={`hover-cursor ${showCursor ? "visible" : ""}`}
          ref={cursorRef}
        >
          View Case Study
        </div>
      )}
    </>
  );
};

export default HomeProjects;
