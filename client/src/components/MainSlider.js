import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

const MainSlider = () => {
  return (
    <div style={{display:'block'}}>
            <Carousel>
      <Carousel.Item interval={1000}>
      <div       
      style={{
        backgroundImage: "url(https://i.pinimg.com/originals/2a/3b/cb/2a3bcbcbe4e14c1cf24ef307c10c1fb9.gif)",
        height: '80vh', // You can adjust the height and other styles as needed
        backgroundSize: 'cover', // This ensures the image covers the whole div
        backgroundPosition: 'center' // This centers the image in the div
      }}></div>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
      <div       
      style={{
        backgroundImage: "url('https://plus.unsplash.com/premium_photo-1678371210527-7af8f4ae682c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29tcG9zdHxlbnwwfHwwfHx8MA%3D%3D')",
        height: '80vh', // You can adjust the height and other styles as needed
        backgroundSize: 'cover', // This ensures the image covers the whole div
        backgroundPosition: 'center' // This centers the image in the div
      }}></div>

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <div       
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1545333212-ffebc7933c12?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbXBvc3R8ZW58MHx8MHx8fDA%3D')",
        height: '80vh', // You can adjust the height and other styles as needed
        backgroundSize: 'cover', // This ensures the image covers the whole div
        backgroundPosition: 'center' // This centers the image in the div
      }}></div>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  )
}

export default MainSlider