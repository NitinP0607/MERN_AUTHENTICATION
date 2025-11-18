import React from 'react'
import "./Contact.css"

const Contact = () => {
  return (
    <div className="contact-wrapper">
      <div className="header">
        <h1>Contact Us</h1>
        <p>
          Welcome to <strong>N-Technologies</strong>.  
          We provide innovative web solutions to help businesses grow.  
          Whether you have a question, need support, or want to discuss a project,  
          we’re here to listen.
        </p>
      </div>
      <div className="contact-header">
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you. Reach out to us with your queries or feedback.<br/>
        We're here to help you succeed, Your idea our tehnology will enhance your business</p>
      </div>
      <div className="quotes">
            <blockquote>
              “The best way to predict the future is to create it.” <br />– Peter Drucker
            </blockquote>
            <blockquote>
              “Success is not in what you have, but who you are.” <br />– Bo Bennett
            </blockquote>
            <blockquote>
              “Technology like art is a soaring exercise of the human imagination.” <br />– Daniel Bell
            </blockquote>
          </div>
      <div className="contact-main">
        <div className="contact-info">
          <h2>N-Technologies</h2>
          <p><strong>Address:</strong> 123 Near Primary School kachatipur, kannauj, Uttar Pradesh, India</p>
          <p><strong>Email:</strong> contact@n-technologies.in</p>
          <p><strong>Phone:</strong> +91-9026532143</p>
          <p><strong>Office Hours:</strong> Mon - Sat, 10:00 AM - 6:00 PM</p>
        </div>

        <div className="contact-map">
          <iframe
            title="N-Technologies Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.761089265838!2d79.68270817576511!3d26.942787458796918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399e0d6ad42bea1b%3A0xf30dda011fb5403e!2sN-technologies!5e0!3m2!1sen!2sin!4v1753317388138!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default Contact
