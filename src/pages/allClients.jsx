import React, { useEffect, useState } from "react";
import ClientComponent from "../components/clientComponent";
import innAnimation from "../components/innAnimation";
import { clientsQuery } from "../server/querys";
import sanityClient from "../server/sanityClient";
import TestimonialSlider from "../components/detail/detailestimonial";
const Clients = () => {
  innAnimation();
  const [clients, setClients] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await sanityClient.fetch(clientsQuery);
        setClients(data || {});
      } catch (err) {
        console.error("Failed to fetch about clients", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);
  return (
    <>
      <section className="inner-sec pb-0">
        <div className="container inn-container">
          <div className="row">
            <div className="col-lg-6">
              <h1 className="inn-title">
                {clients?.clientHeader?.mainTitle || "Clients"}
              </h1>
              <p className="inn-p whitespace-pre-wrap">
                {clients?.clientHeader?.description}
              </p>
            </div>
          </div>
        </div>
      </section>
      <ClientComponent clients={clients} />
      <TestimonialSlider data={clients?.comments}/>
    </>
  );
};

export default Clients;
