import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/projects.css";

const Projects = () => {
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      title: "Heritage Collection",
      description: "A tribute to classic watchmaking traditions, featuring hand-wound mechanical movements and timeless designs.",
      image: "🏛️",
      status: "Available",
      price: "₹25,000 - ₹75,000",
      features: ["Hand-wound movement", "Sapphire crystal", "Leather straps", "Limited edition"]
    },
    {
      id: 2,
      title: "Innovation Series",
      description: "Cutting-edge technology meets elegant design with smart features and premium materials.",
      image: "🚀",
      status: "Coming Soon",
      price: "₹35,000 - ₹95,000",
      features: ["Smart connectivity", "Titanium case", "Solar charging", "GPS tracking"]
    },
    {
      id: 3,
      title: "Artisan Limited",
      description: "Exclusive handcrafted pieces created by master watchmakers using traditional techniques.",
      image: "🎨",
      status: "Limited Stock",
      price: "₹50,000 - ₹150,000",
      features: ["Hand-engraved", "Precious metals", "Custom dials", "Numbered series"]
    },
    {
      id: 4,
      title: "Sport Elite",
      description: "High-performance timepieces designed for athletes and outdoor enthusiasts.",
      image: "🏃",
      status: "Available",
      price: "₹20,000 - ₹60,000",
      features: ["Water resistant", "Shock resistant", "Chronograph", "Luminous hands"]
    },
    {
      id: 5,
      title: "Luxury Signature",
      description: "Ultra-premium collection featuring rare materials and exceptional craftsmanship.",
      image: "💎",
      status: "By Appointment",
      price: "₹100,000+",
      features: ["Diamond accents", "Platinum cases", "Tourbillon movement", "Personal consultation"]
    },
    {
      id: 6,
      title: "Sustainable Future",
      description: "Eco-friendly timepieces made from recycled materials and sustainable practices.",
      image: "🌱",
      status: "Pre-order",
      price: "₹15,000 - ₹45,000",
      features: ["Recycled materials", "Solar powered", "Plant-based straps", "Carbon neutral"]
    }
  ];

  return (
    <Layout>
      <div className="projects-container">
        {/* Header */}
        <div className="projects-header">
          <h1 className="page-title">Our Projects</h1>
        </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">Exclusive Collections</h2>
          <p className="hero-subtitle">
            Discover our curated projects and limited editions, each representing 
            a unique vision in horological excellence and innovative design.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-content">
        <div className="container">
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <span className="project-icon">{project.image}</span>
                  <div className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
                    {project.status}
                  </div>
                </div>
                
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-price">
                    <span className="price-label">Price Range:</span>
                    <span className="price-value">{project.price}</span>
                  </div>
                  
                  <div className="project-features">
                    <h4>Key Features:</h4>
                    <ul>
                      {project.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="project-actions">
                    <button className="view-details-btn">View Details</button>
                    <button className="inquire-btn">Inquire</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Projects Section */}
      <section className="special-projects">
        <div className="container">
          <h3 className="section-title">Special Projects</h3>
          <div className="special-grid">
            <div className="special-card featured">
              <div className="special-content">
                <h4>Collaboration Series</h4>
                <p>
                  Exclusive partnerships with renowned artists and designers, 
                  creating one-of-a-kind timepieces that blend art and horology.
                </p>
                <button className="special-btn">Learn More</button>
              </div>
              <div className="special-image">
                <span>🎭</span>
              </div>
            </div>
            
            <div className="special-card">
              <div className="special-content">
                <h4>Custom Commission</h4>
                <p>
                  Work directly with our master watchmakers to create your 
                  dream timepiece from concept to completion.
                </p>
                <button className="special-btn">Start Project</button>
              </div>
              <div className="special-image">
                <span>⚙️</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <h3 className="section-title">Our Process</h3>
          <div className="process-grid">
            <div className="process-step">
              <div className="step-number">1</div>
              <h4>Concept</h4>
              <p>We begin with your vision, understanding your style, preferences, and requirements.</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h4>Design</h4>
              <p>Our designers create detailed sketches and 3D models to bring your concept to life.</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h4>Crafting</h4>
              <p>Master watchmakers carefully assemble each component with precision and care.</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h4>Quality</h4>
              <p>Rigorous testing ensures your timepiece meets our exacting standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h3>Ready to Start Your Project?</h3>
            <p>
              Whether you're interested in our existing collections or want to create 
              something truly unique, we're here to help bring your vision to life.
            </p>
            <div className="cta-buttons">
              <button 
                onClick={() => navigate("/contact")}
                className="cta-btn primary"
              >
                Get in Touch
              </button>
              <button 
                onClick={() => navigate("/store")}
                className="cta-btn secondary"
              >
                Browse Collection
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
    </Layout>
  );
};

export default Projects;
