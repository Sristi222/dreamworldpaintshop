"use client"

import { useEffect, useRef } from "react"
import "./Inspiration.css"

const InspirationCard = ({ image, roomLabel, title, description, onViewGallery }) => {
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
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
    <div className="inspiration-card" ref={cardRef}>
      <div className="card-image">
        <img src={image || "/placeholder.svg"} alt={`${roomLabel} inspiration`} loading="lazy" />
        <span className="room-label">{roomLabel}</span>
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <button onClick={onViewGallery} className="view-gallery">
          View Gallery
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

const Inspiration = () => {
  const titleRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      },
      { threshold: 0.1 },
    )

    if (titleRef.current) {
      observer.observe(titleRef.current)
    }

    if (gridRef.current) {
      observer.observe(gridRef.current)
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current)
      }
      if (gridRef.current) {
        observer.unobserve(gridRef.current)
      }
    }
  }, [])


  return (
    <section className="inspiration">
      <div className="inspiration-container">
        <h2 className="inspiration-title" ref={titleRef}>
          Get Inspired
        </h2>
        <div className="inspiration-grid" ref={gridRef}>
          <InspirationCard
            image="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80"
            roomLabel="Living Room"
            title="Modern Living Spaces"
            description="Transform your living room with our trending color palettes"
           
          />
          <InspirationCard
            image="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80"
            roomLabel="Kitchen"
            title="Kitchen Makeovers"
            description="Create a stunning kitchen with our specialized paints"
            
          />
          <InspirationCard
            image="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80"
            roomLabel="Bedroom"
            title="Peaceful Bedrooms"
            description="Design your perfect sanctuary with soothing colors"
            
          />
        </div>
      </div>
    </section>
  )
}

export default Inspiration

