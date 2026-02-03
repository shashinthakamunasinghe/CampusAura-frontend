import { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../Styles/AdminDashboard.css';
import { MdEvent, MdPeople, MdHowToReg, MdShoppingBag, MdShoppingCart, MdPerson } from 'react-icons/md';
import { fetchDashboardStats } from '../api/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const [lineChartPeriod, setLineChartPeriod] = useState("This week");
  const [barChartPeriod, setBarChartPeriod] = useState("This week");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data on component mount
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const data = await fetchDashboardStats();
        setDashboardData(data);
        setError(null);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const lineChartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Current week',
        data: [3000, 7000, 8500, 2000, 1500, 4000, 5500],
        borderColor: '#0284c7',
        backgroundColor: 'rgba(2, 132, 199, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 2,
      },
      {
        label: 'Previous week',
        data: [2500, 4000, 6000, 8000, 6500, 3500, 2000],
        borderColor: '#94a3b8',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  const barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Orders',
        data: [25, 45, 80, 75, 60, 35, 90],
        backgroundColor: '#0284c7',
        borderWidth: 0,
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          padding: 15,
          font: {
            size: 12,
            weight: '500',
            family: 'inherit'
          },
          usePointStyle: true,
          pointStyle: 'circle',
          color: '#64748b'
        }
      },
      tooltip: {
        backgroundColor: '#0f172a',
        padding: 12,
        borderRadius: 8,
        titleFont: {
          size: 13,
          weight: '600'
        },
        bodyFont: {
          size: 12
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f1f5f9',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 11,
            weight: '500'
          },
          color: '#64748b'
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          font: {
            size: 11,
            weight: '500'
          },
          color: '#64748b'
        }
      }
    }
  };

  // Helper function to format percentage change
  const formatPercentageChange = (value) => {
    if (!value) return null;
    const sign = value >= 0 ? '↑' : '↓';
    return `${sign} ${Math.abs(value)}%`;
  };

  // Helper function to get change class
  const getChangeClass = (value) => {
    if (!value) return '';
    if (value === 0) return 'neutral';
    return value > 0 ? 'positive' : 'negative';
  };

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Overview</h1>

      {loading && <div className="loading-message">Loading dashboard data...</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <MdEvent className="stat-icon" />
          </div>
          <div className="stat-header">TOTAL EVENTS</div>
          <div className="stat-value">{dashboardData?.totalEvents || 0}</div>
          <div className={`stat-change ${getChangeClass(dashboardData?.eventsChangePercent)}`}>
            {formatPercentageChange(dashboardData?.eventsChangePercent) || '—'}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <MdPeople className="stat-icon" />
          </div>
          <div className="stat-header">ACTIVE USERS</div>
          <div className="stat-value">{dashboardData?.activeUsers?.toLocaleString() || 0}</div>
          <div className={`stat-change ${getChangeClass(dashboardData?.usersChangePercent)}`}>
            {formatPercentageChange(dashboardData?.usersChangePercent) || '—'}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <MdShoppingBag className="stat-icon" />
          </div>
          <div className="stat-header">TOTAL PRODUCTS</div>
          <div className="stat-value">{dashboardData?.totalProducts || 0}</div>
          <div className={`stat-change ${getChangeClass(dashboardData?.productsChangePercent)}`}>
            {formatPercentageChange(dashboardData?.productsChangePercent) || '—'}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <MdShoppingCart className="stat-icon" />
          </div>
          <div className="stat-header">PRODUCTS SOLD</div>
          <div className="stat-value">{dashboardData?.productsSold || 0}</div>
          <div className={`stat-change ${getChangeClass(dashboardData?.salesChangePercent)}`}>
            {formatPercentageChange(dashboardData?.salesChangePercent) || 'New'}
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <div className="chart-header">
            <div>
              <h3>Event Registrations</h3>
              <a href="#" className="view-more">More charts</a>
            </div>
            <select 
              value={lineChartPeriod} 
              onChange={(e) => setLineChartPeriod(e.target.value)}
              className="chart-select"
            >
              <option>This week</option>
              <option>This month</option>
              <option>This year</option>
            </select>
          </div>
          <div className="chart-wrapper">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <div>
              <h3>Product Orders</h3>
              <a href="#" className="view-more">More charts</a>
            </div>
            <select 
              value={barChartPeriod} 
              onChange={(e) => setBarChartPeriod(e.target.value)}
              className="chart-select"
            >
              <option>This week</option>
              <option>This month</option>
              <option>This year</option>
            </select>
          </div>
          <div className="chart-wrapper">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="bottom-card">
          <div className="card-header">
            <h3>Recent Events</h3>
            <a href="#" className="view-link">All events</a>
          </div>
          {dashboardData?.recentEvents && dashboardData.recentEvents.length > 0 ? (
            dashboardData.recentEvents.map((event, index) => (
              <div key={index} className="event-item">
                <div className="event-info">
                  <div className="event-name">{event.title || event.name || 'Untitled Event'}</div>
                  <div className="event-status">{event.status || 'Ongoing'}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="event-item">
              <div className="event-info">
                <div className="event-name">No recent events</div>
              </div>
            </div>
          )}
        </div>

        <div className="bottom-card">
          <div className="card-header">
            <h3>Top Coordinators</h3>
            <a href="#" className="view-link">View report</a>
          </div>
          <div className="coordinator-list">
            {dashboardData?.topCoordinators && dashboardData.topCoordinators.length > 0 ? (
              dashboardData.topCoordinators.map((coordinator, index) => (
                <div key={index} className="coordinator-item">
                  {coordinator.name || `${coordinator.firstName || ''} ${coordinator.lastName || ''}`.trim()} - {coordinator.eventCount || 0} events
                </div>
              ))
            ) : (
              <div className="coordinator-item">No coordinators found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
