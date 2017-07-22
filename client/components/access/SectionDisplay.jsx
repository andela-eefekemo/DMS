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
            src="../../img/slide 3.jpg"
            alt="smallslide2" className="slide-img" />
        </span>
        <div className="landing-content">
          <h2>First Panel</h2>
          <Link to="/signup">Get Started</Link>
        </div>
      </div>
      <div className="carousel-item white-text" href="#one!">
        <img
          src="../../img/smallslide2.jpg"
          alt="smallslide2" className="slide-img" />
      </div>
      <div className="carousel-item amber white-text" href="#two!">
        <img
          src="../../img/smallslide2.jpg"
          alt="smallslide2" className="slide-img" />
      </div>
      <div className="carousel-item green white-text" href="#three!">
        <img
          src="../../img/smallslide2.jpg"
          alt="smallslide2" className="slide-img" />
      </div>
      <div className="carousel-item blue white-text" href="#four!">
        <img
          src="../../img/smallslide2.jpg"
          alt="smallslide2" className="slide-img" />
      </div>
    </div>
  </div>
);

export default SectionDisplay;
