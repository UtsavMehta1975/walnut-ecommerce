import React from "react";
import Layout from "../components/Layout";
import "../styles/terms.css";

const Terms = () => {
  return (
    <Layout>
      <div className="terms-container">
        {/* Header */}
        <section className="terms-header">
          <h1 className="terms-title">Terms and Conditions</h1>
          <p className="terms-subtitle">
            Last updated: December 2024
          </p>
        </section>

        {/* Content */}
        <section className="terms-content">
          <div className="terms-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Walnut's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          <div className="terms-section">
            <h2>2. Description of Service</h2>
            <p>
              Walnut provides an online platform for purchasing premium timepieces. Our service includes product browsing, secure payment processing, order management, and customer support.
            </p>
          </div>

          <div className="terms-section">
            <h2>3. User Accounts</h2>
            <p>
              To access certain features of our service, you must create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>
            <ul>
              <li>You must provide accurate and complete information when creating an account</li>
              <li>You are responsible for safeguarding your password and account access</li>
              <li>You must notify us immediately of any unauthorized use of your account</li>
              <li>We reserve the right to terminate accounts that violate our terms</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>4. Product Information</h2>
            <p>
              We strive to provide accurate product information, including descriptions, prices, and availability. However, we do not guarantee that all information is complete, accurate, or current.
            </p>
            <ul>
              <li>Product images are for illustrative purposes only</li>
              <li>Prices are subject to change without notice</li>
              <li>Product availability is not guaranteed</li>
              <li>Specifications may vary from product descriptions</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>5. Pricing and Payment</h2>
            <p>
              All prices are displayed in Indian Rupees (₹) and include applicable taxes unless otherwise stated. Payment must be made at the time of order placement.
            </p>
            <ul>
              <li>We accept major credit cards and digital payment methods</li>
              <li>All transactions are processed securely</li>
              <li>Prices may be subject to change without prior notice</li>
              <li>Additional shipping and handling fees may apply</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>6. Shipping and Delivery</h2>
            <p>
              We offer shipping to addresses within India. Delivery times are estimates and may vary based on location and shipping method selected.
            </p>
            <ul>
              <li>Free shipping on orders above ₹5,000</li>
              <li>Standard delivery: 3-7 business days</li>
              <li>Express delivery: 1-3 business days (additional charges apply)</li>
              <li>Risk of loss transfers to buyer upon delivery</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>7. Returns and Refunds</h2>
            <p>
              We want you to be completely satisfied with your purchase. If you're not happy with your order, we offer a 30-day return policy.
            </p>
            <ul>
              <li>Returns must be initiated within 30 days of delivery</li>
              <li>Products must be in original condition with all packaging</li>
              <li>Return shipping costs are the responsibility of the customer</li>
              <li>Refunds will be processed within 5-7 business days</li>
              <li>Custom or personalized items are non-returnable</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>8. Warranty and Service</h2>
            <p>
              All Walnut timepieces come with manufacturer warranty as specified by the brand. Additional warranty information is provided with each product.
            </p>
            <ul>
              <li>Manufacturer warranty covers defects in materials and workmanship</li>
              <li>Warranty does not cover damage from misuse or accidents</li>
              <li>Service and repairs are handled by authorized service centers</li>
              <li>Warranty period varies by brand and model</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>9. Privacy Policy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices regarding the collection and use of your personal information.
            </p>
          </div>

          <div className="terms-section">
            <h2>10. Intellectual Property</h2>
            <p>
              The service and its original content, features, and functionality are and will remain the exclusive property of Walnut and its licensors. The service is protected by copyright, trademark, and other laws.
            </p>
          </div>

          <div className="terms-section">
            <h2>11. Limitation of Liability</h2>
            <p>
              In no event shall Walnut, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </div>

          <div className="terms-section">
            <h2>12. Governing Law</h2>
            <p>
              These terms shall be interpreted and governed by the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these terms will not be considered a waiver of those rights.
            </p>
          </div>

          <div className="terms-section">
            <h2>13. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>
          </div>

          <div className="terms-section">
            <h2>14. Contact Information</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <div className="contact-info">
              <p><strong>Email:</strong> legal@Walnut.com</p>
              <p><strong>Phone:</strong> +91-1800-CHRONO</p>
              <p><strong>Address:</strong> Walnut Legal Department, Mumbai, India</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Terms;





