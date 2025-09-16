import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MultiImageSlider = ({ data }) => {
  console.log(98111, data);

  return (
    data?.slides?.length > 0 && (
      <div className="">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={data?.desktopSlides || "3.3"}
          loop={true}
          autoplay={
            data?.autoplay
              ? { delay: 3000, disableOnInteraction: false }
              : false
          }
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: data?.desktopSlides || "3.3",
              spaceBetween: 20,
            },
          }}
          style={{ padding: "20px 0" }}
        >
          {data?.slides?.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="d-flex align-items-center justify-content-center">
                <img
                  src={src?.url}
                  alt={`Slide ${index}`}
                  className="img-fluid"
                  style={{}}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  );
};

export default MultiImageSlider;
