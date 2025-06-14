import React from "react";
import Big from "../assets/img/big.avif";
import HomeClients from "./home/homeClients";
const Capabilities = ({ aboutData }) => {
  return (
    <div>
      <section className="caps-sec">
        <img src={Big} className="bundle-img img-fluid" alt="" />
        <div className="container">
          <h1 className="caps-h">
            {aboutData?.capabilities?.title || "Capabilities"}
          </h1>
          <div className="caps-box">
            <div className="row">
              <div className="col-lg-3">
                <h4 className="caps-sm-h">
                  {aboutData?.capabilities?.branding?.title || "Branding"}
                </h4>
              </div>
              <div className="col-lg-4">
                <ul class="list-unstyled">
                  {aboutData?.capabilities?.branding?.capabilities?.map(
                    (item, index) => (
                      <li key={index}>
                        <span>{item?.name}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="caps-box">
            <div className="row">
              <div className="col-lg-3">
                <h4 className="caps-sm-h">
                  {aboutData?.capabilities?.digitalProducts?.title ||
                    "Digital Products"}
                </h4>
              </div>
              <div className="col-lg-4">
                <ul class="list-unstyled">
                  {aboutData?.capabilities?.digitalProducts?.capabilities?.map(
                    (item, index) => (
                      <li key={index}>
                        <span>{item?.name}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container cap-space">
          <h1 className="caps-h">Clients</h1>
        </div>
        <HomeClients />

        <div className="container">
          <h1 className="caps-h cap-space pt-0">Awards</h1>
          <div className="row">
            {aboutData?.capabilities?.awardsUrls?.map((item, index) => (
              <div key={index} className="col-lg-3">
                <div className="cap-award">
                  <img src={item} className="img-fluid" alt={index} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Capabilities;
