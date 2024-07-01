import React from 'react';
import './Topbar.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CallIcon from '@mui/icons-material/Call';

function Topbar() {
  return (
    <section id="topbar" className="topbar">
      <div className="topbar-content">
        <div className="contactbar">
          <div className="maillink"><MailOutlineIcon/>
            <a href="mailto:info@quicksheets.com">info@quicksheets.com</a>
          </div>
          <div className="PhoneNumber"><CallIcon/>
            <span>+91 1234567890 (9:00AM to 5:00PM)</span>
          </div>
        </div>
        <div className="socialMedia1">          
          <a href="https://www.instagram.com/quicksheets" className="instagram">
            <InstagramIcon/>
          </a>
          <a href="https://x.com/quicksheets" className="x">
            <XIcon/>
          </a>
          <a href="https://www.linkedin.com/company/quicksheets" className="linkedin">
            <LinkedInIcon/>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Topbar;
