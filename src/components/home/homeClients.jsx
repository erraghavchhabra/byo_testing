import React, { useEffect, useState } from "react";
import { aboutClientsQuery } from "../../server/querys";
import sanityClient from "../../server/sanityClient";
import { Link } from "react-router-dom";
const HomeClients = () => {
  const [clients, setClients] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await sanityClient.fetch(aboutClientsQuery);
        const all = [...data?.startups, ...data?.smb, ...data?.enterprise];
        setClients(all || []);
      } catch (err) {
        console.error("Failed to fetch about clients", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <div>
      <section className="client-sec">
        <div className="container">
          <ul className="list-inline client-ul">
            {clients?.map((item, index) => (
              <li key={index}>
                <img
                  src={item?.imageUrl}
                  className="img-fluid"
                  alt={item?.name}
                />
              </li>
            ))}
          </ul>
          <div className="text-center">
            <Link to={"/clients"} className="view-btn">
              <span>View All Clients</span>{" "}
              <i className="bi bi-arrow-right-short"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeClients;
