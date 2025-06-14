import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const innAnimation = () => {
  useEffect(() => {
    // Animate .inn-title
    gsap.utils.toArray(".inn-title").forEach((el) => {
      gsap.fromTo(el, {
        y: 40,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Animate .inn-p
    gsap.utils.toArray(".inn-p").forEach((el) => {
      gsap.fromTo(el, {
        y: 20,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });
    });
  }, []);
};

export default innAnimation;
