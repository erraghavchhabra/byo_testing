import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const Archive = ({ projects = [] }) => {
  const [hoverData, setHoverData] = useState(null);
  const [openIndex, setOpenIndex] = useState(null); // Mobile accordion state
  const previewRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile based on screen width
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Desktop hover behavior
  const handleMouseEnter = (project) => {
    if (isMobile) return; // skip hover on mobile
    setHoverData(project);
    gsap.to(previewRef.current, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    gsap.to(previewRef.current, {
      autoAlpha: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power3.inOut",
    });
  };

  const handleMouseMove = (e) => {
    if (isMobile || !previewRef.current) return;
    const offsetX = 80;
    const offsetY = -40;
    gsap.to(previewRef.current, {
      x: e.clientX + offsetX,
      y: e.clientY + offsetY,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  // Mobile click toggle
  const handleMobileClick = (index) => {
    if (!isMobile) return;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <ul className="archive-ul list-unstyled">
        {projects.map((project, index) => {
          const fullTitle = project?.title || "";
          const words = fullTitle.split(" ");
          const slicedTitle =
            words.length > 2 ? `${words.slice(0, 2).join(" ")}` : fullTitle;

          return (
            <li
              key={index}
              onMouseEnter={() => handleMouseEnter(project)}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
              onClick={() => handleMobileClick(index)} // works only on mobile
              style={{ cursor: "pointer" }}
            >
              <h3>{slicedTitle}</h3>

              {/* ✅ Mobile Accordion Preview */}
              {isMobile && openIndex === index && (
                <div className="mobile-preview">
                  {project?.coverImage?.asset?.url && (
                    <img
                      src={project.coverImage.asset.url}
                      alt={project?.title}
                      className="preview-thumb"
                    />
                  )}
                  {project?.description && (
                    <p className="preview-desc">
                      {project.description.split(" ").slice(0, 20).join(" ")}...
                    </p>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* ✅ Desktop Floating Preview */}
      {!isMobile && (
        <div className="archive-preview" ref={previewRef}>
          {hoverData && (
            <>
              <img
                src={hoverData?.coverImage?.asset?.url}
                alt={hoverData?.title}
                className="preview-thumb"
              />
              {hoverData?.description && (
                <p className="preview-desc">
                  {hoverData.description.split(" ").slice(0, 20).join(" ")}...
                </p>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Archive;
