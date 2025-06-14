import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Add this
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// import Byo1 from "../../assets/img/Byo1.png";
// import Byo2 from "../../assets/img/Byo2.png";
// import Byo3 from "../../assets/img/Byo3.png";
// import Byo4 from "../../assets/img/Byo4.png";
// import Byo5 from "../../assets/img/Byo5.png";
// import Byo7 from "../../assets/img/Byo7.png";
// import Byo8 from "../../assets/img/Byo8.png";
// import Byo9 from "../../assets/img/Byo9.png";
import { galleryQuery } from "../../server/querys";
import sanityClient from "../../server/sanityClient";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}
// const images = [Byo1, Byo2, Byo3, Byo4, Byo5, Byo7, Byo8, Byo9];

const HomeTransform = ({ homeData }) => {
  const swiperRef = useRef(null);
  const location = useLocation(); // Detect current page
  const [hoverDirection, setHoverDirection] = useState(null);
  const [cursorY, setCursorY] = useState(0);
  const [images, setImages] = useState([]);
  const isAboutPage = location.pathname === "/about";

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      setCursorY(e.clientY);

      const swiper = swiperRef.current?.swiper;
      if (!swiper) return;

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
  useEffect(() => {
    const fetchGalleryImages = async () => {
      const data = await sanityClient.fetch(galleryQuery);
      setImages(data);
    };

    fetchGalleryImages();
  }, []);

  return (
    <section
      className={`transform-sec ${isAboutPage ? "about-transform" : ""}`}
    >
      {!isAboutPage && (
        <div className="container hide-about">
          <div className="row">
            <div className="col-lg-6">
              <h3 className="mt-title">{homeData?.viewOurService?.title}</h3>
              <p className="mt-p whitespace-pre-wrap">{homeData?.viewOurService?.description}</p>
              <Link to={"/services"} className="view-btn">
                <span>View Our Services</span>{" "}
                <i className="bi bi-arrow-right-short"></i>
              </Link>
            </div>
          </div>
        </div>
      )}

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
          {images?.images?.map((img, i) => (
            <SwiperSlide key={i}>
              <img src={img?.url} alt={img?.alt} className="img-fluid" />
            </SwiperSlide>
          ))}
        </Swiper>

        {hoverDirection === "left" && (
          <div className="arrow left-arrow" style={{ top: `${cursorY}px` }}>
            &#8592;
          </div>
        )}
        {hoverDirection === "right" && (
          <div className="arrow right-arrow" style={{ top: `${cursorY}px` }}>
            &#8594;
          </div>
        )}
      </div>

      {!isAboutPage && (
        <div className="container hide-about">
          <div className="row">
            <div className="col-lg-6">
              <p className="mt-p whitespace-pre-wrap">
                {homeData?.homeGalleryDescription}
              </p>
              <Link to="/about" className="view-btn">
                <span>Get to Know Us</span>{" "}
                <i className="bi bi-arrow-right-short"></i>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeTransform;
