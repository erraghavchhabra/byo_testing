import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import pro1 from "../../assets/img/03.png";
import pro2 from "../../assets/img/04.png";
import pro3 from "../../assets/img/swee.png";

gsap.registerPlugin(ScrollTrigger);

const HomeProjects = () => {
    useEffect(() => {
        gsap.utils.toArray(".project-box").forEach((box) => {
            // Default state
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
    }, []);

    return (
        <section className="client-sec">
            <div className="container">
                <div className="row project-row">
                    <div className="col-lg-6">
                        <a href="#" className="project-box">
                            <div className="project-img">
                                <img src={pro1} className="img-fluid" alt="Kout" />
                            </div>
                            <p>Kout</p>
                        </a>
                    </div>
                    <div className="col-lg-6">
                        <a href="#" className="project-box">
                            <div className="project-img">
                                <img src={pro2} className="img-fluid" alt="Elena Light" />
                            </div>
                            <p>Elena Light</p>
                        </a>
                    </div>
                    <div className="col-lg-6">
                        <a href="#" className="project-box">
                            <div className="project-img">
                                <img src={pro3} className="img-fluid" alt="Souka Micro" />
                            </div>
                            <p>Souka Micro</p>
                        </a>
                    </div>
                    <div className="col-lg-6">
                        <a href="#" className="project-box">
                            <div className="project-img">
                                <img src={pro1} className="img-fluid" alt="Kout" />
                            </div>
                            <p>Kout</p>
                        </a>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <a href="#" className="view-btn">
                        <span>Explore Our Works</span>{" "}
                        <i className="bi bi-arrow-right-short"></i>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HomeProjects;
