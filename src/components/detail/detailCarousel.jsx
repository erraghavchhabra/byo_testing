import React from "react";

const DetailCarousel = ({data}) => {
  return (
    <div>
      <section className="detail-slider">
        <div id="detailCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {data?.multiImages?.images?.map((image, index) => (
              <div key={index} className={`carousel-item ${index == 0 && "active"}`}>
                <img src={image?.asset?.url} className="d-block w-100" alt={`image-${index}`} />
              </div>
            ))}
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#detailCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#detailCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default DetailCarousel;
