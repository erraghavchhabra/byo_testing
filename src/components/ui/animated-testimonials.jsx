"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const AnimatedTestimonials = ({ testimonials, autoplay = false }) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 8000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className="container py-5">
      <div className="row g-5 align-items-center">
        {/* Left Image */}
        <div className="col-md-4">
          <div className="position-relative" style={{ height: "320px" }}>
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -40, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={testimonial.imageUrl}
                    alt={testimonial.author}
                    draggable={false}
                    className=" rounded-circle object-fit-cover"
                    width={200}
                    height={200}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Content */}
        <div className="col-md-8 text-start">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3 className="h4 fw-bold mb-1">{testimonials[active]?.author}</h3>
            <p className="text-muted small mb-3">
              {testimonials[active].position}
            </p>
            <motion.p className="fs-5 text-secondary">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="d-inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* Buttons */}
          <div className="d-flex gap-3 pt-4">
            <button
              onClick={handlePrev}
              className="btn btn-light d-flex align-items-center justify-content-center rounded-circle p-2"
              style={{ width: "40px", height: "40px" }}
            >
              <FaArrowLeft size={20} />
            </button>
            <div style={{display:"flex",alignItems:"center",gap:"2px"}}>
              <span>
                {active+1 < 10 ? "0" : ""}
                {active+1}
              </span>
              /
              <span>
                {testimonials?.length < 10 ? "0" : ""}
                {testimonials?.length}
              </span>
            </div>
            <button
              onClick={handleNext}
              className="btn btn-light d-flex align-items-center justify-content-center rounded-circle p-2"
              style={{ width: "40px", height: "40px" }}
            >
              <FaArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
