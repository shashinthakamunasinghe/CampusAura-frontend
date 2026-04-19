import { useParams, Link } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { AiOutlineHeart, AiOutlineShareAlt, AiOutlineSend } from "react-icons/ai";
import { useState, useEffect } from "react";
import { fetchEventById } from "../../services/api";
import "./EventDetails.css";

// Format date from API to match design
const formatEventDate = (isoDate) => {
  if (!isoDate) return 'Date TBA';
  
  const date = new Date(isoDate);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  
  return date.toLocaleDateString('en-US', options).replace(',', ' |');
};

// Clean and validate image URL
const getValidImageUrl = (urls) => {
  if (!urls || urls.length === 0) return null;
  
  let imageUrl = urls[0];
  
  // Fix malformed data URI (e.g., "https:data:image/jpeg;base64,...")
  if (imageUrl && imageUrl.startsWith('https:data:')) {
    imageUrl = imageUrl.replace('https:', '');
  }
  
  // Check if it's example.com (fake URL)
  if (imageUrl && imageUrl.includes('example.com')) {
    return null;
  }
  
  // Validate it's a real URL or data URI
  if (imageUrl && (imageUrl.startsWith('http') || imageUrl.startsWith('data:'))) {
    return imageUrl;
  }
  
  return null;
};

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tickets, setTickets] = useState(1);
  const [feedback, setFeedback] = useState("");
  const [comments, setComments] = useState([
    { id: 1, name: "Sarah Smith", text: "Great event! Looking forward to it.", time: "2 hours ago" },
    { id: 2, name: "John Doe", text: "Can't wait for the keynote speech.", time: "1 hour ago" },
  ]);

  useEffect(() => {
    const loadEventDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching event details for ID:', id);
        const data = await fetchEventById(id);
        console.log('Received event data:', data);
        setEvent(data);
      } catch (err) {
        console.error('Failed to load event details:', err);
        setError('Failed to load event details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadEventDetails();
    }
  }, [id]);

  const handleAddComment = () => {
    if (feedback.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          name: "You",
          text: feedback,
          time: "just now",
        },
      ]);
      setFeedback("");
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <p>Loading event details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: 'red' }}>
        <p>{error}</p>
        <Link to="/events" className="back-link">← Back to Events</Link>
      </div>
    );
  }

  if (!event) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>Event not found</h2>
        <Link to="/events" className="back-link">← Back to Events</Link>
      </div>
    );
  }

  const imageUrl = getValidImageUrl(event.eventImageUrls);
  const totalSpots = event.totalSpots || 500;
  const availableSpots = event.availableSpots || 180;

  return (
    <>
      <Link to="/events" className="back-link">
        ← Back to Events
      </Link>

      <div className="event-details-wrapper">
        {/* LEFT SIDE - Image & Details (75%) */}
        <div className="event-details-left">
          {imageUrl ? (
            <img src={imageUrl} alt={event.title} className="details-banner" />
          ) : (
            <div className="details-banner-placeholder">
              <span>No Image Available</span>
            </div>
          )}

          <h1>{event.title}</h1>

          {/* Event Meta Info */}
          <div className="event-meta">
            <div className="meta-item">
              <CiCalendar className="meta-icon" />
              <div>
                <span className="meta-label">Date & Time</span>
                <p className="meta-value">{formatEventDate(event.dateTime)}</p>
              </div>
            </div>

            <div className="meta-item">
              <IoLocationOutline className="meta-icon" />
              <div>
                <span className="meta-label">Location</span>
                <p className="meta-value">{event.venue}</p>
              </div>
            </div>

            <div className="meta-item">
              <BsPeople className="meta-icon" />
              <div>
                <span className="meta-label">Attendees</span>
                <p className="meta-value">{event.attendeeCount || 0} going</p>
              </div>
            </div>
          </div>

          <h3>About This Event</h3>
          <p className="details-description">{event.description}</p>

          {event.category && (
            <div className="event-tags">
              <span className="tag">{event.category}</span>
              {event.organizingDepartment && (
                <span className="tag">{event.organizingDepartment}</span>
              )}
            </div>
          )}

          {/* Schedule Section */}
          {event.schedule && event.schedule.length > 0 && (
            <section className="section-block">
              <h3>Event Schedule</h3>
              <div className="schedule-list">
                {event.schedule.map((item, idx) => (
                  <div key={idx} className="schedule-item">
                    <div className="schedule-time">{item.time}</div>
                    <div className="schedule-event">{item.event}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Past Event Gallery */}
          {event.galleryImages && event.galleryImages.length > 0 && (
            <section className="section-block">
              <h3>Event Gallery</h3>
              <div className="gallery-grid">
                {event.galleryImages.map((image, idx) => (
                  <img key={idx} src={image} alt={`Gallery ${idx + 1}`} className="gallery-image" />
                ))}
              </div>
            </section>
          )}

          {/* Sponsorship Panel */}
          {event.sponsors && event.sponsors.length > 0 && (
            <section className="section-block">
              <h3>Our Sponsors</h3>
              <div className="sponsors-grid">
                {event.sponsors.map((sponsor, idx) => (
                  <div key={idx} className="sponsor-card">
                    <div className="sponsor-logo">{sponsor.logo}</div>
                    <div className="sponsor-tier">{sponsor.tier}</div>
                    <div className="sponsor-amount">{sponsor.amount}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Community & Feedback Section */}
          <section className="section-block">
            <h3>Community Feedback</h3>
            
            {/* Feedback Form */}
            <div className="feedback-form">
              <input
                type="text"
                placeholder="Share your thoughts about this event..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="feedback-input"
              />
              <button onClick={handleAddComment} className="feedback-btn">
                <AiOutlineSend /> Post
              </button>
            </div>

            {/* Comments List */}
            <div className="comments-section">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-avatar">{comment.name.charAt(0)}</div>
                  <div className="comment-content">
                    <div className="comment-header">
                      <span className="comment-name">{comment.name}</span>
                      <span className="comment-time">{comment.time}</span>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Organizer Card */}
          <div className="organizer-card">
            <h4 className="organizer-title">Organized by</h4>
            <div className="organizer-info">
              <div className="organizer-avatar">
                {event.organizingDepartment ? event.organizingDepartment.charAt(0) : 'C'}
              </div>
              <div>
                <p className="organizer-name">{event.organizingDepartment || 'Campus Organization'}</p>
                <p className="organizer-type">Campus Organization</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Ticket Booking (25%) */}
        <div className="event-ticket-panel">
          {/* Spots Available */}
          <div className="spots-section">
            <div className="spots-header">
              <span className="spots-label">Spots Available</span>
              <span className="spots-count">{availableSpots}/{totalSpots}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(availableSpots / totalSpots) * 100}%` }}></div>
            </div>
          </div>

          {/* Number of Tickets - Only if available */}
          {event.ticketsAvailable ? (
            <>
              <div className="tickets-section">
                <label className="tickets-label">Number of Tickets</label>
                <div className="ticket-controls">
                  <button 
                    className="ticket-btn" 
                    onClick={() => setTickets(Math.max(1, tickets - 1))}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    className="ticket-input" 
                    value={tickets} 
                    onChange={(e) => setTickets(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                  />
                  <button 
                    className="ticket-btn" 
                    onClick={() => setTickets(tickets + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Reserve Button */}
              <button className="reserve-btn">Reserve Tickets</button>
            </>
          ) : (
            <div className="sold-out-message">
              <p>Tickets Sold Out</p>
            </div>
          )}

          {/* Save and Share */}
          <div className="action-buttons">
            <button className="action-btn">
              <AiOutlineHeart /> Save
            </button>
            <button className="action-btn">
              <AiOutlineShareAlt /> Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
