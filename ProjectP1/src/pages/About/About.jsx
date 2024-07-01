import React from 'react'
import './About.css'
import AboutBG from '../../assets/printer-bg1.jpg'

function About() {
  return (
    <div className="about">
      <div className="abouthead"><h2>ABOUT US</h2>
      </div>
      <div className="aboutTop"
        style={{ backgroundImage: `url(${AboutBG})` }}
      ></div>
      <div className="aboutBottom">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, obcaecati! Voluptates vitae consectetur, laborum neque repellendus adipisci quae saepe vero incidunt expedita! Expedita minima eveniet consequuntur laboriosam in iste sapiente.</p>
      </div>

    </div>
  )
}

export default About