import React, { useEffect, useState } from "react";
import ClientComponent from "../components/clientComponent";
import DetailCarousel from "../components/detail/detailCarousel";
import innAnimation from "../components/innAnimation";
import DetailVideo from "../components/detail/detailVideo";
import TextBlock from "../components/detail/textBlock";
import Problem from "../components/detail/problemChallenge";
import Result from "../components/detail/resultSec";
import TestimonialSlider from "../components/detail/detailestimonial";
import ServicesSec from "../components/detail/ServicesSec";
import { singleProjectQuery } from "../server/querys";
import sanityClient from "../server/sanityClient";
import { useParams } from "react-router-dom";
import GalleryImages from "../components/detail/GalleryImages";
const WorkDetail = () => {
  const [data, setData] = useState(null);
  const { title } = useParams();

  // Fetch data on component mount and whenever the query changes
  innAnimation();
  useEffect(() => {
    const fetchGalleryImages = async () => {
      const data = await sanityClient.fetch(singleProjectQuery, { title });
      console.log(51515, data);

      setData(data);
    };

    fetchGalleryImages();
  }, []);
  const content = [
    {
      title: data?.identity?.title || "Identity",
      description: data?.identity?.description || null,
      images: data?.identity?.images || null,
    },
    {
      title: data?.colors?.title || "Colors",
      description: data?.colors?.description || null,
      images: data?.colors?.images || null,
    },
    {
      title: data?.iconography?.title || "Iconography",
      description: data?.iconography?.description || null,
      images: data?.iconography?.images || null,
    },
    {
      title: data?.packaging?.title || "Packaging",
      description: data?.packaging?.description || null,
      images: data?.packaging?.images || null,
    },
    {
      title: data?.interior?.title || "Interior",
      description: data?.interior?.description || null,
      images: data?.interior?.images || null,
    },

    {
      title: data?.other?.title || "Other",
      description: data?.other?.description || null,
      images: data?.other?.images || null,
    },
    {
      title: data?.strategySession?.title || "Strategy Session",
      description: data?.strategySession?.description || null,
      images: data?.strategySession?.images || null,
    },
    {
      title: data?.planOfAction?.title || "Plan of Action",
      description: data?.planOfAction?.description || null,
      images: data?.planOfAction?.image ? [data?.planOfAction?.image] : null,
    },
  ];
  console.log("abc", content);

  return (
    <>
      {data?.description && (
        <section className="inner-sec pb-0">
          <div className="container inn-container">
            <div className="row">
              <div className="col-lg-12">
                <h1 className="inn-title">{data?.title}</h1>
                <p className="inn-p">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                  leo.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
      {data?.mainImage?.asset?.url && (
        <img
          className="img-fluid"
          src={data?.mainImage?.asset?.url}
          alt={data?.title}
        />
      )}
      {data?.multiImages?.select == "slider" && <DetailCarousel data={data} />}
      {data?.video?.asset?.url && <DetailVideo url={data?.video?.asset?.url} />}
      {data?.services?.description && <ServicesSec data={data?.services} />}
      {data?.multiImages?.select == "gallery" && (
        <GalleryImages images={data?.multiImages?.images} />
      )}

      {data?.problemAndChallenges?.problem?.description && (
        <Problem data={data?.problemAndChallenges} />
      )}
      {content.map(
        (item, index) =>
          (item?.description || item?.images) && (
            <TextBlock key={index} data={item} />
          )
      )}
      {data?.results && <Result data={data?.results} />}
      {data?.testimonials && <TestimonialSlider data={data?.testimonials} />}
    </>
  );
};

export default WorkDetail;
