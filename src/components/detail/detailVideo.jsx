import React from "react";

const DetailVideo = ({url}) => {
  return (
    <div>
      <section className="detail-video">
        <video autoPlay muted loop playsInline className="w-100">
          <source src={url} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </section>
    </div>
  );
};

export default DetailVideo;
