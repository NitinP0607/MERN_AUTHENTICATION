import React from "react";
import "./AppDev.css";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const AppDevreadMore = () => {
  const navigate = useNavigate();

  return (
    <section className="appdev-readmore">
      <div className="appdev-container">
        <div className="appdev-text">
          <h2>App Development</h2>
          <p>
            At <strong>N-Technologies</strong>, we create innovative, fast, and user-friendly
            mobile applications that bring your business ideas to life. Our expert team
            develops apps using technologies like <strong>React Native, Flutter, and Android/iOS
            frameworks</strong> to ensure seamless performance across all devices.
          </p>

          <p>
            From concept to launch, we focus on crafting apps that provide excellent
            user experience, robust functionality, and top-notch security. Whether it’s
            an e-commerce app, booking platform, or business automation tool, we build
            scalable and engaging mobile applications tailored to your goals.
          </p>

          <ul>
            <li>Cross-platform App Development (iOS & Android)</li>
            <li>Native & Hybrid App Solutions</li>
            <li>API Integration & Cloud Connectivity</li>
            <li>Performance Optimization & Testing</li>
            <li>UI/UX-Focused Mobile Design</li>
            <li>App Store Deployment & Maintenance</li>
          </ul>

          <button className="contact-btn" onClick={() => navigate("/contact")}>
            Contact Now
          </button>
        </div>

        <div className="appdev-image">
          <img src={assets.appdevelopment_image} alt="App Development" />
        </div>
      </div>
    </section>
  );
};

export default AppDevreadMore;
