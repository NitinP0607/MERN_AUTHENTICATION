import React from "react";
import { useState } from "react";
import "./Services.css";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

const Services = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Example: you can connect this to your backend later
      console.log("Form Data Submitted:", formData);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
      alert("Your request has been submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="services-main">
      {/* FULL SCREEN LOADER */}
      {loading && (
        <div className="overlay">
          <div className="loader"></div>
        </div>
      )}
      <h1>Our Top Web Services</h1>
      <div className="services-section">
        <div className="service">
          <img src={assets.frontend_image} alt="frontend_deelopment" />
          <span className="frontend-service">Frontend Development</span>
          <p>
            We are top frontend team who helps to build your ideas in practical
            way
          </p>
          <Link to={"/services/frontend-read-more"}>Read More</Link>
        </div>
        <div className="service">
          <img src={assets.backend_image} alt="backend_development" />
          <span className="frontend-service">Backend Development</span>
          <p>
            We have the team who have skills and experience in Backend
            developers.
          </p>
          <Link to={"/services/backend-read-more"}>Read More</Link>
        </div>
        <div className="service">
          <img src={assets.appdevelopment_image} alt="frontend_deelopment" />
          <span className="frontend-service">App Development</span>
          <p>Teams who are expert in App Development</p>
          <Link to={"/services/appdevelopment-read-more"}>Read More</Link>
        </div>
        <div className="service">
          <img src={assets.digitalmarketing_image} alt="frontend_deelopment" />
          <span className="frontend-service">Digital Marketing</span>
          <p>Digital Marketing Team helps you to grow your business</p>
          <Link to={"/services/digital-marketing-read-more"}>Read More</Link>
        </div>
        <div className="service">
          <img src={assets.uiux_image} alt="frontend_deelopment" />
          <span className="frontend-service">UI/UX Design</span>
          <p>
            UX/UI Design are according to your needs and provide better
            expereince
          </p>
          <Link to={"/services/ui-ux-read-more"}>Read More</Link>
        </div>
        <div className="service">
          <img src={assets.softwaredevelopement_image} alt="frontend_deelopment" />
          <span className="frontend-service">Software Development</span>
          <p>Helps you to build your software, which have your ideas</p>
          <Link to={"/services/software-read-more"}>Read More</Link>
        </div>
      </div>
      <hr />
      <div className="form-container">
        <h2>Request a Service</h2>
        <form className="service-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">Select a Service</option>
            <option value="Frontend Development">Frontend Development</option>
            <option value="Backend Development">Backend Development</option>
            <option value="App Development">App Development</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Software Development">Software Development</option>
          </select>
          <textarea
            name="message"
            placeholder="Tell us about your project..."
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Services;
