import React from 'react'
import './Hero.css'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='hero container'>
      <div className='hero-text'>
        <h1>Get Your Stationery Delivered for Free!</h1>
        <p>Enjoy the convenience of free delivery on your stationery needs. From black & white, colored documents to practical files and spiral-bound reports, we've got you covered. Order now and streamline your work with our fast and reliable service!</p>
        <Link to="/order">
          <button className="btn">ORDER NOW</button>
        </Link>
        <h2>Save time by sending orders online from anywhere
        </h2>
      </div>
    </div>
  )
}

export default Hero