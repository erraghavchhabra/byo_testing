import React from "react";

const EmbedBlock = ({ data }) => {
  const { embedUrl, type, caption } = data;
  console.log(66141, data);

  const renderEmbed = () => {
    switch (type) {
      case "video":
        return (
          <iframe
            src={embedUrl}
            title={caption || "Video Embed"}
            className="w-full h-64 md:h-96 rounded-lg"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            width="100%"
            height={600}
          ></iframe>
        );
      case "prototype":
        return (
          <iframe
            src={embedUrl}
            title={caption || "Prototype Embed"}
            className="w-full h-96 rounded-lg border"
            frameBorder="0"
          ></iframe>
        );
      case "lottie":
        return (
          <iframe
            src={embedUrl}
            title={caption || "Lottie Embed"}
            className="w-full h-64 md:h-96 rounded-lg"
            frameBorder="0"
          ></iframe>
        );
      case "other":
      default:
        return (
          <div className="w-full p-4 border rounded-lg text-center text-gray-500">
            <a href={embedUrl} target="_blank" rel="noopener noreferrer">
              {caption}
            </a>
          </div>
        );
    }
  };

  return (
    <div className="my-6">
      {renderEmbed()}
      {caption && <p className="mt-2 text-center text-gray-600">{caption}</p>}
    </div>
  );
};

export default EmbedBlock;
