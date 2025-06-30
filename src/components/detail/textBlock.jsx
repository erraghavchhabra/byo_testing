import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GalleryImages from "./GalleryImages";

// register the plugin once
gsap.registerPlugin(ScrollTrigger);

const TextBlock = ({ data }) => {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    const triggers = [];

    // Animate all elements with .text-block-h
    const headings = document.querySelectorAll(".text-block-h");
    headings.forEach((el) => {
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

    // Animate all elements with .whitespace-pre-wrap
    const paragraphs = document.querySelectorAll(".whitespace-pre-wrap");
    paragraphs.forEach((el) => {
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

    // cleanup
    return () => {
      triggers.forEach((trigger) => trigger?.kill());
    };
  }, [data]);

  return (
    <section className="text-block py-5">
      <div className="container">
        {data?.title && (
          <h4 className="text-block-h mb-3" ref={headingRef}>
            {data.title}
          </h4>
        )}
        {data?.description && (
          <p className="whitespace-pre-wrap mb-4" ref={paragraphRef}>
            {data.description}
          </p>
        )}
        {data?.images && <GalleryImages images={data.images} />}
      </div>
    </section>
  );
};

export default TextBlock;
