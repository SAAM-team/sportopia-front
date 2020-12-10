import React, { useState } from 'react'
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import slide1 from './banner.png';


export default function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel style={{ marginBottom: '40px', marginTop: '-68px',boxShadow: '0 0 10px 0px rgba(0, 0, 0, 0.25)'}} activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          style={{ height: '400px' }}
          className="d-block w-100"
          src={slide1}
          alt="First slide"
        />
        {/* <Carousel.Caption
          style={{ backgroundColor: '#6BAB90', borderRadius:'10px', boxShadow: '0 0 10px 0px rgba(0, 0, 0, 0.25)' }}
        >
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: '400px' }}
          className="d-block w-100"
          src='https://static.garmincdn.com/en_US/store/sports_rec/category/hero-segment-sports-and-fitness.jpg'
          alt="Second slide"
        />

        {/* <Carousel.Caption
        style={{ backgroundColor: '#6BAB90', borderRadius:'10px', boxShadow: '0 0 10px 0px rgba(0, 0, 0, 0.25)' }}
        >
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: '400px' }}
          className="d-block w-100"
          src='https://www.nsfsport.com/images/cfs-mark_containers_weights_54966172_xl_cfs_marks,w_1366.jpg'
          alt="Third slide"
        />

        {/* <Carousel.Caption
        style={{ backgroundColor: '#6BAB90', borderRadius:'10px', boxShadow: '0 0 10px 0px rgba(0, 0, 0, 0.25)' }}
        >
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  );
}

  // render(<ControlledCarousel />);