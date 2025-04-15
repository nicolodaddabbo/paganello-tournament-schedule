import React, { useState } from "react";
import Image from "next/image";
import logo from "../pages/assets/Paganello_Logo_White.svg";
import Link from "next/link";

const Navbar = ({ title, buttonText, buttonHref }) => {
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
          <h1 className="navbar-title">{title}</h1>
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
          <Link className="pool-button" href={buttonHref}>
            {buttonText}
          </Link>
          <Link className="pool-button" href="/sotg">
            SOTG
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
