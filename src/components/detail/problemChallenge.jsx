import React from "react";
const Problem = ({ data }) => {
  const content = [
    {
      title: "PROBLEM",
      description: data?.problem?.description,
      points: data?.problem?.points,
    },
    {
      title: "CHALLENGES",
      description: data?.challenges?.description,
      points: data?.challenges?.points,
    },
  ];
  return (
    <div>
      <section className="prob-sec">
        <div className="container">
          <div className="row justify-content-center">
            {content.map((item, index) => (
              <div key={index} className="col-lg-5">
                <h6 className="prob-sub-h">{item?.title}</h6>
                <p className="whitespace-pre-wrap">{item.description}</p>
                {item.points && (
                  <ul className="list-unstyled prob-list">
                    {item.points?.map((point, index) => (
                      <li key={index}>{point?.title}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Problem;
