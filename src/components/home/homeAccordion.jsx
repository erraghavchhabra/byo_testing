import React, { useEffect } from "react";
import Branding from "../../assets/img/Branding.jpg";
import Packaging from "../../assets/img/Generative-Ai.jpg";
import Websites from "../../assets/img/Websites.jpg";
import Signages from "../../assets/img/Digital-products.jpg";
import Content from "../../assets/img/Content.jpg";

const HomeAccordion = () => {
  useEffect(() => {
    const items = document.querySelectorAll(".accordion-item");

    items.forEach((item) => {
      const collapse = item.querySelector(".accordion-collapse");

      collapse.addEventListener("show.bs.collapse", () => {
        item.classList.add("active");

        // Hide images of all other collapsed accordions
        items.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
          }
        });
      });

      collapse.addEventListener("hide.bs.collapse", () => {
        item.classList.remove("active");
      });
    });

    return () => {
      items.forEach((item) => {
        const collapse = item.querySelector(".accordion-collapse");
        collapse.removeEventListener("show.bs.collapse", () => {});
        collapse.removeEventListener("hide.bs.collapse", () => {});
      });
    };
  }, []);

  return (
    <section className="accordion-sec">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 mb-4">
            <h2 className="accordion-con">
              We partner for your success journey, offering expert design excellence.
              Entrust us with creativity, while you focus on vital project aspects.
              Let's innovate together for your project's success!
            </h2>
          </div>
          <div className="col-lg-7">
            <div className="m-accordion">
              <div className="accordion" id="serviceAccordion">
                {/* Branding */}
                <div className="accordion-item">
                  <img src={Branding} className="img-fluid accord-img" alt="Branding" />
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      Branding
                    </button>
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse"
                    aria-labelledby="headingOne" data-bs-parent="#serviceAccordion">
                    <div className="accordion-body">
                      We shape brands beyond appearance. We create unique visual and verbal identities,
                      essential assets, and clear guidelines for consistent interactions.
                      Let your brand’s story stand out with us.
                    </div>
                  </div>
                </div>

                {/* Packaging */}
                <div className="accordion-item">
                  <img src={Packaging} className="img-fluid accord-img" alt="Packaging" />
                  <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed" type="button"
                      data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                      aria-expanded="false" aria-controls="collapseTwo">
                      Packaging
                    </button>
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse"
                    aria-labelledby="headingTwo" data-bs-parent="#serviceAccordion">
                    <div className="accordion-body">
                      Creating irresistible packaging designs infused with a design aesthetic
                      and a deep understanding of consumer behavior.
                    </div>
                  </div>
                </div>

                {/* Websites */}
                <div className="accordion-item">
                  <img src={Websites} className="img-fluid accord-img" alt="Websites" />
                  <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button collapsed" type="button"
                      data-bs-toggle="collapse" data-bs-target="#collapseThree"
                      aria-expanded="false" aria-controls="collapseThree">
                      Websites
                    </button>
                  </h2>
                  <div id="collapseThree" className="accordion-collapse collapse"
                    aria-labelledby="headingThree" data-bs-parent="#serviceAccordion">
                    <div className="accordion-body">
                      In today’s digital era, a brand’s identity originates from its online presence.
                    </div>
                  </div>
                </div>

                {/* Signages */}
                <div className="accordion-item">
                  <img src={Signages} className="img-fluid accord-img" alt="Signages" />
                  <h2 className="accordion-header" id="headingFour">
                    <button className="accordion-button collapsed" type="button"
                      data-bs-toggle="collapse" data-bs-target="#collapseFour"
                      aria-expanded="false" aria-controls="collapseFour">
                      Signages
                    </button>
                  </h2>
                  <div id="collapseFour" className="accordion-collapse collapse"
                    aria-labelledby="headingFour" data-bs-parent="#serviceAccordion">
                    <div className="accordion-body">
                      We guarantee user satisfaction from foundational intricacies to visually compelling designs.
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="accordion-item">
                  <img src={Content} className="img-fluid accord-img" alt="Content" />
                  <h2 className="accordion-header" id="headingFive">
                    <button className="accordion-button collapsed" type="button"
                      data-bs-toggle="collapse" data-bs-target="#collapseFive"
                      aria-expanded="false" aria-controls="collapseFive">
                      Content
                    </button>
                  </h2>
                  <div id="collapseFive" className="accordion-collapse collapse"
                    aria-labelledby="headingFive" data-bs-parent="#serviceAccordion">
                    <div className="accordion-body">
                      From captivating copy to dynamic graphics and video — we’ve got it all covered.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAccordion;
