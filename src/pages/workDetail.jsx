import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { gsap } from "gsap";

import innAnimation from "../components/innAnimation";
import ClientComponent from "../components/clientComponent";
import DetailCarousel from "../components/detail/detailCarousel";
import DetailVideo from "../components/detail/detailVideo";
import TextBlock from "../components/detail/textBlock";
import Problem from "../components/detail/problemChallenge";
import Result from "../components/detail/resultSec";
import TestimonialSlider from "../components/detail/detailestimonial";
import ServicesSec from "../components/detail/ServicesSec";
import GalleryImages from "../components/detail/GalleryImages";
import Loading from "../components/detail/Loading";

import sanityClient from "../server/sanityClient";
import { singleProjectQuery } from "../server/querys";
import { ScrollTrigger } from "gsap/all";

const WorkDetail = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { title } = useParams();

  // 🌀 Page Overlay Animation on Entrance
  useEffect(() => {
    if (!loading && data) {
      // Your animations...
      gsap.utils.toArray("section").forEach((section) => {
        gsap.fromTo(
          section,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Delay ScrollTrigger refresh to ensure layout is stable
      setTimeout(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh(); // ✅ solves first-scroll issue on Vercel
        });
      }, 300); // adjust if needed (e.g., 500ms if content is heavy)
    }
  }, [loading, data]);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  // 📦 Fetch data on mount
  innAnimation();
  useEffect(() => {
    const fetchGalleryImages = async () => {
      setLoading(true);
      const result = await sanityClient.fetch(singleProjectQuery, { title });
      setData(result);
      setLoading(false);
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

  return (
    <>
      {/* 🌊 Wave Overlay */}
      <div className="page-wave-overlay" />

      {/* 🔄 Loading Spinner */}
      {loading && <Loading />}

      {/* ✅ Project Content */}
      {!loading && (
        <>
          {data?.description && (
            <section className="inner-sec pb-0">
              <div className="container inn-container">
                <div className="row">
                  <div className="col-lg-12">
                    <h1 className="inn-title">{data?.title}</h1>
                    <p className="inn-p">{data?.description}</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {!data?.description && !data?.mainImage && !data?.multiImages && (
            <section className="inner-sec pb-0">
              <div className="container inn-container">
                <div className="row">
                  <div className="col-lg-12" style={{ height: "300px" }}>
                    <h1 className="inn-title">{data?.title}</h1>
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

          {data?.multiImages?.select === "slider" && (
            <DetailCarousel data={data} />
          )}
          {data?.video?.asset?.url && (
            <DetailVideo url={data?.video?.asset?.url} />
          )}
          {data?.services?.description && <ServicesSec data={data?.services} />}

          {data?.multiImages?.select === "gallery" && (
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
          {data?.testimonials && (
            <TestimonialSlider data={data?.testimonials} />
          )}
        </>
      )}
    </>
  );
};

export default WorkDetail;
