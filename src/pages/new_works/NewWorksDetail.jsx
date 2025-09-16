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

const getMediaType = (ext) => {
  const videoExts = ["mp4", "mov", "webm"];
  if (videoExts.includes(ext?.toLowerCase())) return "video";
  return "image";
};
// Bootstrap block components
const HeroBlock = ({ data }) => {
  const imageUrl = data.mediaUrl;

  // Example usage
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
        {mediaType == "video" ? (
          <div>
            <DetailVideo url={imageUrl} />
          </div>
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
      // Agar tumhe custom type render karna ho
      block: (props) => {
        const { style = "normal" } = props.node;
        switch (style) {
          case "h2":
            return <h2 className="h2">{props.children}</h2>;
          case "h3":
            return <h3 className="h3">{props.children}</h3>;
          default:
            return (
              <p className="gray-p whitespace-pre-wrap">{props.children}</p>
            );
        }
      },
    },
  };
  return (
    <section className="gray-sec">
      <div className="container offset-lg-1">
        <BlockContent blocks={data.content} serializers={serializers} />
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
        {mediaType == "video" ? (
          <div>
            <DetailVideo url={imageUrl} />
          </div>
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
  <div className="container mx-auto my-4 row align-items-center">
    <div
      className={`col-md-6 order-md-${
        data.mediaPosition === "left" ? "2" : "1"
      }`}
    >
      <h4>{data.heading}</h4>
      <div dangerouslySetInnerHTML={{ __html: data.text }} />
    </div>
    <div
      className={`col-md-6 order-md-${
        data.mediaPosition === "left" ? "1" : "2"
      }`}
    >
      {data.mediaUrl && (
        <img src={data.mediaUrl} alt="text-media" className="img-fluid w-100" />
      )}
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

const StatsBlock = ({ data }) => (
  <div className="container my-4 d-flex flex-wrap justify-content-center gap-4">
    {data.stats?.map((stat, idx) => (
      <div key={idx} className="text-center">
        <p className="fs-3 fw-bold">{stat.value}</p>
        <p className="text-muted">{stat.label}</p>
      </div>
    ))}
  </div>
);

const EmbedBlock = ({ data }) => (
  <div
    className="container my-4"
    dangerouslySetInnerHTML={{ __html: data.embedCode }}
  />
);

const SpacerBlock = () => <div className="my-4" />;

// Main Component
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
  console.log(9156151, project.blocks);

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
            return <SlidesImages images={block?.slides} />;
          case "quoteBlock":
            return <QuoteBlock key={index} data={block} />;
          case "statsBlock":
            return <StatsBlock key={index} data={block} />;
          case "embedBlock":
            return <EmbedBlock key={index} data={block} />;
          case "spacerBlock":
            return <SpacerBlock key={index} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

export default NewWorksDetail;
