"use client"
import { useState, useCallback } from "react"
import { Link, useLocation } from "react-router-dom"
import { Facebook, Twitter, Instagram, Phone, Mail, MapPin, X } from "lucide-react"
import "./Footer.css"

const Footer = () => {
  const location = useLocation()
  const [modalImage, setModalImage] = useState(null)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleLinkClick = (e, id) => {
    e.preventDefault()
    if (location.pathname === "/") {
      scrollToSection(id)
    } else {
      window.location.href = `/#${id}`
    }
  }

  const openModal = useCallback((imageSrc) => {
    setModalImage(imageSrc)
    document.body.style.overflow = "hidden"
  }, [])

  const closeModal = useCallback(() => {
    setModalImage(null)
    document.body.style.overflow = "visible"
  }, [])

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="brand-logo">Dream House Color World</h3>
          <p className="brand-description">
            Transform your living spaces with our premium quality paints and expert color consultation services.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Contact Info</h4>
          <address className="contact-details">
            <p>
              <MapPin size={16} />
              <span>123 Paint Street, Color City, 12345</span>
            </p>
            <a href="tel:+919876543210">
              <Phone size={16} />
              <span>+91 987 654 3210</span>
            </a>
            <a href="mailto:info@dreamhouse.com">
              <Mail size={16} />
              <span>info@dreamhouse.com</span>
            </a>
          </address>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <nav className="footer-nav">
            <ul>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <a href="/#services" onClick={(e) => handleLinkClick(e, "services")}>
                  Services
                </a>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li>
                <a href="/#contact" onClick={(e) => handleLinkClick(e, "contact")}>
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Our Store</h4>
          <div className="footer-gallery">
            <img
              src="https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Store Interior"
              className="footer-gallery-image"
              onClick={() =>
                openModal(
                  "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                )
              }
            />
            <img
              src="https://plus.unsplash.com/premium_photo-1726750875095-a928734b53f0?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Paint Selection"
              className="footer-gallery-image"
              onClick={() =>
                openModal(
                  "https://plus.unsplash.com/premium_photo-1726750875095-a928734b53f0?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                )
              }
            />
            <img
              src="https://plus.unsplash.com/premium_photo-1703385177149-a4b56c545344?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Paint Mixing"
              className="footer-gallery-image"
              onClick={() =>
                openModal(
                  "https://plus.unsplash.com/premium_photo-1703385177149-a4b56c545344?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                )
              }
            />
            <img
              src="https://images.unsplash.com/photo-1528396518501-b53b655eb9b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Color Consultation"
              className="footer-gallery-image"
              onClick={() =>
                openModal(
                  "https://images.unsplash.com/photo-1528396518501-b53b655eb9b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                )
              }
            />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Dream House Color World. All Rights Reserved</p>
      </div>

      {modalImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={modalImage || "/placeholder.svg"} alt="Enlarged store image" />
            <button className="modal-close" onClick={closeModal} aria-label="Close modal">
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </footer>
  )
}

export default Footer

