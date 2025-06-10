import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Byo1 from "../../assets/img/Byo1.png";
import Byo2 from "../../assets/img/Byo2.png";
import Byo3 from "../../assets/img/Byo3.png";
import Byo4 from "../../assets/img/Byo4.png";
import Byo5 from "../../assets/img/Byo5.png";
import Byo7 from "../../assets/img/Byo7.png";
import Byo8 from "../../assets/img/Byo8.png";
import Byo9 from "../../assets/img/Byo9.png";

const images = [Byo1, Byo2, Byo3, Byo4, Byo5, Byo7, Byo8, Byo9];

const HomeTransform = () => {
    const swiperRef = useRef(null);
    const [hoverDirection, setHoverDirection] = useState(null); // 'left', 'right', or null
    const [cursorY, setCursorY] = useState(0); // for vertical arrow position

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = e.clientX / window.innerWidth;
            setCursorY(e.clientY);

            const swiper = swiperRef.current?.swiper;
            if (!swiper) return;

            // Slide and arrow direction logic
            if (x < 0.3) {
                setHoverDirection("left");
                swiper.slidePrev();
            } else if (x > 0.7) {
                setHoverDirection("right");
                swiper.slideNext();
            } else {
                setHoverDirection(null);
            }
        };

        const container = document.querySelector(".m-swiper");
        container?.addEventListener("mousemove", handleMouseMove);
        return () => container?.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section className="transform-sec">
            <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <h3 className="mt-title">We transform companies through design innovation</h3>
                            <p className="mt-p">A full-service creative agency designing and building inventive digital experiences across all platforms and brand touchpoints.</p>
                            <a href="#" className="view-btn"><span>View Our Services</span> <i className="bi bi-arrow-right-short"></i></a>
                        </div>
                    </div>
                </div>
            <div className="m-swiper">
            <Swiper
                ref={swiperRef}
                slidesPerView={3}
                spaceBetween={20}
                modules={[Navigation, Keyboard]}
                keyboard={{ enabled: true }}
                navigation={false}
                loop={true}
                speed={800}
            >
                {images.map((img, i) => (
                    <SwiperSlide key={i}>
                        <img src={img} alt={`img-${i}`} className="img-fluid" />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Dynamic Arrow Positioning */}
            {hoverDirection === "left" && (
                <div
                    className="arrow left-arrow"
                    style={{ top: `${cursorY}px` }}
                >
                    &#8592;
                </div>
            )}
            {hoverDirection === "right" && (
                <div
                    className="arrow right-arrow"
                    style={{ top: `${cursorY}px` }}
                >
                    &#8594;
                </div>
            )}
            </div>
            <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <p className="mt-p">Our team brings together branding, UX design, and technology to make things happen quickly and powerfully. With our co-founders taking the lead and working closely with clients, we turn collaboration into impactful results.</p>
                            <a href="#" className="view-btn"><span>Get to Konw Us</span> <i className="bi bi-arrow-right-short"></i></a>
                        </div>
                    </div>
                </div>
        </section>
    );
};

export default HomeTransform;
