import React, { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/store.css";

const Store = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Arun Gujjar",
      role: "Amity College Student",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      text: "Walnut's luxury collection is absolutely stunning. The craftsmanship and attention to detail is unmatched. My Rolex Submariner is my most prized possession.",
      rating: 5
    },
    {
      id: 2,
      name: "Abhishek Mittal",
      role: "Professioanl Ganduwa",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "The smart watch selection here is incredible. I love how they combine cutting-edge technology with elegant design. Perfect for both business and casual wear.",
      rating: 5
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Professional Athlete",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "As an athlete, I need a watch that can keep up with my active lifestyle. The sport collection here is perfect - durable, accurate, and stylish.",
      rating: 5
    },
    {
      id: 4,
      name: "Rajesh Kumar",
      role: "Watch Collector",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "I've been collecting watches for 20 years, and Walnut has the best selection I've ever seen. Their vintage pieces are authentic and well-maintained.",
      rating: 5
    }
  ];

  // Featured watches data
  const featuredWatches = [
    {
      id: 1,
      name: "Luxury Chronograph",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
      description: "Precision engineering meets timeless elegance",
      price: "$12,500"
    },
    {
      id: 2,
      name: "Smart Luxury",
      image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop",
      description: "Where technology meets sophistication",
      price: "$8,900"
    },
    {
      id: 3,
      name: "Classic Dress Watch",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      description: "The epitome of understated luxury",
      price: "$6,200"
    }
  ];

  // Sensory UX Functions
  const playHoverSound = () => {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0.1;
        audioRef.current.play().catch(() => {});
      }
    } catch (error) {
      // Silent fail for audio
    }
  };

  const addHoverEffects = useCallback(() => {
    const interactiveElements = document.querySelectorAll(
      '.category-btn, .cta-btn, .add-to-cart-btn, .nav-link, .featured-card, .detail-card, .testimonial-card'
    );

    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', playHoverSound);
      element.addEventListener('mouseenter', () => {
        element.style.transform = element.style.transform + ' scale(1.02)';
      });
      element.addEventListener('mouseleave', () => {
        element.style.transform = element.style.transform.replace(' scale(1.02)', '');
      });
    });
  }, []);

  const initScrollPhysics = useCallback(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;

    const updateScrollPhysics = () => {
      const scrolled = window.scrollY;
      const delta = scrolled - lastScrollY;
      
      // Add momentum to scroll
      if (Math.abs(delta) > 5) {
        document.body.style.setProperty('--scroll-momentum', `${delta * 0.1}px`);
      }
      
      lastScrollY = scrolled;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollPhysics);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
  }, []);

  // Removed parallax effects to keep images static during scroll

  React.useEffect(() => {
    // Initialize sensory UX after content loads
    setTimeout(() => {
      addHoverEffects();
      initScrollPhysics();
    }, 100);
  }, [addHoverEffects, initScrollPhysics]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "star filled" : "star"}>
        ★
      </span>
    ));
  };

  return (
    <Layout>
      {/* Audio element for hover sounds */}
      <audio ref={audioRef} preload="auto">
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT" type="audio/wav" />
      </audio>

      <div className="store-container">
        {/* Hero Section - Enhanced */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Discover Your Perfect Timepiece</h1>
            <p className="hero-subtitle">
              From classic elegance to modern luxury, find the watch that tells your story. 
              Explore our curated collection of luxury timepieces .
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Luxury Watches</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Premium Brands</span>
              </div>
              <div className="stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=400&fit=crop" 
              alt="Luxury Watch Collection"
              className="hero-watch-image"
            />
          </div>
        </section>

        {/* Search and Filter Section */}


        {/* Featured Watches Section */}
        <section className="featured-section">
          <div className="section-header">
            <h2 className="section-title">Featured Collections</h2>
            <p className="section-subtitle">Discover our most sought-after timepieces</p>
          </div>
          <div className="featured-grid">
            {featuredWatches.map((watch) => (
              <div key={watch.id} className="featured-card">
                <div className="featured-image">
                  <img src={watch.image} alt={watch.name} />
                </div>
                <div className="featured-content">
                  <h3>{watch.name}</h3>
                  <p>{watch.description}</p>
                  <span className="featured-price">{watch.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Watch Details Section */}
        <section className="watch-details-section">
          <div className="section-header">
            <h2 className="section-title">Why Choose Walnut?</h2>
            <p className="section-subtitle">Experience the difference of premium watch craftsmanship</p>
          </div>
          <div className="details-grid">
            <div className="detail-card">
              <div className="detail-icon">🕐</div>
              <h3>Luxury Look, Exceptional Value</h3>
              <p>We specialize in high-quality 1:1 clone watches that mirror the originals in look, feel, and performance at a fraction of the price. Experience the elegance of premium designs without the premium price tag.</p>
            </div>
            <div className="detail-card">
              <div className="detail-icon">💎</div>
              <h3>Uncompromised Quality</h3>
              <p>Our products are sourced from trusted makers who focus on detail, durability, and precision giving you that luxury experience without the luxury price tag.</p>
            </div>
            <div className="detail-card">
              <div className="detail-icon">🔧</div>
              <h3>Customer First Support</h3>
              <p>Our friendly support team is always here to help before and after your purchase
and every product is packed with 3 months warranty..</p>
            </div>
            <div className="detail-card">
              <div className="detail-icon">📦</div>
              <h3>Secure Shipping</h3>
              <p>All watches are shipped in premium packaging with full insurance and tracking. We ensure your investment arrives safely and securely.</p>
            </div>
          </div>
        </section>




        {/* Testimonials Section */}
        <section className="testimonials-section">
          <div className="section-header">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">Real experiences from watch enthusiasts worldwide</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-header">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="testimonial-avatar"
                  />
                  <div className="testimonial-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                    <div className="testimonial-rating">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Find Your Perfect Watch?</h2>
            <p>Join thousands of satisfied customers who trust Walnut for their luxury timepiece needs.</p>
            <div className="cta-buttons">
              <button 
                onClick={() => navigate("/categories")}
                className="cta-btn primary"
              >
                Explore Categories
              </button>
              <button 
                onClick={() => navigate("/contact")}
                className="cta-btn secondary"
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Store;
