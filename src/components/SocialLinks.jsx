import React, { useEffect, useState } from "react";
import sanityClient from "../server/sanityClient";
import { contactQuery } from "../server/querys";

function SocialLinks({classNames}) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchGalleryImages = async () => {
      const data = await sanityClient.fetch(contactQuery);

      setData(data);
    };

    fetchGalleryImages();
  }, []);
  return (
    <ul class={`social-ul ${classNames} list-instyled list-inline`}>
      {data?.socialLinks?.map((item, index) => (
        <li key={index} className="list-inline-item">
          <a href={item?.link} target="_blank" rel="noopener noreferrer">
            <i className={`bi bi-${item?.name?.toLowerCase()}`}></i>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default SocialLinks;
