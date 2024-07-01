import React from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <p>&copy;<i> QuickSheets.com</i></p>
        <div className="socialMedia">
          <a href="https://www.instagram.com"><InstagramIcon /></a>
          <a href="https://www.example.com"><XIcon /></a>
          <a href="https://www.linkedin.com"><LinkedInIcon /></a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
