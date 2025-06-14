import React from "react";
import GalleryImages from "./GalleryImages";

const TextBlock = ({ data }) => {
  console.log(16 , data);
  
  return (
    <section className="text-block">
      <div className="container">
        <h4 className="text-block-h">{data?.title}</h4>
        {data?.description && (
          <p className="whitespace-pre-wrap">{data?.description}</p>
        )}
        {data?.images && <GalleryImages images={data?.images} />}
      </div>
    </section>
  );
};

export default TextBlock;
