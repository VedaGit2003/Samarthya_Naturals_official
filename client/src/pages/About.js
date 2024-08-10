import React from 'react'
import Lay from '../components/Layout/Lay'
import { Link } from 'react-router-dom'
import "../css/about.css"
const About = () => {
  return (
    <Lay title={"about - SipShop"}>
 <section className="about-section">
  <div className="container">
    <div className="row">                
      <div className="content-column col-lg-6 col-md-12 col-sm-12 order-2">
        <div className="inner-column">
          <div className="sec-title">
            <span className="title">About Css3transition</span>
            <h2>We are Creative Tech Enthusiast working since 2015</h2>
          </div>
          <div className="text">I am Rahul Yaduvanshi works at Css3 Transition since last 3 years. We are here to provide touch notch solution for your website or web application that helps you to make your website look attractive &amp; efficient in handling by creating usefull plugins thats you need.</div>
          <div className="text">
            We are here to serve you next level tutorial that currently in trend to match you with your expertise. Css3 transition is a learning website. where you can find many good quality content related to web development and tutorials about plugins. here we are using html, html5, css, css3, jquery &amp; javascript along with inspirational UI design layout by professionals by using Photoshop and adobe allustrator.
          </div>
          <div className="btn-box">
            <Link to="/contact" className="theme-btn btn-style-one">Contact Us</Link>
          </div>
        </div>
      </div>
      <div className="image-column col-lg-6 col-md-12 col-sm-12">
        <div className="inner-column wow fadeInLeft">
          <div className="author-desc">
            <h2>Veda Paul Chowdhury</h2>
            <span>Web Developer</span>
          </div>
          <figure className="image-1"><a href="#" className="lightbox-image" data-fancybox="images"><img title="Rahul Kumar Yadav" src="https://i.ibb.co/QP6Nmpf/image-1-about.jpg" alt /></a></figure>
        </div>
      </div>
    </div>
    <div className="sec-title">
      <span className="title">Our Future Goal</span>
      <h2>We want to lead in innovation &amp; Technology</h2>
    </div>
    <div className="text">
      We works on UI/UX and functionality as well so that a plugins comes with proper stucture &amp; stunning looks which suits to your web app &amp; website.
    </div>
    <div className="text">
      We take a small toolkit here and ride it well so that it is fit for your use. One who performs well and looks even better.
    </div>
    <div className="text">                
      Here we are trying to give you all kinds of technical content, whether it is related to designing or functionality. We are creating content on a lot of languages and will continue to make it free of cost even if you use it without any problem. Which is a very important thing.
    </div>
    <div className="text">
      Here you can also share the content you create, if our technical team likes it, then we will also share it on our blog.
    </div>
    <div className="text">
      In the end, I would say keep visiting our website and enjoy the quality content.
    </div>
  </div>
</section>

    </Lay>
  )
}

export default About