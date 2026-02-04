import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLatestEvents } from "../../api/api";
import "../../Styles/LatestEvents.css";

export default function LatestEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLatestEvents = async () => {
      try {
        setLoading(true);
        const data = await fetchLatestEvents();
        console.log('Events loaded:', data); // Debug log
        setEvents(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch latest events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadLatestEvents();
  }, []);

  const formatDate = (dateTime) => {
    if (!dateTime) return "";
    const date = new Date(dateTime);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getEventImage = (event) => {
    // Use the first image from eventImageUrls array, or a fallback
    if (event.eventImageUrls && event.eventImageUrls.length > 0) {
      let imageUrl = event.eventImageUrls[0];
      // Fix malformed data URLs (remove https: or http: prefix before data:)
      if (imageUrl && imageUrl.includes('data:image')) {
        imageUrl = imageUrl.replace(/^https?:/, '');
      }
      return imageUrl;
    }
    return "/images/event-placeholder.jpg"; // Fallback image
  };

  const handleImageError = (e) => {
    e.target.src = "/images/event-placeholder.jpg";
  };

  if (loading) {
    return (
      <section className="latest-events">
        <div className="events-header">
          <h2>Latest Events</h2>
        </div>
        <div className="events-loading">Loading events...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="latest-events">
        <div className="events-header">
          <h2>Latest Events</h2>
        </div>
        <div className="events-error">{error}</div>
      </section>
    );
  }

  return (
    <section className="latest-events">
      <div className="events-header">
        <h2>Latest Events</h2>
        <button
          className="view-all-btn"
          onClick={() => navigate("/events")}
        >
          View All Events
        </button>
      </div>

      <div className="events-container">
        {events.length === 0 ? (
          <div className="no-events">No events available at the moment.</div>
        ) : (
          events.map((event) => (
            <div className="event-card" key={event.eventId}>
              <img 
                src={getEventImage(event)} 
                alt={event.title} 
                onError={handleImageError}
              />
              <div className="event-content">
                <h3>{event.title}</h3>
                <p>{formatDate(event.dateTime)}</p>
                <button
                  className="view-btn"
                  onClick={() => navigate(`/events/${event.eventId}`)}
                >
                  View Event
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}