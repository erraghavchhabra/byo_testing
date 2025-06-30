import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const HomeProjects = ({ data, showViewButton = true }) => {
  const projectRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      ScrollTrigger.refresh();
    }, projectRef);

    return () => ctx.revert();
  }, [data]);

  return (
    <section className="client-sec" ref={projectRef}>
      <div className="container">
        <div className="row project-row">
          {data?.map((item, index) => (
            <div key={index} className="col-lg-6">
              <Link to={`/work-detail/${item?.title}`} className="project-box">
                <div className="project-img">
                  <img
                    src={item?.coverImage?.asset?.url}
                    className="img-fluid"
                    alt={item?.title || "Project"}
                  />
                  {/* Summary overlay */}
                  {item?.description && (
                    <div className="project-summary line-clamp-2">
                      <span className="line-clamp-2">{item?.description}</span>
                    </div>
                  )}
                </div>
                <p>{item?.title}</p>
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
  );
};

export default HomeProjects;
