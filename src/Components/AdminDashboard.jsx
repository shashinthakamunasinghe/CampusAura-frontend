import { useState } from 'react';
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

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Overview</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <MdEvent className="stat-icon" />
          </div>
          <div className="stat-header">TOTAL EVENTS</div>
          <div className="stat-value">148</div>
          <div className="stat-change positive">↑ 12%</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <MdPeople className="stat-icon" />
          </div>
          <div className="stat-header">ACTIVE USERS</div>
          <div className="stat-value">3,427</div>
          <div className="stat-change negative">↓ 3%</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <MdShoppingBag className="stat-icon" />
          </div>
          <div className="stat-header">TOTAL PRODUCTS</div>
          <div className="stat-value">156</div>
          <div className="stat-change positive">↑ 8%</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <MdShoppingCart className="stat-icon" />
          </div>
          <div className="stat-header">PRODUCTS SOLD</div>
          <div className="stat-value">234</div>
          <div className="stat-change new">New</div>
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
          <div className="event-item">
            <div className="event-info">
              <div className="event-name">Tech Summit 2024</div>
              <div className="event-status">Ongoing</div>
            </div>
          </div>
        </div>

        <div className="bottom-card">
          <div className="card-header">
            <h3>Top Coordinators</h3>
            <a href="#" className="view-link">View report</a>
          </div>
          <div className="coordinator-list">
            <div className="coordinator-item">John Doe - 45 events</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
