"use client"

import { useEffect, useRef } from "react"
import "./Services.css"

const ServiceCard = ({ title, description, image, isLeft }) => {
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate")
        }
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  return (
    <div className={`service-card ${isLeft ? "left-panel" : "right-panel"}`} ref={cardRef}>
      <div className="service-image-container">
        <img src={image || "/placeholder.svg"} alt={title} className="service-image" />
      </div>
      <div className="service-content">
        <h3 className="service-title">{title}</h3>
        <p className="service-description">{description}</p>
      </div>
    </div>
  )
}

const Services = () => {
  const services = [
    {
      title: "Interior & Exterior Paints",
      description: "Transform your space with our premium paint solutions.",
      image: "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Wood Polishing",
      description: "Restore and protect your wooden surfaces with expert polishing.",
      image: "https://images.unsplash.com/photo-1574501668452-39ee2dd312ab?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "PU Polishing",
      description: "Enhance the shine and durability of your PU surfaces.",
      image: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Dico Painting",
      description: "Get a smooth and flawless finish with our Dico painting technique.",
      image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "False Ceiling",
      description: "Create a stunning and modern look with our false ceiling installations.",
      image: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Cornice Installation",
      description: "Add elegance and sophistication to your space with our cornice installations.",
      image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Interior & Exterior Design",
      description: "Let us help you design the perfect space for your needs.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "On-site Consultation",
      description: "We offer free on-site consultations to discuss your project.",
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Wall Texture & Art",
      description: "Add personality and style to your walls with our texture and art services.",
      image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Color Consultation",
      description: "Get expert advice on choosing the perfect colors for your home.",
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Waterproofing Solutions",
      description: "Protect your property from water damage with our effective waterproofing solutions.",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    },
  ]

  return (
    <section className="services" id="services">
      <div className="services-container">
        <h2 className="services-heading">Our Professional Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} isLeft={index % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

