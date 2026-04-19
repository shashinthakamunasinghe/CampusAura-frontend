import { useState } from 'react';
import { MdClose, MdMessage } from 'react-icons/md';
import './CommunityFeedbackSection.css';

function CommunityFeedbackSection() {
  const [comments, setComments] = useState([
    {
      id: 1,
      name: 'Alice Brown',
      timeAgo: '5 mins ago',
      text: 'Really excited for this event! Will there be recordings available?'
    },
    {
      id: 2,
      name: 'Bob Smith',
      timeAgo: '1 hour ago',
      text: 'Can I bring a guest with my VIP ticket?'
    },
    {
      id: 3,
      name: 'Carol White',
      timeAgo: '2 hours ago',
      text: 'Looking forward to the networking opportunities!'
    }
  ]);

  const handleDelete = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  return (
    <div className="community-feedback-container">
      <div className="community-header">
        <h1 className="community-title">Event Dashboard</h1>
        <p className="community-subtitle">Tech Innovation Summit 2024</p>
      </div>

      <div className="community-content">
        <h2 className="community-section-title">Community & Feedback</h2>

        {/* Recent Comments Section */}
        <div className="recent-comments">
          <div className="comments-header">
            <h3 className="comments-title">Recent Comments</h3>
            <p className="comments-subtitle">Moderate community discussions</p>
          </div>

          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <h4 className="comment-name">{comment.name}</h4>
                </div>
                <p className="comment-time">{comment.timeAgo}</p>
                <p className="comment-text">{comment.text}</p>
                <div className="comment-actions">
                  <button 
                    className="comment-delete-btn"
                    onClick={() => handleDelete(comment.id)}
                  >
                    <MdClose />
                    Delete
                  </button>
                  <button className="comment-respond-btn">
                    <MdMessage />
                    Respond
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityFeedbackSection;
