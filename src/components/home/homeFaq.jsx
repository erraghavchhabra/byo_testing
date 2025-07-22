import React, { useEffect, useState, useRef } from "react";
import sanityClient from "../../server/sanityClient";
import { faqQuery } from "../../server/querys";

const FAQSection = () => {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      const faq = await sanityClient.fetch(faqQuery);
      setData(faq);
    };
    fetchFaqs();
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">{data?.sectionTitle || "FAQ"}</h2>

        <div className="accordion">
          {data?.faqs?.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <div key={index} className="accordion-item">
                <button
                  className={`accordion-button ${isActive ? "" : "collapsed"}`}
                  onClick={() => toggleFAQ(index)}
                >
                  {faq?.title}
                  <i
                    className={`bi faq-icon ${
                      isActive ? "bi-chevron-up" : "bi-chevron-down"
                    }`}
                  ></i>
                </button>

                <div
                  className="accordion-collapse"
                  ref={(el) => (contentRefs.current[index] = el)}
                  style={{
                    maxHeight: isActive
                      ? `${contentRefs.current[index]?.scrollHeight}px`
                      : "0px",
                  }}
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
