import React from 'react';
import "./Services.css";

const ServiceCard = ({ icon, title, description, features, iconClass }) => (
  <div className="service-card">
    <div className={`service-icon ${iconClass}`}>
      {icon}
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
    <ul className="service-features">
      {features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
    <a href="#" className="service-btn">Learn More</a>
  </div>
);

const Services = () => {
  const services = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 19l7-7 3 3-7 7-3-3z"></path>
          <path d="M14 19l-4 4H5v-5l4-4"></path>
          <path d="M15 4l-3 3"></path>
          <path d="M20 9l-3 3"></path>
        </svg>
      ),
      title: "Professional Painting Solutions",
      description: "Bringing walls to life with premium-quality paints and artistic finishes.",
      features: ["Interior & Exterior Painting", "Dico Painting", "Wall Texture & Art"],
      iconClass: "painting",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      ),
      title: "Premium Polishing Services",
      description: "Refining surfaces with flawless polishing techniques for a luxurious finish.",
      features: ["Wood Polishing", "PU Polishing"],
      iconClass: "polishing",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ),
      title: "Ceiling & Decorative Enhancements",
      description: "Elevate interiors with stylish ceilings and elegant decor.",
      features: ["False Ceiling", "Cornice"],
      iconClass: "ceiling",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
          <path d="M2 2l7.586 7.586"></path>
          <circle cx="11" cy="11" r="2"></circle>
        </svg>
      ),
      title: "Expert Design & Consultation",
      description: "Tailored solutions for a beautifully designed and color-balanced space.",
      features: ["Interior & Exterior Design", "Color Consultation"],
      iconClass: "design",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      ),
      title: "Additional Support Services",
      description: "Ensuring quality and durability with specialized services.",
      features: ["On-Site Painter Deployment", "Waterproofing Solutions"],
      iconClass: "support",
    },
  ];

  return (
    <section className="services">
      <div className="gradient-container">
        <h2 className="services-title">Our Professional Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
