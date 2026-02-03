import { useState, useEffect } from "react";
import EventFilter from "./EventFilter";
import EventsGrid from "./EventGrid";
import { fetchPublicEvents } from "../../api/api";

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("upcoming");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from API when category or sort changes
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPublicEvents(selectedCategory, sort);
        setEvents(data);
      } catch (err) {
        console.error('Failed to load events:', err);
        setError('Failed to load events. Please try again later.');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [selectedCategory, sort]);

  // 🔍 Filter Logic - only filter by search, API handles category and sort
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <EventFilter
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sort={sort}
        setSort={setSort}
      />

      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading events...</p>
        </div>
      )}

      {error && (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && filteredEvents.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No events found.</p>
        </div>
      )}

      {!loading && !error && filteredEvents.length > 0 && (
        <EventsGrid events={filteredEvents} />
      )}
    </>
  );
}
