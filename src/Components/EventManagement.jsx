import { useState } from 'react';
import { MdCheckCircle, MdCancel, MdEdit, MdSearch } from 'react-icons/md';
import '../Styles/EventManagement.css';

function EventManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState([
    { id: 1, title: 'Tech Innovation Summit 2024', coordinator: 'Sarah Johnson', date: 'Jun 15, 2024', status: 'Pending' },
    { id: 2, title: 'Campus Music Festival', coordinator: 'Michael Chen', date: 'Jun 20, 2024', status: 'Approved' },
    { id: 3, title: 'Career Fair Spring 2024', coordinator: 'Emma Davis', date: 'Jun 25, 2024', status: 'Approved' },
    { id: 4, title: 'Cultural Diversity Week', coordinator: 'James Wilson', date: 'Jul 1, 2024', status: 'Pending' },
    { id: 5, title: 'Startup Pitch Competition', coordinator: 'Alex Thompson', date: 'Jul 8, 2024', status: 'Pending' },
    { id: 6, title: 'Annual Sports Day 2024', coordinator: 'David Martinez', date: 'Jul 12, 2024', status: 'Approved' },
    { id: 7, title: 'Photography Exhibition', coordinator: 'Lisa Anderson', date: 'Jul 18, 2024', status: 'Pending' },
    { id: 8, title: 'Coding Hackathon Marathon', coordinator: 'Robert Lee', date: 'Jul 22, 2024', status: 'Approved' },
    { id: 9, title: 'Environmental Awareness Campaign', coordinator: 'Jennifer Garcia', date: 'Jul 25, 2024', status: 'Pending' },
    { id: 10, title: 'Theater Arts Performance', coordinator: 'William Brown', date: 'Aug 1, 2024', status: 'Approved' },
    { id: 11, title: 'Student Leadership Summit', coordinator: 'Amanda White', date: 'Aug 5, 2024', status: 'Pending' },
    { id: 12, title: 'Science & Innovation Expo', coordinator: 'Christopher Davis', date: 'Aug 10, 2024', status: 'Approved' },
    { id: 13, title: 'International Food Festival', coordinator: 'Maria Rodriguez', date: 'Aug 15, 2024', status: 'Pending' },
    { id: 14, title: 'Mental Health Awareness Week', coordinator: 'Daniel Kim', date: 'Aug 20, 2024', status: 'Approved' },
    { id: 15, title: 'Alumni Networking Event', coordinator: 'Patricia Taylor', date: 'Aug 25, 2024', status: 'Pending' }
  ]);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.coordinator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingCount = events.filter(event => event.status === 'Pending').length;

  const handleApprove = (id) => {
    setEvents(events.map(event => event.id === id ? { ...event, status: 'Approved' } : event));
  };

  const handleReject = (id) => {
    setEvents(events.map(event => event.id === id ? { ...event, status: 'Rejected' } : event));
  };

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
          <div key={event.id} className="event-single-card">
            <div className="event-left-section">
              <h3 className="event-card-title">{event.title}</h3>
              <p className="event-card-meta">by {event.coordinator} • {event.date}</p>
            </div>

            <div className="event-right-section">
              <span className={`event-status-pill ${event.status.toLowerCase()}`}>{event.status}</span>

              {event.status === 'Pending' && (
                <>
                  <button className="event-btn-approve" onClick={() => handleApprove(event.id)}>
                    <MdCheckCircle className="event-btn-icon" />
                    Approve
                  </button>
                  <button className="event-btn-reject" onClick={() => handleReject(event.id)}>
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
