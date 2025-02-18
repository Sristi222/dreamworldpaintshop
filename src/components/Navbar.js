"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "")
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [location])

  const handleSearch = (event) => {
    event.preventDefault()
    // Handle search logic here
    console.log("Search term:", searchTerm)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    document.body.style.overflow = !isMenuOpen ? "hidden" : "visible"
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    document.body.style.overflow = "visible"
  }

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <nav className="nav">
        <Link to="/" className="logo" onClick={closeMenu}>
          Dream House Color World
        </Link>
        <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <Link to="/products" className="nav-link" onClick={closeMenu}>
            Products
          </Link>
          <Link to="/#services" className="nav-link" onClick={closeMenu}>
            Services
          </Link>
          <Link to="/gallery" className="nav-link" onClick={closeMenu}>
            Gallery
          </Link>
          <Link to="/#contact" className="nav-link" onClick={closeMenu}>
            Contact
          </Link>
        </div>
        <form className="search-container" onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            className="search-input"
            placeholder="Search colors, textures..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-btn" aria-label="Search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </form>
        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  )
}

export default Navbar

