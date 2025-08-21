import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/about.css";

const About = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="about-container">
        {/* Header */}
        <div className="about-header">
          <h1 className="page-title">About Walnut</h1>
        </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">Crafting Time, Defining Style</h2>
          <p className="hero-subtitle">
            Since 2024, Walnut has been at the forefront of horological innovation, 
            bringing together the finest craftsmanship and cutting-edge technology to create 
            timepieces that transcend mere functionality.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <h3>Our Story</h3>
              <p>
                Founded with a vision to democratize luxury timepieces, Walnut emerged 
                from a simple belief: everyone deserves to own a piece of horological art. 
                Our journey began in a small workshop where passion met precision, and today 
                we stand as a testament to what dedication and innovation can achieve.
              </p>
              <p>
                Each watch in our collection tells a story - of meticulous engineering, 
                timeless design, and unwavering commitment to quality. We don't just sell 
                watches; we offer experiences that become part of your personal narrative.
              </p>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <span>🏭</span>
                <p>Our Workshop</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h3 className="section-title">Our Values</h3>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h4>Innovation</h4>
              <p>
                We constantly push the boundaries of what's possible in watchmaking, 
                embracing new technologies while respecting traditional craftsmanship.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h4>Precision</h4>
              <p>
                Every component, every movement, every detail is crafted with obsessive 
                attention to accuracy and reliability.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">💎</div>
              <h4>Quality</h4>
              <p>
                We never compromise on quality. From the finest materials to the most 
                rigorous testing, excellence is our standard.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h4>Community</h4>
              <p>
                We believe in building lasting relationships with our customers, 
                creating a community of watch enthusiasts and collectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h3 className="section-title">Meet Our Team</h3>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">
                <span>👨‍💼</span>
              </div>
              <h4>Alex Chen</h4>
              <p className="member-role">Founder & CEO</p>
              <p className="member-bio">
                A visionary entrepreneur with 15+ years in luxury retail and a passion 
                for bringing exceptional timepieces to discerning collectors.
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <span>👩‍🔬</span>
              </div>
              <h4>Dr. Sarah Kim</h4>
              <p className="member-role">Head of Design</p>
              <p className="member-bio">
                Award-winning designer with expertise in both traditional watchmaking 
                and modern aesthetics, creating pieces that stand the test of time.
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <span>👨‍🔧</span>
              </div>
              <h4>Marcus Rodriguez</h4>
              <p className="member-role">Master Watchmaker</p>
              <p className="member-bio">
                Third-generation watchmaker with unparalleled skill in precision 
                engineering and mechanical watch assembly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h3>Ready to Find Your Perfect Timepiece?</h3>
            <p>
              Explore our collection of premium watches and discover the one that 
              speaks to your style and aspirations.
            </p>
            <button 
              onClick={() => navigate("/store")}
              className="cta-btn"
            >
              Browse Collection
            </button>
          </div>
        </div>
      </section>
    </div>
    </Layout>
  );
};

export default About;
