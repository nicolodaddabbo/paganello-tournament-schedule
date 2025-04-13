import React, { useState } from "react";
import Image from "next/image";
import logo from "../pages/assets/Paganello_Logo_White.svg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="https://www.paganello.com/" className="logo-link">
            <Image src={logo} alt="Paganello Logo" width={80} height={80} />
          </a>
          <h1 className="navbar-title">Schedule 2025</h1>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span
            className={`hamburger-line ${isMenuOpen ? "active" : ""}`}
          ></span>
          <span
            className={`hamburger-line ${isMenuOpen ? "active" : ""}`}
          ></span>
          <span
            className={`hamburger-line ${isMenuOpen ? "active" : ""}`}
          ></span>
        </div>

        <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <a
            className="pool-button"
            href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRCZOg_D2OD5cwGJ8or9BIPxseAy-1yycpcKu1rRb6YBLQbC65Jz6iK29_y_kz6rLNfLl7I282F4hv6/pubhtml"
          >
            Standings and Pools
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
