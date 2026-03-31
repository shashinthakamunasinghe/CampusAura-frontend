import EventCard from "./EventCard";
import "./EventPage.css";

export default function EventsGrid({ events }) {
  return (
  
    <div className="events-grid">
      {events.map((event) => (
        <EventCard key={event.eventId} event={event} />
      ))}
    </div>
  
  );
}
