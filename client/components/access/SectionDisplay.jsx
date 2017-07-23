import React from 'react';
import { Link } from 'react-router-dom';
/**
 * Section Display component that displays a carousel.
 * @returns {String} The HTML markup for the Section Display component
 */
const SectionDisplay = () => (
  <div className="section">
    <div className="carousel carousel-slider center" data-indicators="true">
      <div className="carousel-fixed-item">
        <span className="inner-slide">
          <img
            src="../../img/slide5.jpg"
            alt="slide1" className="slide-img" />
        </span>
        <div className="landing-content">
          <h2>DocNinja</h2>
          <Link to="/signup">Get Started</Link>
        </div>
      </div>
      <div className="carousel-item white-text" href="#one!">
        <img
          src="../../img/slide2.jpg"
          alt="slide" className="slide-img" />
      </div>
      <div className="carousel-item amber white-text" href="#two!">
        <img
          src="../../img/slide1.jpg"
          alt="slide3" className="slide-img" />
      </div>
      <div className="carousel-item green white-text" href="#three!">
        <img
          src="../../img/slide4.jpg"
          alt="slide4" className="slide-img" />
      </div>
      <div className="carousel-item blue white-text" href="#four!">
        <img
          src="../../img/slide3.jpg"
          alt="slide3" className="slide-img" />
      </div>
    </div>
  </div>
);

export default SectionDisplay;
