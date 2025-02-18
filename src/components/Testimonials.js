"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "./Testimonials.css"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    type: "Residential Client",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    quote: "The attention to detail and professionalism was outstanding. Our home looks absolutely beautiful!",
    beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Michael Chen",
    type: "Commercial Client",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    quote: "ColorCraft transformed our office space completely. The team was efficient and professional.",
    beforeImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    type: "Design Client",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    quote: "The color consultation service was invaluable. They helped us choose the perfect palette!",
    beforeImage: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "John Doe",
    type: "Residential Client",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    quote:
      "I was very impressed with the quality of work and the professionalism of the team. I would highly recommend them.",
    beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Jane Smith",
    type: "Commercial Client",
    avatar: "https://randomuser.me/api/portraits/women/75.jpg",
    quote: "The team was very efficient and professional. They completed the project on time and within budget.",
    beforeImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Peter Jones",
    type: "Design Client",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    quote: "I was very happy with the results. The team was very creative and came up with some great ideas.",
    beforeImage: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
  },
]

const Testimonials = () => {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [comparisons, setComparisons] = useState([])

  useEffect(() => {
    const sectionElement = sectionRef.current
    if (!sectionElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }
        })
      },
      { threshold: 0.1 },
    )

    const animatedElements = sectionElement.querySelectorAll(`.sectionTitle, .sectionSubtitle, .testimonialCard`)

    animatedElements.forEach((el) => {
      observer.observe(el)
    })

    return () => {
      animatedElements.forEach((el) => {
        observer.unobserve(el)
      })
    }
  }, [])

  useEffect(() => {
    const comparisonElements = Array.from(document.querySelectorAll(`.imgCompContainer`))
    setComparisons(comparisonElements)
  }, [])

  useEffect(() => {
    if (!comparisons.length) return

    const handlers = comparisons.map((comparison) => {
      const slider = comparison.querySelector(`.imgCompSlider`)
      const beforeImage = comparison.querySelector(`.imgCompBefore`)
      const afterImage = comparison.querySelector(`.imgCompAfter`)
      let clicked = 0

      const slide = (x) => {
        const width = comparison.offsetWidth
        const percent = (x / width) * 100
        if (slider && beforeImage && afterImage) {
          slider.style.left = `${percent}%`
          beforeImage.style.width = `${percent}%`
          afterImage.style.width = `${100 - percent}%`
        }
      }

      const getCursorPos = (e) => {
        let x = 0
        e = e.changedTouches ? e.changedTouches[0] : e
        const rect = comparison.getBoundingClientRect()
        x = e.pageX - rect.left
        x = x - window.pageXOffset
        return x
      }

      const slideReady = (e) => {
        e.preventDefault()
        clicked = 1
      }

      const slideFinish = () => {
        clicked = 0
      }

      const slideMove = (e) => {
        if (clicked === 0) return false
        let pos = getCursorPos(e)
        if (pos < 0) pos = 0
        if (pos > comparison.offsetWidth) pos = comparison.offsetWidth
        slide(pos)
      }

      const resetComparison = () => {
        slide(comparison.offsetWidth / 2)
      }

      if (slider) {
        slider.addEventListener("mousedown", slideReady)
        slider.addEventListener("touchstart", slideReady)
      }

      comparison.addEventListener("mousemove", slideMove)
      comparison.addEventListener("touchmove", slideMove)
      comparison.addEventListener("mouseleave", slideFinish)
      comparison.addEventListener("touchend", slideFinish)
      comparison.addEventListener("dblclick", resetComparison)
      window.addEventListener("mouseup", slideFinish)

      slide(comparison.offsetWidth / 2)

      return () => {
        if (slider) {
          slider.removeEventListener("mousedown", slideReady)
          slider.removeEventListener("touchstart", slideReady)
        }
        comparison.removeEventListener("mousemove", slideMove)
        comparison.removeEventListener("touchmove", slideMove)
        comparison.removeEventListener("mouseleave", slideFinish)
        comparison.removeEventListener("touchend", slideFinish)
        comparison.removeEventListener("dblclick", resetComparison)
        window.removeEventListener("mouseup", slideFinish)
      }
    })

    return () => {
      handlers.forEach((cleanup) => cleanup())
    }
  }, [comparisons])

  const handlePrevClick = () => {
    setActiveIndex((current) => (current === 0 ? testimonials.length - 3 : current - 1))
  }

  const handleNextClick = () => {
    setActiveIndex((current) => (current === testimonials.length - 3 ? 0 : current + 1))
  }

  return (
    <section className="testimonials" ref={sectionRef}>
      <div className="container">
        <h2 className="sectionTitle">What Our Clients Say</h2>
        <p className="sectionSubtitle">
          Discover why homeowners and businesses trust ColorCraft for their painting needs
        </p>

        <div className="testimonialsCarousel">
          <div
            className="carouselTrack"
            style={{ transform: `translateX(calc(-${activeIndex * 33.33}% - ${activeIndex * 30}px))` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonialCard">
                <img src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} className="clientAvatar" />
                <div className="testimonialHeader">
                  <div className="rating">★★★★★</div>
                </div>
                <blockquote className="testimonialQuote">{testimonial.quote}</blockquote>
                <div className="clientInfo">
                  <h4 className="clientName">{testimonial.name}</h4>
                  <p className="clientType">{testimonial.type}</p>
                </div>
                <div className="beforeAfter">
                  <div className="imgCompContainer">
                    <div className="imgCompBefore">
                      <img src={testimonial.beforeImage || "/placeholder.svg"} alt="Before" />
                      <div className="imgLabel before">Before</div>
                    </div>
                    <div className="imgCompAfter">
                      <img src={testimonial.afterImage || "/placeholder.svg"} alt="After" />
                      <div className="imgLabel after">After</div>
                    </div>
                    <div className="imgCompSlider">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="carouselControls">
          <button onClick={handlePrevClick} className="carouselButton prev" aria-label="Previous testimonial">
            <ChevronLeft size={24} />
          </button>
          <button onClick={handleNextClick} className="carouselButton next" aria-label="Next testimonial">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

