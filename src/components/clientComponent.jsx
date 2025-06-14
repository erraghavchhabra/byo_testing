import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ClientComponent = ({ clients }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const elements = sectionRef.current.querySelectorAll(".client-ul li");

    elements.forEach((el, index) => {
      gsap.fromTo(
        el,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.05,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);
  const data = [
    {
      title: "Startups",
      clients: clients?.startups,
    },
    {
      title: "Small and medium-sized businesses",
      clients: clients?.smb,
    },
    {
      title: "Enterprise",
      clients: clients?.enterprise,
    },
  ];
  return (
    <div ref={sectionRef}>
      <section className="client-sec">
        <div className="container">
          {data?.map((item, index) => (
            <div key={index}>
              <h4 className="client-h">
                {index + 1 < 10 ? "0" : ""}
                {index + 1} {item?.title}
              </h4>
              <ul className="list-inline client-ul">
                {item?.clients?.map((client, i) => (
                  <li key={i}>
                    <img
                      src={client?.imageUrl}
                      className="img-fluid"
                      alt={client.name}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ClientComponent;
