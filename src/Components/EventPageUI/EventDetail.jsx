import { useParams, Link } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { AiOutlineHeart, AiOutlineShareAlt, AiOutlineSend } from "react-icons/ai";
import { useState } from "react";
import "./eventDetails.css";

// Default sponsor tiers
const DEFAULT_SPONSORS = [
  { tier: "Platinum", amount: "$10,000+", logo: "🏢" },
  { tier: "Gold", amount: "$5,000+", logo: "⭐" },
  { tier: "Silver", amount: "$1,000+", logo: "🎯" },
];

// Helper function to add sponsors to events if they don't have them
const enrichEventWithSponsors = (event) => {
  return {
    ...event,
    sponsors: event.sponsors && event.sponsors.length > 0 ? event.sponsors : DEFAULT_SPONSORS,
  };
};

const eventsData = [
  {
    id: 1,
    title: "Tech Innovation Summit 2025",
    date: "March 15, 2025 | 9.00 AM",
    location: "Main Campus Auditorium",
    category: "Technology",
    attending: 320,
    image: "https://via.placeholder.com/900x400",
    ticketsAvailable: true,
    description:
      "Experience an inspiring day of innovation and technology. Learn from industry leaders, explore new trends, and connect with professionals.",
    schedule: [
      { time: "9:00 AM", event: "Registration & Welcome" },
      { time: "10:00 AM", event: "Keynote: Future of Tech" },
      { time: "11:30 AM", event: "Panel Discussion" },
      { time: "1:00 PM", event: "Lunch Break" },
    ],
    gallery: [
      "https://via.placeholder.com/300x200",
      "https://via.placeholder.com/300x200",
      "https://via.placeholder.com/300x200",
      "https://via.placeholder.com/300x200",
    ],
     
  },
  {
    id: 2,
    title: "Spring Career Fair",
    date: "March 20, 2025 | 10.00 AM",
    location: "Student Center",
    category: "Career",
    attending: 320,
    image: "https://via.placeholder.com/900x400",
    ticketsAvailable: true,
    description:
      "Meet top employers, explore job opportunities, and prepare for your future career.",
    schedule: [
      { time: "10:00 AM", event: "Fair Opens" },
      { time: "11:00 AM", event: "Company Presentations" },
      { time: "2:00 PM", event: "Networking Session" },
    ],
    gallery: [
      "https://via.placeholder.com/300x200",
      "https://via.placeholder.com/300x200",
    ],
    
  },
  {
    id: 3,
    title: "Cultural Festival Night",
    date: "March 28, 2025 | 6.00 PM",
    location: "Open Grounds",
    category: "Culture",
    attending: 320,
    image: "https://via.placeholder.com/900x400",
    ticketsAvailable: false,
    description:
      "Enjoy music, dance, food, and performances celebrating diverse cultures.",
    schedule: [
      { time: "6:00 PM", event: "Opening Ceremony" },
      { time: "7:00 PM", event: "Cultural Performances" },
      { time: "9:00 PM", event: "Food & Music" },
    ],
    gallery: [
      "https://via.placeholder.com/300x200",
      "https://via.placeholder.com/300x200",
      "https://via.placeholder.com/300x200",
    ],
     
  },
  {
    id: 4,
    title: "Tech Innovation Summit 2025",
    date: "March 15, 2025 | 9.00 AM",
    location: "Main Campus Auditorium",
    category: "Technology",
    attending: 320,
    image: "https://via.placeholder.com/900x400",
    ticketsAvailable: true,
    description:
      "Experience an inspiring day of innovation and technology. Learn from industry leaders, explore new trends, and connect with professionals.",
    schedule: [
      { time: "9:00 AM", event: "Registration & Welcome" },
      { time: "10:00 AM", event: "Keynote: Future of Tech" },
      { time: "11:30 AM", event: "Panel Discussion" },
      { time: "1:00 PM", event: "Lunch Break" },
    ],
    gallery: [
      "https://via.placeholder.com/300x200",
      "https://via.placeholder.com/300x200",
      "https://via.placeholder.com/300x200",
      "https://via.placeholder.com/300x200",
    ],
     
  },
  {
    id: 5,
    title: "Spring Career Fair",
    date: "March 20, 2025 | 10.00 AM",
    location: "Student Center",
    category: "Career",
    attending: 320,
    image: "https://via.placeholder.com/900x400",
    ticketsAvailable: true,
    description:
      "Meet top employers, explore job opportunities, and prepare for your future career.",
    schedule: [
      { time: "10:00 AM", event: "Fair Opens" },
      { time: "11:00 AM", event: "Company Presentations" },
      { time: "2:00 PM", event: "Networking Session" },
    ],
    gallery: [
      "https://via.placeholder.com/300x200",
      "https://via.placeholder.com/300x200",
    ],
     
  },
  {
    id: 6,
    title: "Cultural Festival Night",
    date: "March 28, 2025 | 6.00 PM",
    location: "Open Grounds",
    category: "Culture",
    attending: 320,
    image: "https://via.placeholder.com/900x400",
    ticketsAvailable: true,
    description:
      "Enjoy music, dance, food, and performances celebrating diverse cultures.",
    schedule: [
      { time: "6:00 PM", event: "Opening Ceremony" },
      { time: "7:00 PM", event: "Cultural Performances" },
      { time: "9:00 PM", event: "Food & Music" },
    ],
    gallery: [
      "https://via.placeholder.com/300x200",
      "https://via.placeholder.com/300x200",
      "https://via.placeholder.com/300x200",
    ],
     
  },
];

export default function EventDetails() {
  const { id } = useParams();
  let event = eventsData.find((e) => e.id === parseInt(id));
  
  // Automatically enrich event with default sponsors if not provided
  if (event) {
    event = enrichEventWithSponsors(event);
  }
  
  const [tickets, setTickets] = useState(1);
  const [feedback, setFeedback] = useState("");
  const [comments, setComments] = useState([
    { id: 1, name: "Sarah Smith", text: "Great event! Looking forward to it.", time: "2 hours ago" },
    { id: 2, name: "John Doe", text: "Can't wait for the keynote speech.", time: "1 hour ago" },
  ]);
  const totalSpots = 500;
  const availableSpots = 180;

  if (!event) return <h2>Event not found</h2>;

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

  return (
    <>
      <Link to="/events" className="back-link">
        ← Back to Events
      </Link>

      <div className="event-details-wrapper">
        {/* LEFT SIDE - Image & Details (75%) */}
        <div className="event-details-left">
          <img src={event.image} alt={event.title} className="details-banner" />

          <h1>{event.title}</h1>

          {/* Event Meta Info */}
          <div className="event-meta">
            <div className="meta-item">
              <CiCalendar className="meta-icon" />
              <div>
                <span className="meta-label">Date & Time</span>
                <p className="meta-value">{event.date}</p>
              </div>
            </div>

            <div className="meta-item">
              <IoLocationOutline className="meta-icon" />
              <div>
                <span className="meta-label">Location</span>
                <p className="meta-value">{event.location}</p>
              </div>
            </div>

            <div className="meta-item">
              <BsPeople className="meta-icon" />
              <div>
                <span className="meta-label">Attendees</span>
                <p className="meta-value">{event.attending} going</p>
              </div>
            </div>
          </div>

          <h3>About This Event</h3>
          <p className="details-description">{event.description}</p>

          <div className="event-tags">
            <span className="tag">Networking</span>
            <span className="tag">Learning</span>
            <span className="tag">Technology</span>
            <span className="tag">Career</span>
          </div>

          {/* Schedule Section */}
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

          {/* Past Event Gallery */}
          <section className="section-block">
            <h3>Event Gallery</h3>
            <div className="gallery-grid">
              {event.gallery.map((image, idx) => (
                <img key={idx} src={image} alt={`Gallery ${idx + 1}`} className="gallery-image" />
              ))}
            </div>
          </section>

          {/* Sponsorship Panel */}
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
              <div className="organizer-avatar">C</div>
              <div>
                <p className="organizer-name">Campus Tech Club</p>
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
