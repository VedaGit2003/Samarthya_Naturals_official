import React from 'react'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import {Helmet} from "react-helmet"
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import './Lay.css'

const Lay = ({children,title,description,keywords,author}) => {
  return (
    <div>
      <Helmet>
      <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
        <Header/>
        <main style={{minHeight:"100vh",marginTop:"2%", marginRight:"0%"}}>
          <Toaster/>
            {children}
            <Link target="_blank" to="https://api.whatsapp.com/send?phone=+918302657922&text='Hi'" class="whatsapp-button"><i class="fab fa-whatsapp"></i></Link>
        </main>
        <Footer/>
    </div>
  )
}
Lay.defaultProps = {
  title: "SipShop - shop now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Techinfoyt",
};

export default Lay