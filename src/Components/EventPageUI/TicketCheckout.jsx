import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { jsPDF } from 'jspdf';
import { createTicketPaymentIntent, confirmTicketPurchase } from '../../api/api';
import { useAuth } from '../../Context/AuthContext';
import '../../Styles/Checkout.css';

// Use placeholder - user will provide their own key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_PLACEHOLDER');

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#0f172a',
      fontFamily: "'Inter', system-ui, sans-serif",
      '::placeholder': { color: '#94a3b8' },
    },
    invalid: { color: '#dc2626' },
  },
};

function generateTicketReceipt(ticketData) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFillColor(10, 93, 184);
  doc.rect(0, 0, pageWidth, 45, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('CampusAura', pageWidth / 2, 22, { align: 'center' });
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Event Ticket Receipt', pageWidth / 2, 35, { align: 'center' });

  // Body
  doc.setTextColor(15, 23, 42);
  let y = 65;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Event Name:', 20, y);
  doc.setFont('helvetica', 'normal');
  doc.text(ticketData.eventTitle || 'N/A', 80, y);
  y += 12;

  doc.setFont('helvetica', 'bold');
  doc.text('Ticket Type:', 20, y);
  doc.setFont('helvetica', 'normal');
  doc.text(ticketData.ticketCategory || 'N/A', 80, y);
  y += 12;

  doc.setFont('helvetica', 'bold');
  doc.text('Quantity:', 20, y);
  doc.setFont('helvetica', 'normal');
  doc.text(String(ticketData.ticketCount || 0), 80, y);
  y += 12;

  doc.setFont('helvetica', 'bold');
  doc.text('Price/Ticket:', 20, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`LKR ${(ticketData.pricePerTicket || 0).toLocaleString()}`, 80, y);
  y += 12;

  // Total
  doc.setDrawColor(10, 93, 184);
  doc.line(20, y, pageWidth - 20, y);
  y += 10;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Total Amount:', 20, y);
  doc.setTextColor(10, 93, 184);
  doc.text(`LKR ${(ticketData.totalAmount || 0).toLocaleString()}`, 80, y);
  y += 18;

  // Payment info
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Payment ID: ${ticketData.stripePaymentId || 'N/A'}`, 20, y);
  y += 8;
  doc.text(`Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' })}`, 20, y);

  // Footer
  doc.setFillColor(245, 247, 250);
  doc.rect(0, 260, pageWidth, 30, 'F');
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(9);
  doc.text('Thank you for your purchase! Present this receipt at the event.', pageWidth / 2, 275, { align: 'center' });

  doc.save(`CampusAura_Ticket_${ticketData.eventTitle?.replace(/\s+/g, '_') || 'Receipt'}.pdf`);
}

function CheckoutForm({ ticketInfo }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      // 1. Create payment intent on backend
      const { clientSecret, paymentIntentId } = await createTicketPaymentIntent({
        eventId: ticketInfo.event.eventId,
        eventTitle: ticketInfo.event.title,
        amount: ticketInfo.totalAmount,
      });

      // 2. Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: userData?.name || 'CampusAura User',
            email: userData?.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setProcessing(false);
        return;
      }

      if (result.paymentIntent.status === 'succeeded') {
        // 3. Save sale record
        const saleData = {
          eventId: ticketInfo.event.eventId,
          eventTitle: ticketInfo.event.title,
          ticketCategory: ticketInfo.ticketCategory,
          ticketCount: ticketInfo.ticketCount,
          pricePerTicket: ticketInfo.ticketPrice,
          totalAmount: ticketInfo.totalAmount,
          stripePaymentId: paymentIntentId,
        };

        await confirmTicketPurchase(saleData);

        // 4. Generate PDF receipt
        generateTicketReceipt(saleData);

        setSuccess(true);
      }
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
    }

    setProcessing(false);
  };

  if (success) {
    return (
      <div className="checkout-success">
        <div className="success-icon">✓</div>
        <h2>Payment Successful!</h2>
        <p>Your ticket receipt has been downloaded as a PDF.</p>
        <div className="success-details">
          <p><strong>Event:</strong> {ticketInfo.event.title}</p>
          <p><strong>Tickets:</strong> {ticketInfo.ticketCount} × {ticketInfo.ticketCategory}</p>
          <p><strong>Total:</strong> LKR {ticketInfo.totalAmount.toLocaleString()}</p>
        </div>
        <Link to="/events" className="checkout-back-btn">Back to Events</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="checkout-summary">
        <h3>Order Summary</h3>
        <div className="summary-row">
          <span>Event</span>
          <span>{ticketInfo.event.title}</span>
        </div>
        <div className="summary-row">
          <span>Ticket Type</span>
          <span>{ticketInfo.ticketCategory}</span>
        </div>
        <div className="summary-row">
          <span>{ticketInfo.ticketCategory} × {ticketInfo.ticketCount}</span>
          <span>LKR {ticketInfo.totalAmount.toLocaleString()}</span>
        </div>
        <div className="summary-total">
          <span>Total</span>
          <span>LKR {ticketInfo.totalAmount.toLocaleString()}</span>
        </div>
      </div>

      <div className="card-element-wrapper">
        <label>Card Details</label>
        <div className="card-element-container">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {error && <div className="checkout-error">{error}</div>}

      <button type="submit" disabled={!stripe || processing} className="pay-btn">
        {processing ? 'Processing...' : `Pay LKR ${ticketInfo.totalAmount.toLocaleString()}`}
      </button>
    </form>
  );
}

export default function TicketCheckout() {
  const location = useLocation();
  const navigate = useNavigate();
  const ticketInfo = location.state;

  if (!ticketInfo) {
    return (
      <div className="checkout-container">
        <div className="checkout-empty">
          <h2>No ticket information</h2>
          <p>Please select tickets from the event page first.</p>
          <Link to="/events" className="checkout-back-btn">Browse Events</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <Link to={`/events/${ticketInfo.event.eventId}`} className="back-link">
        ← Back to Event
      </Link>
      <h1 className="checkout-title">Complete Your Purchase</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm ticketInfo={ticketInfo} />
      </Elements>
    </div>
  );
}
