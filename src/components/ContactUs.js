import { useState, useRef, useEffect } from "react";
import "./ContactUs.css";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactRef = useRef(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#contact" && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      alert("Thank you for your message! We'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="contact-us" id="contact" ref={contactRef}>
      <div className="contact-container">
        <h2 className="contact-title">Get in Touch</h2>
        <div className="contact-content">
          <div className="contact-form">
            <h3>Send Us a Message</h3>
            <form id="contactForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="name" className={name ? "active" : ""}>
                  Your Name
                </label>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email" className={email ? "active" : ""}>
                  Your Email
                </label>
              </div>
              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <label htmlFor="message" className={message ? "active" : ""}>
                  Your Message
                </label>
              </div>
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div className="contact-info">
            <h3>Contact Information</h3>
            <ul>
              <li>
                <span>(123) 456-7890</span>
              </li>
              <li>
                <span>info@dreamhousecolor.com</span>
              </li>
            </ul>
          </div>

          <div className="map-placeholder">
          <iframe
  title="Shop Location"
  width="100%"
  height="300"
  style={{ borderRadius: "20px", border: "0" }}
  loading="lazy"
  allowFullScreen
  referrerPolicy="no-referrer-when-downgrade"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0698974709953!2d85.28050637525406!3d27.71512807617803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb188ff07feff9%3A0x3ddede4544ed06d1!2sDream%20House%20Colour%20World!5e0!3m2!1sen!2snp!4v1739887513174!5m2!1sen!2snp"
/>


              
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
