import React, { useEffect, useState } from "react";
import AboutHero from "../components/aboutHero";
import innAnimation from "../components/innAnimation";
import Counter from "../components/counter";
import HomeTransform from "../components/home/homeTransform";
import WhyByo from "../components/whyUs";
import Capabilities from "../components/capabilities";
import sanityClient from "../server/sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { aboutQuery } from "../server/querys";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}
const About = () => {
  innAnimation();
  const [aboutData, setAboutData] = useState(null);
  useEffect(() => {
    const fetchAbout = async () => {
      const data = await sanityClient.fetch(aboutQuery);

      const processed = {
        ...data,
        aboutHeaderImageUrl: data?.aboutHeaderImage
          ? urlFor(data.aboutHeaderImage).url()
          : null,
        aboutGallery: {
          ...data.aboutGallery,
        },
        whyByo:
          data.whyByo?.map((item) => ({
            ...item,
            imageUrl: item.image ? urlFor(item.image).width(600).url() : null,
          })) || [],
        capabilities: {
          ...data.capabilities,
          awardsUrls: data.capabilities?.awards
            ? data.capabilities.awards.map((img) =>
                urlFor(img).width(300).url()
              )
            : [],
        },
      };

      setAboutData(processed);
    };

    fetchAbout();
  }, []);

  return (
    <>
      <AboutHero aboutData={aboutData} />
      <Counter aboutData={aboutData} />

      <div className="container">
        <div className="hq">
          <h2 className="hq-title">{aboutData?.aboutGallery?.name}</h2>
          <p>{aboutData?.aboutGallery?.title}</p>
        </div>
      </div>
      <HomeTransform />
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <p class="inn-p whitespace-pre-wrap">{aboutData?.aboutGallery?.description}</p>
          </div>
        </div>
      </div>

      <WhyByo aboutData={aboutData} />
      <Capabilities aboutData={aboutData} />
    </>
  );
};

export default About;
