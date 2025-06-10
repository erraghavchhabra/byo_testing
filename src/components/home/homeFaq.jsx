import React from "react";

const FAQSection = () => {
  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">FAQ</h2>
        <div className="accordion" id="faqAccordion">
          {/* FAQ 1 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                What are your core services as a UX design and branding firm?
                <i className="bi bi-chevron-right faq-icon"></i>
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
               <p>
  Our passion for branding and the demand from our clients led us to expand our offering to provide full-service brand design practice and web design and development of marketing websites.
</p>

<p>
  Today, our projects encompass a wide range, from building new products and defining brands to revitalizing existing mobile apps, websites, and enterprise software. We specialize in crafting digital products that wholeheartedly embody the brand’s personality and deliver delightful experiences to your customers.
</p>

<p>
  Our team handles every aspect required to bring a digital product to life. This includes user research, product strategy, branding, user interface and experience design, usability testing, prototyping, web design, and development.
</p>

<p>
  Furthermore, we boast an in-house content production studio that provides creative direction, 2D/3D design, illustration and iconography, motion design, animation, sound design, photo/video, and copywriting services.
</p>

<p>
  For web projects, we integrate considerations for SEO into our process to ensure that our client’s websites are optimized for search engines; however, SEO is not offered as a standalone service.
</p>

              </div>
            </div>
          </div>

          {/* FAQ 2 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                What separates Byo from other branding and web design agencies?
                <i className="bi bi-chevron-right faq-icon"></i>
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Byo stands out with a research-driven approach, personalized design, and global experience.
              </div>
            </div>
          </div>

          {/* FAQ 3 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                Do you work with clients in different timezones?
                <i className="bi bi-chevron-right faq-icon"></i>
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Yes, we work with clients globally and are flexible with time zones for smooth collaboration.
              </div>
            </div>
          </div>

          {/* FAQ 4 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour">
                How much does hiring you for a design project cost?
                <i className="bi bi-chevron-right faq-icon"></i>
              </button>
            </h2>
            <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Our pricing varies based on the project scope. We provide custom quotes after understanding your needs.
              </div>
            </div>
          </div>

          {/* FAQ 5 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFive">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive">
                Do you work with startups?
                <i className="bi bi-chevron-right faq-icon"></i>
              </button>
            </h2>
            <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Absolutely! We love collaborating with startups to build strong brand foundations from the ground up.
              </div>
            </div>
          </div>

          {/* FAQ 6 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingSix">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix">
                What does the process of working with Byo look like?
                <i className="bi bi-chevron-right faq-icon"></i>
              </button>
            </h2>
            <div id="collapseSix" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Our process begins with discovery, followed by strategy, design, and implementation phases — with constant collaboration throughout.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
