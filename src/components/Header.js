"use client"

import { useState, useEffect } from "react"
import Navbar from "./Navbar"
import "./Header.css"

const DreamPaints = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image:
        "https://plus.unsplash.com/premium_photo-1663054930833-59566ed4fff0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Elevate Your Space\nWith Premium Colors",
      description:
        "Discover a world of possibilities with our curated collection of premium paints and expert color consultation services.",
      buttonText: "Explore Palette",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1726761877601-bd498c5d2c6f?q=80&w=1830&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D3D",
      title: "Crafted with\nPrecision & Passion",
      description: "Experience the perfect blend of quality and innovation with our advanced paint technology.",
      buttonText: "Our Technique",
    },
    {
      image:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Professional\nExcellence",
      description: "Trust our expert team to bring your vision to life with precision, care, and artistic flair.",
      buttonText: "Book Consultation",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <Navbar />
      <section className="hero">
        {slides.map((slide, index) => (
          <div key={index} className={`slide ${index === currentSlide ? "active" : ""}`}>
            <img src={slide.image || "/placeholder.svg"} alt={`Slide ${index + 1}`} className="slide-bg" />
            <div className="hero-content-wrapper">
              <div className="slide-content">
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-description">{slide.description}</p>
                <a href="#" className="slide-btn">
                  {slide.buttonText}
                </a>
              </div>
            </div>
          </div>
        ))}
        <div className="hero-curve">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path d="M0,160 C180,280,360,300,540,280 C720,260,900,200,1080,180 C1260,160,1350,180,1440,200 L1440,320 L0,320 Z"></path>
          </svg>
        </div>
      </section>
    </>
  )
}

export default DreamPaints

