import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
        <ul className="menuItems">
          <li className="menuItem">Terms Of Use</li>
          <li className="menuItem">Privacy-Policy</li>
          <li className="menuItem">About</li>
          <li className="menuItem">Blog</li>
          <li className="menuItem">FAQ</li>
        </ul>
        <div className="infoText">
          Explore a curated collection of engaging movies and TV series. From
          captivating dramas to thrilling action films, our platform offers a
          diverse selection to suit every taste. Enjoy high-quality Bollywood
          and Hollywood content, including Hindi and Bengali movies, as well as
          exclusive web series. Stream and download your favorite titles in HD
          for an immersive viewing experience, all at no cost. Dive into the
          world of entertainment with Sayan_movie.
        </div>
        <div className="socialIcons">
          <span className="icon">
            <a
              href="https://www.facebook.com/profile.php?id=61555662217662"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
          </span>
          <span className="icon">
            <a
              href="https://www.instagram.com/joy_in_knowledge/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </span>
          <span className="icon">
            <FaTwitter />
          </span>
          <a
            href="https://www.linkedin.com/in/sayan-maity-756b8b244/"
            target="_blank"
            rel="noopener noreferrer">
            <span className="icon">
              <FaLinkedin />
            </span>
          </a>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
