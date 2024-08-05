import React from 'react';
import './About.css';
import AboutBG from '../../assets/printer-bg1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function About() {
  return (
    <div className="about">
      <div className="abouthead">
        <h2>ABOUT US</h2>
      </div>
      <div
        className="aboutTop"
        style={{ backgroundImage: `url(${AboutBG})` }}
      ></div>
      <div className="aboutBottom">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab,
          obcaecati! Voluptates vitae consectetur, laborum neque repellendus
          adipisci quae saepe vero incidunt expedita! Expedita minima eveniet
          consequuntur laboriosam in iste sapiente.
        </p>
        <div className="policies">
          <span>
            <FontAwesomeIcon icon={faArrowRight} />
            <a
              id="linkanimation"
              href="https://merchant.razorpay.com/policy/OdiFBga4sh8941/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
          </span>
          <span>
            <FontAwesomeIcon icon={faArrowRight} />
            <a
              id="linkanimation"
              href="https://merchant.razorpay.com/policy/OdiFBga4sh8941/refund"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cancellation and Refund Policy
            </a>
          </span>
          <span>
            <FontAwesomeIcon icon={faArrowRight} />
            <a
              id="linkanimation"
              href="https://merchant.razorpay.com/policy/OdiFBga4sh8941/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms And Conditions
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default About;
