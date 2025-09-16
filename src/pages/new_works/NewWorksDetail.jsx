// NewWorksDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NewprojectDetailQuery } from "../../server/querys";
import sanityClient from "../../server/sanityClient";
import DetailVideo from "../../components/detail/detailVideo";
import BlockContent from "@sanity/block-content-to-react";
import NewGalleryImages from "../../components/newprojects/NewGalleryImages";
import SlidesImages from "../../components/newprojects/SlidesImages";
import { AnimatedTestimonials } from "../../components/ui/animated-testimonials";
import MultiImageSlider from "../../components/newprojects/MultiImageSlider";
import CounterCards from "../../components/newprojects/CounterCards";
import FileEmbed from "../../components/newprojects/FileEmbed";
import EmbedBlock from "../../components/newprojects/EmbedBlock";
const getMediaType = (ext) => {
  const videoExts = ["mp4", "mov", "webm"];
  if (videoExts.includes(ext?.toLowerCase())) return "video";
  return "image";
};

const HeroBlock = ({ data }) => {
  const imageUrl = data.mediaUrl;
  const mediaType = getMediaType(data.mediaExt);
  return (
    <section className="inner-sec pb-0">
      <div className="container inn-container">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="inn-title">{data?.title}</h1>
            <p className="inn-p">{data?.description}</p>
          </div>
        </div>
      </div>
      <div className="mt-2">
        {mediaType === "video" ? (
          <DetailVideo url={imageUrl} />
        ) : (
          <img className="img-fluid w-100" src={imageUrl} alt={data?.title} />
        )}
      </div>
    </section>
  );
};

const RichTextBlock = ({ data }) => {
  if (!data?.content) return null;

  const serializers = {
    types: {
      block: (props) => {
        const { style = "normal" } = props.node;
        switch (style) {
          case "h2":
            return <h2 className="h2 mb-3">{props.children}</h2>;
          case "h3":
            return <h3 className="h3 mb-2">{props.children}</h3>;
          default:
            return <p className="">{props.children}</p>;
        }
      },
    },
    list: (props) => {
      const { type } = props;
      if (type === "bullet") {
        return <ul className="">{props.children}</ul>;
      }
      if (type === "number") {
        return <ol className="">{props.children}</ol>;
      }
      return <ul>{props.children}</ul>;
    },
    listItem: (props) => <li className="mb-1">{props.children}</li>,
    marks: {
      strong: (props) => <strong>{props.children}</strong>,
      em: (props) => <em>{props.children}</em>,
      link: ({ mark, children }) => (
        <a
          href={mark.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary text-decoration-underline"
        >
          {children}
        </a>
      ),
    },
  };

  return (
    <section className="bg-light ms-richtxt">
      <div className="container">
        <div className="col-lg-10 offset-lg-1">
          <BlockContent blocks={data.content} serializers={serializers} />
        </div>
      </div>
    </section>
  );
};

const MediaBlock = ({ data }) => {
  const imageUrl = data.mediaUrl;
  const mediaType = getMediaType(data.mediaExt);
  return (
    <section className="container my-4">
      <div className="mt-2">
        {mediaType === "video" ? (
          <DetailVideo url={imageUrl} />
        ) : (
          <img className="img-fluid w-100" src={imageUrl} alt={data?.title} />
        )}
      </div>
    </section>
  );
};

const ImageGridBlock = ({ data }) => {
  return <NewGalleryImages images={data.images} />;
};

const TextMediaBlock = ({ data }) => (
  <div className="container my-5">
    <div className="row align-items-center g-4">
      {/* Text Section */}
      <div
        className={`col-lg-6 ${
          data.mediaPosition === "left" ? "order-lg-2" : "order-lg-1"
        }`}
      >
        <h2 className="fw-bold mb-3">{data.heading}</h2>
        <div
          className="text-muted fs-5"
          dangerouslySetInnerHTML={{ __html: data.text }}
        />
      </div>

      {/* Media Section */}
      <div
        className={`col-lg-6 ${
          data.mediaPosition === "left" ? "order-lg-1" : "order-lg-2"
        }`}
      >
        {data.mediaUrl && (
          <div className="position-relative rounded-4 overflow-hidden shadow-sm">
            {/* Background blur */}
            <div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                backgroundImage: `url(${data.mediaUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(15px)",
                transform: "scale(1.1)",
                zIndex: 1,
              }}
            ></div>

            {/* Foreground image */}
            <img
              src={data.mediaUrl}
              alt="text-media"
              className="position-relative img-fluid w-100"
              style={{ objectFit: "contain", zIndex: 2 }}
            />
          </div>
        )}
      </div>
    </div>
  </div>
);

const QuoteBlock = ({ data }) => {
  return (
    <div className="container my-4 text-center fst-italic">
      <AnimatedTestimonials testimonials={data?.quotes} />
    </div>
  );
};

const SpacerBlock = ({ data }) => {
  const size = data?.size || "sm";

  // px mapping
  const sizeMap = {
    sm: 20, // 1rem
    md: 40, // 2rem
    lg: 60, // 3rem
  };

  return (
    <div
      style={{
        paddingTop: sizeMap[size] || sizeMap.sm,
        paddingBottom: sizeMap[size] || sizeMap.sm,
      }}
    />
  );
};
function NewWorksDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await sanityClient.fetch(NewprojectDetailQuery(slug));
        setProject(data);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (!project)
    return <div className="text-center py-5">Project not found</div>;

  return (
    <div className="w-100">
      {project.blocks.map((block, index) => {
        switch (block._type) {
          case "heroBlock":
            return <HeroBlock key={index} data={block} />;
          case "richTextBlock":
            return <RichTextBlock key={index} data={block} />;
          case "fullWidthMediaBlock":
            return <MediaBlock key={index} data={block} />;
          case "imageGridBlock":
            return <ImageGridBlock key={index} data={block} />;
          case "textMediaBlock":
            return <TextMediaBlock key={index} data={block} />;
          case "sliderBlock":
            return <SlidesImages key={index} images={block?.slides} />;
          case "quoteBlock":
            return <QuoteBlock key={index} data={block} />;
          case "statsBlock":
            return <CounterCards key={index} data={block} />;
          case "multiImageSliderBlock":
            return <MultiImageSlider key={index} data={block} />;
          case "embedBlock":
            return <EmbedBlock key={index} data={block} />;
          case "spacerBlock":
            return <SpacerBlock key={index} data={block} />;
          default:
            return null;
        }
      })}


    </div>
  );
}

export default NewWorksDetail;
