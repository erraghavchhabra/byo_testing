import React, { useEffect, useState } from "react";
import Industries from "../components/serviceIndustries";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import sanityClient from "../server/sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { servicesQuery } from "../server/querys";

gsap.registerPlugin(ScrollTrigger);
const builder = imageUrlBuilder(sanityClient);
const urlFor = (source) => builder.image(source);

const ServiceSection = ({
  title,
  description,
  points,
  img1,
  img2,
  reverse,
}) => (
  <section className="serv-space">
    <div className="container">
      <div className="row">
        <div className={`col-lg-5 ${reverse ? "order-lg-2" : ""}`}>
          <div className="serv-con">
            <h3 className="serv-h">{title}</h3>
            <p className="whitespace-pre-wrap">{description}</p>
            <ul className="list-unstyled">
              {points?.map((p, i) => (
                <li key={i}>{p?.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className={`col-lg-7 ${reverse ? "order-lg-1" : ""}`}>
          <div
            className={`serv-img-box ${
              reverse ? "serv-img-left" : "serv-img-right"
            }`}
          >
            <img src={img1} className="img-fluid serv-icon" alt="" />
            <img src={img2} className="img-fluid serv-img" alt="" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Services = () => {
  const [servicesData, setServicesData] = useState(null);

  useEffect(() => {
    gsap.utils.toArray(".serv-img-box, .serv-con").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    sanityClient.fetch(servicesQuery).then((data) => {
      const process = (s) => ({
        ...s,
        imageUrl: s?.image ? urlFor(s.image).width(800).url() : null,
        brandingImageUrl: s?.brandingImage
          ? urlFor(s.brandingImage).width(800).url()
          : null,
      });
      setServicesData({
        branding: process(data.branding),
        digitalProducts: process(data.digitalProducts),
        websites: process(data.websites),
        content: process(data.content),
        development: process(data.development),
        industries: data.industries,
        servicesHeader: data.servicesHeader,
      });
    });
  }, []);
  const data = [
    {
      title: servicesData?.branding?.title || "Branding",
      description: servicesData?.branding?.description,
      points: servicesData?.branding?.capabilities,
      img1: servicesData?.branding?.brandingImageUrl,
      img2: servicesData?.branding?.imageUrl,
      reverse: false,
    },
    {
      title: servicesData?.digitalProducts?.title || "Digital Products",
      description: servicesData?.digitalProducts?.description,
      points: servicesData?.digitalProducts?.capabilities,
      img1: servicesData?.branding?.brandingImageUrl,
      img2: servicesData?.branding?.imageUrl,
      reverse: true,
    },
    {
      title: servicesData?.websites?.title || "Websites",
      description: servicesData?.websites?.description,
      points: servicesData?.websites?.capabilities,
      img1: servicesData?.websites?.brandingImageUrl,
      img2: servicesData?.websites?.imageUrl,
      reverse: false,
    },
    {
      title: servicesData?.content?.title || "Content",
      description: servicesData?.content?.description,
      points: servicesData?.content?.capabilities,
      img1: servicesData?.content?.brandingImageUrl,
      img2: servicesData?.content?.imageUrl,
      reverse: true,
    },
    {
      title: servicesData?.development?.title || "Development",
      description: servicesData?.development?.description,
      points: servicesData?.development?.capabilities,
      img1: servicesData?.development?.brandingImageUrl,
      img2: servicesData?.development?.imageUrl,
      reverse: false,
    },
  ];

  return (
    <div>
      <section className="inner-sec pb-0">
        <div className="container inn-container">
          <div className="row">
            <div className="col-lg-6">
              <h1 className="inn-title">
                {servicesData?.servicesHeader?.mainTitle}
              </h1>
              <p className="inn-p">
                {servicesData?.servicesHeader?.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="serv-holdder">
        {data.map((d, i) => (
          <ServiceSection
            key={i}
            title={d.title}
            img1={d.img1}
            img2={d.img2}
            reverse={d.reverse}
            description={d.description}
            points={d.points}
          />
        ))}
      </div>

      <Industries servicesData={servicesData}/>
    </div>
  );
};

export default Services;
