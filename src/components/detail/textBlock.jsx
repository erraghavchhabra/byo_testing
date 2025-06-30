import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GalleryImages from "./GalleryImages";

gsap.registerPlugin(ScrollTrigger);

const TextBlock = ({ data }) => {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  useEffect(() => {
  const triggers = [];

  const headings = document.querySelectorAll(".text-block-h");
  const paragraphs = document.querySelectorAll(".whitespace-pre-wrap");

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

  return () => {
    triggers.forEach(trigger => trigger?.kill());
  };
}, [data]);


  return (
    <section className="text-block">
      <div className="container">
        <h4 className="text-block-h" ref={headingRef}>
          {data?.title}
        </h4>
        {data?.description && (
          <p className="whitespace-pre-wrap" ref={paragraphRef}>
            {data.description}
          </p>
        )}
        {data?.images && <GalleryImages images={data.images} />}
      </div>
    </section>
  );
};

export default TextBlock;
