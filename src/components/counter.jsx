import React from "react";

const Counter = ({aboutData}) => {
  const data = [
    {
      title: "Team Members",
      number: aboutData?.company_stats?.team_members || 0,
    },
    {
      title: "Years In Business",
      number: aboutData?.company_stats?.years_in_business || 0,
    },
    {
      title: "Projects Completed",
      number: aboutData?.company_stats?.projects_completed || 0,
    },
  ];
  
  return (
    <div>
      <section className="counter-sec">
        <div className="container">
          <div className="row">
            {
              data.map((item , index) => (
                <div key={index} className="col-lg-3">
                  <div className="counter-box">
                    <h1 className="counter-number">{item.number}</h1>
                    <p>{item.title}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default Counter;
