import React from "react";
import Art from "../../assets/img/art.png"
const Result = ({data}) => {
  return (
    <div>
      <section className="prob-sec result-sec">
        <img src={Art} className="img-fluid shape-img" alt="" />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row">
                <div className="col-lg-5">
                  <h6 className="prob-sub-h">Result</h6>
                  <p className="whitespace-pre-wrap">{data?.description}</p>
                  <ul className="list-unstyled prob-list">
                    {data?.points?.map((point, index) => (
                      <li key={index}>{point?.title}</li>
                    ))}
                  </ul>
                </div>
                <div className="col-lg-5 offset-lg-2">
                  <div className="res-widget">
                    <p className="res-sub-h">ROI</p>
                    <h1 className="res-h">{data?.roi || 0}%</h1>
                  </div>

                  <div className="res-widget">
                    <p className="res-sub-h">Customers</p>
                    <h1 className="res-h">{data?.customers || 0}</h1>
                  </div>

                  <div className="res-widget">
                    <p className="res-sub-h">Downloads</p>
                    <h1 className="res-h">{data?.downloads || 0}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
          <div className="col-lg-10">
          <div className="m-cta">
            <div className="row">
              <div className="col-lg-6">
                <h2 className="cta-h">Have an idea?</h2>
                <h2 className="cta-h">Let’s get it done right!</h2>
              </div>
              <div className="col-lg-6 text-lg-end">
                <a href={data?.link} target="_blank" className="view-btn"><span>Let's Work Together</span> <i class="bi bi-arrow-right-short"></i></a>
              </div>
            </div>
          </div>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Result;
