import React, { useEffect, useState } from "react";
import Helix from "../assets/img/helix.png";
import { gsap } from "gsap";
import sanityClient from "../server/sanityClient";
import { contactQuery } from "../server/querys";
import { Link } from "react-router-dom";

const Footer = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    gsap.to(".ft-helix", {
      scale: 1.2,
      repeat: -1,
      yoyo: true,
      duration: 5,
      ease: "power1.inOut",
    });
  }, []);
  useEffect(() => {
    const fetchGalleryImages = async () => {
      const data = await sanityClient.fetch(contactQuery);

      setData(data);
    };

    fetchGalleryImages();
  }, []);
  const email = data?.emails?.[0]?.email || "hey@byo.sa";
  const pages = [
    { name: "Work", link: "/work" },
    { name: "Services", link: "/services" },
    { name: "Clients", link: "/clients" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];
  return (
    <div>
      <footer className="footer">
        <img src={Helix} alt="" className="img-fluid ft-helix" />
        <div className="container">
          <div className="ft-top">
            <div className="row">
              <div className="col-lg-8 col-md-6">
                <h3 className="let-title">{data?.title || "Let’s Talk"}</h3>
                <a className="mail-a view-btn" href={`mailto:${email}`}>
                  <span>{email}</span>
                </a>
              </div>
              <div className="col-lg-4 col-md-6">
                <ul className="quick-ul list-unstyled">
                  {pages.map((page, index) => (
                    <li key={index}>
                      <Link className="view-btn" to={page.link}>
                        <span>{page.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="ft-middle">
            <div className="row">
              <div className="col-lg-6 col-md-6 my-auto">
                <p className="location-p">{data?.address}</p>
              </div>
              <div className="col-lg-6 col-md-6 text-lg-end text-md-end">
                <ul className="social-ul list-instyled list-inline">
                  {data?.socialLinks?.map((item, index) => (
                    <li key={index} className="list-inline-item">
                      <a
                        href={item?.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className={`bi bi-${item?.name?.toLowerCase()}`}></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="ft-bottom">
            <div className="row">
              <div className="col-lg-6 col-md-6 my-auto">
                <p className="copy-p">@2025 All Rights Reserved Byo</p>
              </div>
              <div className="col-lg-6 col-md-6 text-lg-end text-md-end">
                <ul className="ft-link-ul list-instyled list-inline">
                  <li className="list-inline-item">
                    <a className="view-btn" href="/privacy">
                      <span>Privacy</span>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="view-btn" href="/terms">
                      <span>Terms</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
