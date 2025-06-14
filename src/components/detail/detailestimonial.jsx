import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "bootstrap-icons/font/bootstrap-icons.css";

import Avatar from "../../assets/img/avatar.png";

const testimonials = [
  {
    comment: `Their work is quite fast and results are impeccable although they are a smaller agency but has its resources in one place with a talented young team.`,
    user: {
      profileUrl: Avatar,
      position: "Director, Envato",
      name: "John Doe",
    },
  },
  {
    comment: `Their work is quite fast and results are impeccable although they are a smaller agency but has its resources in one place with a talented young team.`,
    user: {
      profileUrl: Avatar,
      position: "Director, Envato",
      name: "John Doe",
    },
  },
  {
    comment: `Their work is quite fast and results are impeccable although they are a smaller agency but has its resources in one place with a talented young team.`,
    user: {
      profileUrl: Avatar,
      position: "Director, Envato",
      name: "John Doe",
    },
  },
];

const TestimonialSlider = ({ data }) => {
  const testimonialdata = data || testimonials;
  return (
    <section className="testimonial-sec">
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="position-relative">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                loop
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                speed={1000}
                pagination={{
                  el: ".custom-pagination",
                  type: "custom",
                  renderCustom: (swiper, current, total) => {
                    const formattedCurrent =
                      current < 10 ? `0${current}` : current;
                    const formattedTotal = total < 10 ? `0${total}` : total;
                    return `${formattedCurrent} / ${formattedTotal}`;
                  },
                }}
              >
                {testimonialdata?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="testimonial-slide">
                      <div className="test-img">
                        <img
                          src={item?.user?.profileUrl}
                          alt={item?.user?.name}
                          className="avatar-img"
                        />
                      </div>

                      <div className="test-con">
                        <p className="testimonial-text whitespace-pre-wrap">
                          “ {item?.comment} ”
                        </p>
                        <div className="testimonial-author">
                          <strong>{item?.user?.name}</strong>
                          {item?.user?.position && (
                            <div className="testimonial-position">
                              {item?.user?.position}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="custom-pagination"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
