import React from "react";
import { Carousel } from "react-bootstrap";

import carousel1 from "assets/images/carousel1.webp";
import carousel2 from "assets/images/carousel2.webp";
import carousel3 from "assets/images/carousel3.webp";

import "../Pages.scss";
import "./About.scss";

function About() {
  return (
    <div id="about" className="pageContainer">
      <div className="pageContainer_contents about">
        <Carousel>
          <Carousel.Item>
            <img className="d-block " src={carousel1} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block " src={carousel2} alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block " src={carousel3} alt="Third slide" />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default About;
