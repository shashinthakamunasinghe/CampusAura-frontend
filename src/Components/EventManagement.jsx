import { useState, useEffect } from 'react';
import { MdCheckCircle, MdCancel, MdEdit, MdSearch } from 'react-icons/md';
import { fetchAdminEvents, approveEvent, rejectEvent } from '../api/api';
import '../Styles/EventManagement.css';

function EventManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from backend
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await fetchAdminEvents();
      setEvents(data);
      setError(null);
    } catch (err) {
      console.error('Error loading events:', err);
      setError('Failed to load events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.coordinatorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingCount = events.filter(event => event.status === 'PENDING').length;

  const handleApprove = async (id) => {
    try {
      await approveEvent(id);
      // Update local state
      setEvents(events.map(event => 
        event.eventId === id ? { ...event, status: 'APPROVED' } : event
      ));
    } catch (err) {
      console.error('Error approving event:', err);
      alert('Failed to approve event. Please try again.');
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectEvent(id);
      // Update local state
      setEvents(events.map(event => 
        event.eventId === id ? { ...event, status: 'REJECTED' } : event
      ));
    } catch (err) {
      console.error('Error rejecting event:', err);
      alert('Failed to reject event. Please try again.');
    }
  };

  const formatDate = (dateTimeString) => {
    if (!dateTimeString) return 'Date TBA';
    try {
      const date = new Date(dateTimeString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch (e) {
      return dateTimeString;
    }
  };

  if (loading) {
    return (
      <div className="event-management" style={{ 
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <p>Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="event-management" style={{ 
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="event-management" style={{ 
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'auto'
    }}>
      <div className="event-header">
        <h1 className="event-page-title">Event Management</h1>
        <div className="event-pending-badge">{pendingCount} Pending Approval</div>
      </div>

      <div className="event-search-section">
        <div className="event-search-wrapper">
          <MdSearch className="event-search-icon" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="event-search-input"
          />
        </div>
      </div>

      <div className="event-cards-container">
        {filteredEvents.map((event) => (
          <div key={event.eventId} className="event-single-card">
            <div className="event-left-section">
              <h3 className="event-card-title">{event.title}</h3>
              <p className="event-card-meta">by {event.coordinatorName} • {formatDate(event.dateTime)}</p>
            </div>

            <div className="event-right-section">
              <span className={`event-status-pill ${event.status.toLowerCase()}`}>{event.status}</span>

              {event.status === 'PENDING' && (
                <>
                  <button className="event-btn-approve" onClick={() => handleApprove(event.eventId)}>
                    <MdCheckCircle className="event-btn-icon" />
                    Approve
                  </button>
                  <button className="event-btn-reject" onClick={() => handleReject(event.eventId)}>
                    <MdCancel className="event-btn-icon" />
                    Reject
                  </button>
                </>
              )}

              <button className="event-edit-icon">
                <MdEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventManagement;
