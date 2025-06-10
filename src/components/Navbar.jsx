import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/img/logo.svg";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100); // Change scroll trigger to 100px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top navbar-light bg-light ${
        isScrolled ? "scrolled" : ""
      }`}
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
            {["Work", "Client", "Services", "About", "Contact"].map(
              (label, index) => (
                <li className="nav-item" key={index}>
                  <a
                    href={`#${label.toLowerCase()}`}
                    className="nav-link"
                    ref={(el) => (navRefs.current[index] = el)}
                    onMouseEnter={(e) => handleMouseEnter(index, e)}
                    onMouseLeave={() => handleMouseLeave(index)}
                  >
                    {label}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
