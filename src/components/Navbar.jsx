import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/img/logo.svg";
import SocialLinks from "./SocialLinks";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAboutTop, setIsAboutTop] = useState(false);
  const navRefs = useRef([]);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
      setIsAboutTop(location.pathname === "/about" && scrollY < 200);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const toggleNavbar = () => setIsNavOpen(!isNavOpen);

  const isActive = (path) => location.pathname === path;

  const handleMouseEnter = (index, e) => {
    const link = navRefs.current[index];
    const rect = link.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const midpoint = rect.width / 2;

    if (mouseX < midpoint) {
      link.classList.add("hover-left");
      link.classList.remove("hover-right");
    } else {
      link.classList.add("hover-right");
      link.classList.remove("hover-left");
    }
  };

  const handleMouseLeave = (index) => {
    const link = navRefs.current[index];
    link.classList.remove("hover-left", "hover-right");
  };

  const navLinks = ["Work", "Clients", "Services", "About", "Contact"];

  return (
    <>
      <nav
        className={`navbar fixed-top navbar-light ${
          isScrolled ? "scrolled" : ""
        } ${isAboutTop ? "white-links" : ""}`}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <a className="navbar-brand" href="/">
            <img src={logo} className="img-fluid h-logo" alt="logo" />
          </a>

          {/* Toggler for mobile */}
          <button className="custom-toggler" onClick={toggleNavbar}>
            <div className={`bar bar1 ${isNavOpen ? "open" : ""}`}></div>
            <div className={`bar bar2 ${isNavOpen ? "open" : ""}`}></div>
          </button>

          {/* Desktop Menu */}
          <div className="desktop-menu d-none d-lg-block ms-auto">
            <ul className="navbar-nav d-flex flex-row align-items-center">
              {navLinks.map((label, index) => {
                const path = `/${label.toLowerCase()}`;
                return (
                  <li className="nav-item mx-3" key={index}>
                    <Link
                      to={path}
                      className={`nav-link ${isActive(path) ? "active" : ""}`}
                      ref={(el) => (navRefs.current[index] = el)}
                      onMouseEnter={(e) => handleMouseEnter(index, e)}
                      onMouseLeave={() => handleMouseLeave(index)}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isNavOpen ? "open" : ""}`}>
        <ul className="mobile-nav-list">
          {navLinks.map((label, index) => {
            const path = `/${label.toLowerCase()}`;
            return (
              <li key={index} className="mobile-nav-item">
                <Link
                  to={path}
                  className={`mobile-nav-link ${
                    isActive(path) ? "active" : ""
                  }`}
                  onClick={() => setIsNavOpen(false)}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mob-email">
          <ul className="list-inline cont-ul">
            <li className="list-inline-item">
              <p>Get in touch</p>
              <a href="mailto:hey@byo.sa" className="view-btn">
                <span>hey@byo.sa</span>
              </a>
            </li>
          </ul>
        </div>
        <SocialLinks  classNames="nav-social"/>
      </div>
    </>
  );
};

export default Navbar;
