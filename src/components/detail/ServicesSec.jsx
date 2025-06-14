import React from "react";

const ServicesSec = ({ data }) => {
  return (
    <div>
      <section className="gray-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <p className="gray-p whitespace-pre-wrap">{data?.description}</p>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <h4 className="">Services</h4>
              <ul class="list-unstyled">
                {data?.list?.map((item, index) => (
                  <li key={index}>{item?.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesSec;
