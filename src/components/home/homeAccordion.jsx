import { useState } from "react";
import Branding from "../../assets/img/Branding.jpg";
import Packaging from "../../assets/img/Generative-AI.jpg";
import Websites from "../../assets/img/Websites.jpg";
import Signages from "../../assets/img/Digital-products.jpg";
import Content from "../../assets/img/Content.jpg";



const services = [
  {
    id: "collapseOne",
    title: "Branding",
    image: Branding,
    content:
      "We shape brands beyond appearance. We create unique visual and verbal identities, essential assets, and clear guidelines for consistent interactions. Let your brand's story stand out with us.",
  },
  {
    id: "collapseTwo",
    title: "Packaging",
    image: Packaging,
    content:
      "Creating irresistible packaging designs infused with a design aesthetic and a deep understanding of consumer behavior.",
  },
  {
    id: "collapseThree",
    title: "Websites",
    image: Websites,
    content:
      "In today's digital era, a brand's identity originates from its online presence.",
  },
  {
    id: "collapseFour",
    title: "Signages",
    image: Signages,
    content:
      "We guarantee user satisfaction from foundational intricacies to visually compelling designs.",
  },
  {
    id: "collapseFive",
    title: "Content",
    image: Content,
    content:
      "From captivating copy to dynamic graphics and video — we've got it all covered.",
  },
];

const HomeAccordion = ({data}) => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAccordionToggle = (id) => {
    setActiveAccordion(prev => prev === id ? null : id);
  };
  const services = data?.services?.list || []
  
  return (
    <section className="accordion-sec">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 mb-4">
            <h2 className="accordion-con whitespace-pre-wrap">
              {data?.services?.description}
            </h2>
          </div>
          <div className="col-lg-7">
            <div className="m-accordion">
              <div className="accordion" id="serviceAccordion">
                {services.map((service, index) => {
                  const isActive = activeAccordion === index;
                  return (
                    <div 
                      className={`accordion-item ${isActive ? 'active' : ''}`}
                      key={index}
                    >
                      <img
                        src={service?.image?.asset?.url}
                        className="img-fluid accord-img"
                        alt={service.title}
                        loading="lazy"
                      />
                      <h2 className="accordion-header" id={`heading${index + 1}`}>
                        <button
                          className={`accordion-button ${isActive ? '' : 'collapsed'}`}
                          type="button"
                          onClick={() => handleAccordionToggle(index)}
                          aria-expanded={isActive}
                          aria-controls={index}
                        >
                          {service.title}
                        </button>
                      </h2>
                      <div
                        id={index}
                        className={`accordion-collapse collapse ${isActive ? 'show' : ''}`}
                        aria-labelledby={`heading${index + 1}`}
                        data-bs-parent="#serviceAccordion"
                      >
                        <div className="accordion-body">{service?.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAccordion;