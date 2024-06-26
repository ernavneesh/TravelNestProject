import React from 'react';
import './AboutUs.css'; 
import welcomeImage from '../../assets/aboutUs/welcome.png'; 
import mounicaImage from '../../assets/aboutUs/mounica.jpeg';
import navneeshImage from '../../assets/aboutUs/Navneesh.jpeg';
import maheshImage from '../../assets/aboutUs/Mahesh.jpeg';
import lakhvirImage from '../../assets/aboutUs/Lakhvir.jpeg';

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="welcome-box">
        <div className="welcome-image">
          <img src={welcomeImage} alt="Welcome" />
        </div>
        <div className="welcome-content">
          <h1>A Decade of Excellence: Travel Nest’s Journey of Passion and Innovation</h1>
          <p>It has been more than a decade since team decided to establish Travel Nest Travel in 2023, entering the tourism industry with an overnight cruise on Toronto. All team at that time was a youth, agility, and a strong love for traveling. Travel Nest stands for “dream of journey””, expressing his desire to introduce the quintessence of the country to friends all over the world. The early days were fraught with difficulties, and just a few FIT bookings came from walk-in customers. After determining to pursue the mission of providing customers with authentic holidays, Quan and his associates have spent a lot of time creating specialized products and building a seamless customer experience. Working professionally, keeping prestige, and prioritizing customers are three principles in all activities at Travel Nest.</p>
          <p>After the first year, Travel Nest welcomed nearly 7,000 guests with 98% excellent feedback. That success has motivated Travel Nest to invest more in the tourism field. Travel Nest has launched the Oasis overnight cruise brand, managed two hotels on Cat Ba Island, operated an eco-tourism complex on Freedom Island, and established a tour operator providing private packages in Vietnam and Southeast Asia.</p>
        </div>
      </div>
      <br />
      <div className="team-box">
        <h2>Meet Our Team</h2>
        <br />
        <div className="team-container">
          <div className="team-member">
            <div className="image">
              <img src={mounicaImage} alt="Mounica" />
            </div>
            <div className="content">
              <h3>Mounica</h3>
              <p>Front-End and Python Developer</p>
            </div>
          </div>
          <div className="team-member">
            <div className="image">
              <img src={navneeshImage} alt="Navneesh" />
            </div>
            <div className="content">
              <p>Navneesh Kaur</p>
              <h3>Back-End Developer</h3>
            </div>
          </div>
          <div className="team-member">
            <div className="image">
              <img src={maheshImage} alt="Mahesh" />
            </div>
            <div className="content">
              <p>Mahesh</p>
              <h3>Front-End Developer</h3>
            </div>
          </div>
          <div className="team-member">
            <div className="image">
              <img src={lakhvirImage} alt="Lakhvir" />
            </div>
            <div className="content">
              <p>Lakhvir Kaur</p>
              <h3>Front-End Developer</h3>
            </div>
          </div>
        </div>
      </div>
      <br/>
    </section>
  );
};

export default AboutUs;
