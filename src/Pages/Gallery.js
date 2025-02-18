"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "./Gallery.css"

const galleryData = [
  {
    id: "living-room",
    title: "Modern Living Spaces",
    description:
      "Discover inspiring color palettes and design ideas for your living room. From cozy neutrals to bold statement walls, find the perfect look for your space.",
    items: [
      {
        src: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80",
        alt: "Minimalist living room with neutral tones",
        title: "Minimalist Neutrals",
      },
      {
        src: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=800&q=80",
        alt: "Colorful modern living room",
        title: "Bold & Vibrant",
      },
      {
        src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800&q=80",
        alt: "Scandinavian style living room",
        title: "Scandinavian Chic",
      },
      {
        src: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
        alt: "Rustic living room with warm colors",
        title: "Rustic Warmth",
      },
      {
        src: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
        alt: "Contemporary living room with blue accents",
        title: "Cool Contemporary",
      },
      {
        src: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80",
        alt: "Eclectic living room with mixed patterns",
        title: "Eclectic Mix",
      },
    ],
  },
  {
    id: "kitchen",
    title: "Kitchen Makeovers",
    description:
      "Explore stunning kitchen designs and color schemes. From sleek modern to cozy traditional, find inspiration for your dream kitchen renovation.",
    items: [
      {
        src: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80",
        alt: "Modern white kitchen with marble countertops",
        title: "Modern Elegance",
      },
      {
        src: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80",
        alt: "Rustic kitchen with wooden elements",
        title: "Rustic Charm",
      },
      {
        src: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=800&q=80",
        alt: "Sleek black and white kitchen",
        title: "Monochrome Magic",
      },
      {
        src: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
        alt: "Colorful retro-inspired kitchen",
        title: "Retro Revival",
      },
      {
        src: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80",
        alt: "Minimalist kitchen with concrete elements",
        title: "Industrial Minimalism",
      },
      {
        src: "https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?auto=format&fit=crop&w=800&q=80",
        alt: "Bright kitchen with yellow accents",
        title: "Sunny & Bright",
      },
    ],
  },
  {
    id: "bedroom",
    title: "Peaceful Bedrooms",
    description:
      "Create your perfect sanctuary with our bedroom color inspirations. From calming neutrals to soothing blues, discover the ideal palette for restful nights.",
    items: [
      {
        src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
        alt: "Serene bedroom with soft blue walls",
        title: "Tranquil Blue",
      },
      {
        src: "https://images.unsplash.com/photo-1617325247661-675ab4b64b12?auto=format&fit=crop&w=800&q=80",
        alt: "Minimalist bedroom with earth tones",
        title: "Earth Tone Retreat",
      },
      {
        src: "https://images.unsplash.com/photo-1616594039665-58f11250e107?auto=format&fit=crop&w=800&q=80",
        alt: "Luxurious bedroom with deep green walls",
        title: "Emerald Elegance",
      },
      {
        src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
        alt: "Cozy bedroom with warm lighting",
        title: "Warm & Cozy",
      },
      {
        src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
        alt: "Scandinavian inspired white bedroom",
        title: "Nordic Simplicity",
      },
      {
        src: "https://images.unsplash.com/photo-1616594039665-58f11250e107?auto=format&fit=crop&w=800&q=80",
        alt: "Bohemian bedroom with colorful accents",
        title: "Boho Dreams",
      },
    ],
  },
]

const Gallery = () => {
  const [modalImage, setModalImage] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
          }
        })
      },
      { threshold: 0.1 },
    )

    document
      .querySelectorAll(".gallery-section-title, .gallery-section-description, .gallery-image-grid")
      .forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <div className="gallery-page">
        {galleryData.map((section) => (
          <section key={section.id} id={section.id} className="gallery-section">
            <div className="gallery-section-container">
              <h2 className="gallery-section-title">{section.title}</h2>
              <p className="gallery-section-description">{section.description}</p>
              <div className="gallery-image-grid">
                {section.items.map((item, index) => (
                  <div key={index} className="gallery-image-item" onClick={() => setModalImage(item.src)}>
                    <img src={item.src || "/placeholder.svg"} alt={item.alt} className="gallery-item-image" />
                    <div className="gallery-image-overlay">
                      <h3 className="gallery-image-title">{item.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
        {modalImage && (
          <div className="gallery-modal" onClick={() => setModalImage(null)}>
            <span className="gallery-modal-close">&times;</span>
            <img className="gallery-modal-content" src={modalImage || "/placeholder.svg"} alt="Enlarged view" />
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default Gallery

