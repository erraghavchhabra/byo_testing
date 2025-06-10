import React, { useEffect } from "react";
import Helix from "../assets/img/helix.png";
import { gsap } from "gsap";

const Footer = () => {
  useEffect(() => {
    gsap.to(".ft-helix", {
      scale: 1.2,
      repeat: -1, 
      yoyo: true,
      duration: 5,
      ease: "power1.inOut", 
    });
  }, []);

  return (
    <div>
      <footer className="footer">
        <img src={Helix} alt="" className="img-fluid ft-helix" />
        <div className="container">
          <div className="ft-top">
            <div className="row">
              <div className="col-lg-8 col-md-6">
                <h3 className="let-title">Let's Talk</h3>
                <a className="mail-a view-btn" href="mailto: hey@byo.sa">
                  <span>hey@byo.sa</span>
                </a>
              </div>
              <div className="col-lg-4 col-md-6">
                <ul className="quick-ul list-unstyled">
                  <li>
                    <a className="view-btn" href="#">
                      <span>Work</span>
                    </a>
                  </li>
                  <li>
                    <a className="view-btn" href="#">
                      <span>Services</span>
                    </a>
                  </li>
                  <li>
                    <a className="view-btn" href="#">
                      <span>Clients</span>
                    </a>
                  </li>
                  <li>
                    <a className="view-btn" href="#">
                      <span>About</span>
                    </a>
                  </li>
                  <li>
                    <a className="view-btn" href="#">
                      <span>Contact</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="ft-middle">
            <div className="row">
              <div className="col-lg-6 col-md-6 my-auto">
                <p className="location-p">Olaya St, Riyadh, Saudi Arabia</p>
              </div>
              <div className="col-lg-6 col-md-6 text-lg-end text-md-end">
                <ul className="social-ul list-instyled list-inline">
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="bi bi-behance"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="bi bi-instagram"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="bi bi-pinterest"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </li>
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
                    <a className="view-btn" href="#">
                      <span>Privacy</span>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="view-btn" href="#">
                      <span>Terms</span>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="view-btn" href="#">
                      <span>Sitemap</span>
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
