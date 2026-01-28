import "./eventPage.css";
import { CiCalendar } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <div className="event-card">
      <img src={event.image} alt={event.title} />

      <div className="event-card-body">
        <span className="event-tag">{event.category}</span>
        <h3>{event.title}</h3>
        
        <div className="card-icons"> 
        <p className="event-date"><CiCalendar /> {event.date}</p>
        <p className="event-location"><IoLocationOutline /> {event.location}</p>
        <p className="event-attendees"><BsPeople /> {event.attending} attending</p>
        </div>

        <Link to={`/events/${event.id}`} className="details-link"> 
        <button className="details-btn">View Details</button>
        </Link>
      </div>
    </div>
  );
}
