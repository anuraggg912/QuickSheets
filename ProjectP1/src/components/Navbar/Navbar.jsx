import React, { useState, useEffect } from 'react';
import './Navbar.css';
import QSlogo from '../../assets/QSlogo.png';
import ReorderIcon from '@mui/icons-material/Reorder';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setOpenLinks(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <nav className="navbar-content">
          <div className="logo">
            <Link to="/">
              <img src={QSlogo} alt="Quicksheets" />
            </Link>
          </div>
          <div className={`nav-links ${isMobile ? 'hidden' : ''}`}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <button onClick={toggleNavbar} className="menu-button">
            {openLinks ? <CloseIcon /> : <ReorderIcon />}
          </button>
        </nav>
        <div className={`dropdown-menu ${openLinks ? 'open' : ''}`}>
          <Link to="/" onClick={toggleNavbar}>Home</Link>
          <Link to="/about" onClick={toggleNavbar}>About</Link>
          <Link to="/pricing" onClick={toggleNavbar}>Pricing</Link>
          <Link to="/contact" onClick={toggleNavbar}>Contact</Link>
        </div>
      </header>
      <div className="navbar-space" />
    </>
  );
}

export default Navbar;
