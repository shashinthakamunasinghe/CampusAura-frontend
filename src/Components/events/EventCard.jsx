import "./EventPage.css";
import { CiCalendar } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { Link } from "react-router-dom";

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

export default function EventCard({ event }) {
  const imageUrl = getValidImageUrl(event.eventImageUrls);

  // Add error handler for image loading
  const handleImageError = (e) => {
    console.error('Failed to load image:', imageUrl);
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };

  return (
    <div className="event-card">
      {imageUrl ? (
        <>
          <img 
            src={imageUrl} 
            alt={event.title}
            onError={handleImageError}
          />
          <div className="event-card-placeholder" style={{ display: 'none' }}>
            <span>No Image</span>
          </div>
        </>
      ) : (
        <div className="event-card-placeholder">
          <span>No Image</span>
        </div>
      )}

      <div className="event-card-body">
        <span className="event-tag">{event.category || 'General'}</span>
        <h3>{event.title}</h3>
        
        <div className="card-icons"> 
        <p className="event-date"><CiCalendar /> {formatEventDate(event.dateTime)}</p>
        <p className="event-location"><IoLocationOutline /> {event.venue}</p>
        <p className="event-attendees"><BsPeople /> {event.attendeeCount || 0} attending</p>
        </div>

        <Link to={`/events/${event.eventId}`} className="details-link"> 
        <button className="details-btn">View Details</button>
        </Link>
      </div>
    </div>
  );
}
