import { useCallback, useEffect, useState } from "react";
import { fetchCarouselEvents, getEventImageUrl } from "../../services/api";
import "./HeroSlide.css";

const VISIBLE = 3;
const DEFAULT_SLIDES = [
  {
    eventId: null,
    title: "Welcome to Campus Aura",
    description: "Discover exciting campus events",
    eventImageUrls: ["https://picsum.photos/id/1018/1400/700"],
  },
];

export default function HeroSlider() {
  const [slides, setSlides] = useState(DEFAULT_SLIDES);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCarouselEvents = async () => {
      try {
        setLoading(true);
        const events = await fetchCarouselEvents();
        
        if (events && events.length > 0) {
          setSlides(events);
        } else {
          setSlides(DEFAULT_SLIDES);
        }
      } catch (error) {
        console.error("Failed to load carousel events:", error);
        setSlides(DEFAULT_SLIDES);
      } finally {
        setLoading(false);
      }
    };

    loadCarouselEvents();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  useEffect(() => {
    if (!loading && slides.length > 0) {
      const id = setInterval(nextSlide, 4500);
      return () => clearInterval(id);
    }
  }, [nextSlide, loading, slides.length]);

  const offsetPercent = (100 / VISIBLE) * current;

  // Helper function to get properly formatted image URL
  const getImageUrl = (slide) => {
    let imageUrl = getEventImageUrl(slide);
    // Fix malformed data URLs (remove https: or http: prefix before data:)
    if (imageUrl && imageUrl.includes('data:image')) {
      imageUrl = imageUrl.replace(/^https?:/, '');
    }
    return imageUrl;
  };

  if (loading) {
    return (
      <div className="hero-slider">
        <div className="slider-loading">
          <p>Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-slider">
      <div className="slider-window">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${offsetPercent}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.eventId || index}
              className="slide-card"
              style={{ backgroundImage: `url(${getImageUrl(slide)})` }}
            >
              <div className="slide-overlay">
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
                {slide.venue && (
                  <span className="slide-venue">📍 {slide.venue}</span>
                )}
                {slide.organizingDepartment && (
                  <span className="slide-department">
                    🏛️ {slide.organizingDepartment}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="arrow left-arrow" onClick={prevSlide} aria-label="Previous slide">
        &#10094;
      </button>
      <button className="arrow right-arrow" onClick={nextSlide} aria-label="Next slide">
        &#10095;
      </button>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === current ? 'active' : ''}`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
