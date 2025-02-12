"use client"

import { useState } from "react"
import "./ContactUs.css"

function ContactUs() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      alert("Thank you for your message! We'll get back to you soon.")
      setName("")
      setEmail("")
      setMessage("")
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <section className="contact-us">
      <div className="contact-container">
        <h2 className="contact-title">Get in Touch</h2>
        <div className="contact-content">
          {/* Contact Form - Left Side */}
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

          {/* Contact Info - Right Side */}
          <div className="contact-info">
            <h3>Contact Information</h3>
            <ul>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>123 Painting Street, Color City, 12345</span>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>(123) 456-7890</span>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>info@dreamhousecolor.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="map-placeholder">
          <div className="map-content">
            <h3>Visit Our Store</h3>
            <p>To view our location on Google Maps, please follow these steps:</p>
            <ol>
              <li>
                Get a Google Maps API key from the{" "}
                <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">
                  Google Cloud Console
                </a>
              </li>
              <li>Enable the Maps JavaScript API in your project</li>
              <li>Add your API key to the environment variables as NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs

