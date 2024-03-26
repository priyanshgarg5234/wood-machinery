import React from 'react'
import './Footer.css'
import logo from "../../assets/logo.svg"
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer'>
      <div className='footer-logo'>
        <img src={logo} alt='' />
        <p>Craftwood Machinery</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li ><NavLink to="/contact">Contact Us</NavLink></li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icon-instagram">
          <a href="https://www.instagram.com/" target='_blank'><FaInstagram className='style-icon' size={25} /></a>
        </div>
        <div className="footer-icon-facebook">
          <a href="https://www.facebook.com/" target='_blank'><FaFacebook className='style-icon' size={25} /></a>
        </div>
        <div className="footer-icon-whatsapp">
          <a href="https://www.whatsapp.com/" target='_blank'><FaWhatsapp className='style-icon' size={25} /></a>
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p style={{ color: "red", fontSize: "1rem" }}>copyright</p>
      </div>

    </div>
  )
}

export default Footer