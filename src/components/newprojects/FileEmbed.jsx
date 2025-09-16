import React from 'react';

const FileEmbed = ({ src = "https://www.youtube.com/embed/dQw4w9WgXcQ", height = 500 }) => {
  return (
    <div class="container">
        <div className="video-embed-wrapper">
      <iframe
        src={src}
        title="Embedded Video"
        width="100%"
        height={height}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
    </div>
  );
};

export default FileEmbed;