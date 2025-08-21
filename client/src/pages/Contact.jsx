import React, { useState } from "react";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import "../styles/contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <Layout>
      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <h1 className="page-title">Contact Us</h1>
        </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">Get in Touch</h2>
          <p className="hero-subtitle">
            Have questions about our timepieces? Need assistance with your order? 
            We're here to help you find the perfect watch and provide exceptional service.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h3>Send us a Message</h3>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="product">Product Information</option>
                    <option value="order">Order Status</option>
                    <option value="support">Technical Support</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              <h3>Contact Information</h3>
              
              <div className="info-card">
                <div className="info-icon">📍</div>
                <div className="info-content">
                  <h4>Visit Our Showroom</h4>
                  <p>123 Luxury Avenue<br />Fashion District<br />New York, NY 10001</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">📞</div>
                <div className="info-content">
                  <h4>Call Us</h4>
                  <p>+1 (555) 123-4567<br />Mon-Fri: 9AM-6PM EST</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">✉️</div>
                <div className="info-content">
                  <h4>Email Us</h4>
                  <p>hello@Walnut.com<br />support@Walnut.com</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">💬</div>
                <div className="info-content">
                  <h4>Live Chat</h4>
                  <p>Available 24/7<br />Get instant support</p>
                </div>
              </div>

              <div className="social-links">
                <h4>Follow Us</h4>
                <div className="social-icons">
                  <button className="social-btn">📘</button>
                  <button className="social-btn">📷</button>
                  <button className="social-btn">🐦</button>
                  <button className="social-btn">💼</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h3 className="section-title">Frequently Asked Questions</h3>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>What is your return policy?</h4>
              <p>
                We offer a 30-day return policy for all watches in their original condition. 
                Custom or engraved pieces are non-returnable.
              </p>
            </div>
            <div className="faq-item">
              <h4>Do you offer international shipping?</h4>
              <p>
                Yes, we ship worldwide with tracking and insurance. Delivery times vary by location, 
                typically 3-7 business days.
              </p>
            </div>
            <div className="faq-item">
              <h4>What warranty do you provide?</h4>
              <p>
                All our watches come with a 2-year manufacturer warranty covering mechanical 
                defects and workmanship issues.
              </p>
            </div>
            <div className="faq-item">
              <h4>Can I customize my watch?</h4>
              <p>
                Yes, we offer customization options including engraving, strap changes, 
                and limited edition modifications.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </Layout>
  );
};

export default Contact;
