import EventCard from "./EventCard";
import "./eventPage.css";

export default function EventsGrid({ events }) {
  return (
  
    <div className="events-grid">
      {events.map((event) => (
        <EventCard key={event.eventId} event={event} />
      ))}
    </div>
  
  );
}
