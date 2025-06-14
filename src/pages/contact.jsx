import React, { useEffect, useState } from "react";
import AboutHero from "../components/aboutHero";
import innAnimation from "../components/innAnimation";
import ContactImg from "../assets/img/Contact.avif";
import sanityClient from "../server/sanityClient";
import { contactQuery } from "../server/querys";
const Contact = () => {
  const [data, setData] = useState(null);
  innAnimation();
  useEffect(() => {
    const fetchGalleryImages = async () => {
      const data = await sanityClient.fetch(contactQuery);

      setData(data);
    };

    fetchGalleryImages();
  }, []);
  return (
    <>
      <section className="inner-sec">
        <div className="container inn-container">
          <div className="row">
            <div className="col-lg-5 my-auto">
              <h1 class="inn-title">{data?.title || "Let’s Talk"}</h1>
              <p class="inn-p">{data?.description}</p>
              <ul className="list-inline cont-ul">
                {data?.emails?.map((item, index) => (
                  <li key={index} className="list-inline-item">
                    <p>{item?.title}</p>
                    <a href={`mailto:${item?.email}`} className="view-btn">
                      <span>{item?.email}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <ul class="social-ul con-social list-instyled list-inline">
                {data?.socialLinks?.map((item, index) => (
                  <li key={index} className="list-inline-item">
                    <a
                      href={item?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className={`bi bi-${item?.name?.toLowerCase()}`}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-5 offset-lg-2">
              <img src={data?.imageUrl} className="img-fluid" alt={data?.title} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
