import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
import logo from './image/logo.png';
import payment from './image/payment-item.png'
import '../../css/footer.css'
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <>
<footer className="footer spad" style={{backgroundColor:'#f3f6fa'}}>
  <div className="container" style={{backgroundColor:'#f3f6fa'}}>
    <div className="row">
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="footer__about">
          <div className="footer__about__logo">
            <a href="./index.html"><img src={logo}/></a>
          </div>
          <ul>
            <li>Address: Chak 6.s.t.b. , Teh. Sri vijaynagar,distt. Anupgarh, state Rajasthan</li>
            <li>Phone: +91 83026 57922</li>
            <li>Email: samarthyanaturals@mail.com</li>
          </ul>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
        <div className="footer__widget">
          <h6>Useful Links</h6>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">About Our Shop</a></li>
            <li><a href="#">Secure Shopping</a></li>
            <li><a href="/terms">Terms and Conditions</a></li>
            <li><a href="/policy">Privacy Policy</a></li>
            <li><a href="/refund">Refund Policy</a></li>
          </ul>
          <ul>
            <li><a href="#">Who We Are</a></li>
            <li><a href="#">Our Services</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Innovation</a></li>
            <li><a href="#">Testimonials</a></li>
          </ul>
        </div>
      </div>
      <div className="col-lg-4 col-md-12">
        <div className="footer__widget">
          <h6>Join Our Newsletter Now</h6>
          <p>Get E-mail updates about our latest shop and special offers.</p>
          <form action="#">
            <input type="text" placeholder="Enter your mail" />
            <button type="submit" className="site-btn">Subscribe</button>
          </form>
          <div className="footer__widget__social">
            <a href="#"><FaFacebook/></a>
            <a href="#"><FaInstagram/></a>
            <a href="#"><FaXTwitter/></a>
            <a href="#"><FaPinterest/></a>
          </div>
        </div>
      </div>
    </div>

  </div>
  <div className="row">
      <div className="col-lg-12">
        <div className="footer__copyright">
          <div className="footer__copyright__text"><p>{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              Copyright ©2024 All rights reserved | Made with <FaHeart color={'red'}/> by <a href='https://aiwithvanshika.tech/' target='newpage'
              style={{textDecoration:'underline'}}
              >AIwithVanshika</a>
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}</p></div>
          <div className="footer__copyright__payment"><img src={payment}/></div>
        </div>
      </div>
    </div>
</footer>

    </>
  )
}

export default Footer