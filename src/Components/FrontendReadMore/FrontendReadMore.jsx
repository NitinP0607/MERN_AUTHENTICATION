import React from "react";
import "./FrontendReadMore.css";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const FrontendReadMore = () => {
    const navigate = useNavigate();

    return (
        <section className="frontend-readmore">
            <div className="frontend-container">
                <div className="frontend-text">
                    <h2>Frontend Development</h2>
                    <p>
                        At <strong>N-Technologies</strong>, we craft modern, interactive, and
                        responsive web interfaces that leave a lasting impression. Our team
                        uses the latest technologies like <strong>React.js, HTML5, CSS3, and
                            JavaScript</strong> to build websites that are not only beautiful but
                        also optimized for performance and accessibility.
                    </p>

                    <p>
                        From concept to deployment, we ensure that every element—from smooth
                        animations to pixel-perfect layouts—enhances user experience. Whether
                        you need a portfolio website, an e-commerce platform, or a business
                        landing page, our frontend experts deliver clean, scalable, and
                        maintainable code.
                    </p>

                    <ul>
                        <li>Responsive and Mobile-friendly Design</li>
                        <li>Pixel-perfect UI/UX Implementation</li>
                        <li>Performance Optimization</li>
                        <li>Cross-browser Compatibility</li>
                        <li>Integration with REST APIs</li>
                    </ul>
                    <button
                        className="contact-btn"
                        onClick={() => navigate("/contact")}
                    >
                        Contact Now
                    </button>
                </div>

                <div className="frontend-image">
                    <img src={assets.frontend_image} alt="Frontend Development" />
                </div>
            </div>
        </section>
    );
};

export default FrontendReadMore;
