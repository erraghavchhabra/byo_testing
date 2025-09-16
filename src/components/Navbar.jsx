import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/img/logo.svg";
import SocialLinks from "./SocialLinks";
import sanityClient from "../server/sanityClient";
import { contactQuery } from "../server/querys";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [data, setData] = useState(null);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const location = useLocation();

  const navLinks = ["Work","NewWork", "Clients", "Services", "About", "Contact"];
  const isAboutPage = location.pathname === "/about"; // ✅ detect about page

  useEffect(() => {
    const fetchData = async () => {
      const res = await sanityClient.fetch(contactQuery);
      setData(res);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (!isNavOpen) {
        // ✅ applies to ALL pages: switch to scrolled only after scroll
        setIsScrolled(currentScroll > 50);

        // ✅ show/hide navbar based on scroll direction
        if (currentScroll > lastScrollY.current && currentScroll > 10) {
          setHideNavbar(true);
        } else {
          setHideNavbar(false);
        }
      }

      lastScrollY.current = currentScroll <= 0 ? 0 : currentScroll;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(handleScroll);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isNavOpen, location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isNavOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isNavOpen]);

  const isActive = (path) => location.pathname === path;

  const navbarClass = `
    navbar m-nav fixed-top
    ${isScrolled ? "scrolled" : "at-top"}
    ${isAboutPage ? "about-page" : ""}
    ${hideNavbar ? "navbar-hidden" : "navbar-visible"}
    ${isNavOpen ? "menu-open" : ""}
  `;

  return (
    <>
      <nav className={navbarClass}>
        <div className="container d-flex justify-content-between align-items-center">
          <Link className="navbar-brand" to="/">
            <img src={logo} className="img-fluid h-logo" alt="logo" />
          </Link>

          {/* Desktop Menu */}
          <div className="desktop-menu d-none d-lg-block ms-auto">
            <ul className="navbar-nav d-flex flex-row align-items-center">
              {navLinks.map((label, index) => {
                const path = `/${label.toLowerCase()}`;
                return (
                  <li className="nav-item" key={index}>
                    <Link
                      to={path}
                      className={`nav-link ${isActive(path) ? "active" : ""}`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className={`custom-toggler ${isNavOpen ? "open" : ""}`}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <span className="bar bar1"></span>
            <span className="bar bar2"></span>
          </button>
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
          <p>Get in touch</p>
          <a href="mailto:hey@byo.sa" className="view-btn">
            <span>hey@byo.sa</span>
          </a>
        </div>

        <SocialLinks classNames="nav-social" />

        <a href="#" className="mob-add view-btn">
          <span>{data?.address || "Loading address..."}</span>
        </a>
      </div>
    </>
  );
};

export default Navbar;
