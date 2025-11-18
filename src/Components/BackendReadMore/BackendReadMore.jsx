import React from "react";
import "./BackendReadMore.css";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const BackendReadMore = () => {
  const navigate = useNavigate();

  return (
    <section className="backend-readmore">
      <div className="backend-container">
        <div className="backend-text">
          <h2>Backend Development</h2>
          <p>
            At <strong>N-Technologies</strong>, we specialize in creating
            powerful, secure, and scalable backend systems that form the
            foundation of your web applications. Our developers use technologies
            like <strong>Node.js, Express.js, MongoDB, and MySQL</strong> to
            build reliable server-side architectures.
          </p>

          <p>
            We ensure seamless data flow between the frontend and backend,
            providing APIs and databases that are optimized for performance and
            security. Whether it’s a content management system, an e-commerce
            backend, or a business automation platform, our backend experts
            deliver solutions that scale with your business.
          </p>

          <ul>
             <li>Using latest Technology for your server</li>
            <li>RESTful API & Microservice Development</li>
            <li>Database Design & Optimization</li>
            <li>Authentication and Authorization Systems</li>
            <li>Cloud Integration & Deployment</li>
            <li>High Performance & Security Standards</li>
          </ul>

          <button
            className="contact-btn"
            onClick={() => navigate("/contact")}
          >
            Contact Now
          </button>
        </div>

        <div className="backend-image">
          <img src={assets.backend_image} alt="Backend Development" />
        </div>
      </div>
    </section>
  );
};

export default BackendReadMore;
