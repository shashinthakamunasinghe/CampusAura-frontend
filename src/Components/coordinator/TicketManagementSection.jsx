import { useState } from 'react';
import './TicketManagementSection.css';

function TicketManagementSection() {
  const [ticketData, setTicketData] = useState({
    generalAmount: '',
    vipAmount: '',
    vvipAmount: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!ticketData.generalAmount || !ticketData.vipAmount || !ticketData.vvipAmount) {
      alert('Please fill in all ticket amounts');
      return;
    }
    alert('Ticket amounts saved successfully!');
    console.log('Ticket Data:', ticketData);
  };

  const handleCancel = () => {
    setTicketData({
      generalAmount: '',
      vipAmount: '',
      vvipAmount: ''
    });
  };

  return (
    <div className="ticket-management-container">
      <div className="ticket-header">
        <h1 className="ticket-title">Event Dashboard</h1>
        <p className="ticket-subtitle">Tech Innovation Summit 2024</p>
      </div>

      <div className="ticket-content">
        <h2 className="ticket-section-title">Ticket Management</h2>

        <div className="ticket-form-card">
          <div className="ticket-form-group">
            <label className="ticket-label">General Ticket Amount</label>
            <input
              type="number"
              name="generalAmount"
              value={ticketData.generalAmount}
              onChange={handleInputChange}
              className="ticket-input"
              placeholder="Enter general ticket amount"
              min="0"
            />
          </div>

          <div className="ticket-form-group">
            <label className="ticket-label">VIP Ticket Amount</label>
            <input
              type="number"
              name="vipAmount"
              value={ticketData.vipAmount}
              onChange={handleInputChange}
              className="ticket-input"
              placeholder="Enter VIP ticket amount"
              min="0"
            />
          </div>

          <div className="ticket-form-group">
            <label className="ticket-label">VVIP Ticket Amount</label>
            <input
              type="number"
              name="vvipAmount"
              value={ticketData.vvipAmount}
              onChange={handleInputChange}
              className="ticket-input"
              placeholder="Enter VVIP ticket amount"
              min="0"
            />
          </div>

          <div className="ticket-button-group">
            <button className="ticket-cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button className="ticket-ok-btn" onClick={handleSubmit}>
              OK
            </button>
          </div>
        </div>

        {/* Attendee List Section */}
        <div className="attendee-section">
          <h3 className="attendee-title">Attendee List</h3>
          <p className="attendee-description">
            Export complete attendee list with contact information and ticket types.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TicketManagementSection;
