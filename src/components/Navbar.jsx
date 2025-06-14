import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/img/logo.svg";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAboutTop, setIsAboutTop] = useState(false);
  const navRefs = useRef([]);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Normal scroll for background or effects
      setIsScrolled(scrollY > 100);

      // Special white link logic on about page
      if (location.pathname === "/about") {
        setIsAboutTop(scrollY < 200);
      } else {
        setIsAboutTop(false);
      }
    };

    handleScroll(); // Trigger on first load
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const toggleNavbar = () => setIsNavOpen(!isNavOpen);

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

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top navbar-light bg-light ${
        isScrolled ? "scrolled" : ""
      } ${isAboutTop ? "white-links" : ""}`}
    >
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src={logo} className="img-fluid h-logo" alt="logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            {["Work", "Clients", "Services", "About", "Contact"].map(
              (label, index) => {
                const path =
                  label === "Work"
                    ? "/work"
                    : label === "Clients"
                    ? "/clients"
                    : label === "Services"
                    ? "/services"
                    : label === "About"
                    ? "/about"
                    : "/contact";
                return (
                  <li className="nav-item" key={index}>
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
              }
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
