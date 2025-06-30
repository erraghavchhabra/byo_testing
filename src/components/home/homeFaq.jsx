import React, { useEffect, useState } from "react";
import sanityClient from "../../server/sanityClient";
import { faqQuery } from "../../server/querys";

const FAQSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      const faq = await sanityClient.fetch(faqQuery);
      setData(faq);
    };

    fetchGalleryImages();
  }, []);

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">{data?.sectionTitle || "FAQ"}</h2>
        <div className="accordion" id="faqAccordion">
          {data?.faqs?.map((faq, index) => {
            const headingId = `heading-${index}`;
            const collapseId = `collapse-${index}`;

            return (
              <div key={index} className="accordion-item">
                <h2 className="accordion-header" id={headingId}>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${collapseId}`}
                    aria-expanded="false"
                    aria-controls={collapseId}
                  >
                    {faq?.title}
                    <i className="bi bi-chevron-right faq-icon"></i>
                  </button>
                </h2>
                <div
                  id={collapseId}
                  className="accordion-collapse collapse"
                  aria-labelledby={headingId}
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    <p className="whitespace-pre-wrap">{faq?.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
