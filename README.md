<h1 align="center">CampusAura Frontend Web Application</h1>

<div align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Firebase-Auth_%26_Storage-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/Vercel-Deployment-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</div>

## 📌 Project Overview

CampusAura is a modern, responsive, and highly interactive campus engagement platform. It brings together event discovery, secure ticketing, fundraising, and a student-exclusive marketplace into a seamless Single Page Application (SPA).

This repository contains the **Frontend Web Application**, engineered with a focus on modern UI/UX design, performance, and scalable state management.

🔗 **Live Production Environment**: [campus-aura-frontend.vercel.app](https://campus-aura-frontend.vercel.app)  
🔗 **Backend API**: [campusaura-backend.lemontree-0868690c.centralindia.azurecontainerapps.io](https://campusaura-backend.lemontree-0868690c.centralindia.azurecontainerapps.io)  

---

## 🏗️ Architecture & Frontend Engineering Practices

As a showcase of professional frontend development, this project implements the following practices:

- **Component-Based Architecture**: Highly modular and reusable UI components following React best practices to ensure maintainability.
- **Modern Build Tooling**: Powered by **Vite** for lightning-fast HMR (Hot Module Replacement) and optimized production builds.
- **Advanced Routing & Protection**: Utilizes `react-router-dom` with custom Higher-Order Components (HOCs) and context providers to enforce **Role-Based Access Control (RBAC)** on the client side, seamlessly mirroring backend security.
- **Context API State Management**: Centralized application state for User Authentication and Data Caching, reducing prop-drilling and ensuring a reactive UI.
- **Responsive & Utility-First Styling**: Built with **Tailwind CSS**, ensuring a pixel-perfect, mobile-first responsive design across all devices.
- **Performance Optimization**: Optimized asset delivery configuration and SPA routing logic via Vercel edge networks.

---

## 🚀 Key Features

### User Experience & Identity
- **Seamless Onboarding**: Integration with Firebase Authentication for secure sign-ins.
- **Role-Based Dashboards**: Distinct UI workflows and isolated routing tailored for `ADMIN`, `COORDINATOR`, and `STUDENT` roles.

### Interactive Modules
- **Event Management**: Dynamic event discovery feeds, detailed event pages, and integrated ticket purchasing workflows (via Stripe on backend).
- **Student Marketplace**: A peer-to-peer ecosystem allowing students to browse, list products, and securely upload product images directly to Firebase Storage.
- **Data Visualization**: Administrator dashboards featuring interactive analytics powered by **Chart.js**.

---

## ☁️ Deployment & CI/CD Pipeline

The frontend is configured for Continuous Deployment (CD) and is hosted on **Vercel's Global Edge Network**.

**Deployment Highlights:**
1. **Automated CI/CD**: Seamlessly integrated with GitHub. Every push to the `main` branch triggers an isolated build and production deployment.
2. **SPA Routing Optimization**: Includes a custom `vercel.json` configuration to gracefully handle client-side routing (rewriting all requests to `index.html`) and enforcing strict security headers.
3. **Environment Variable Management**: Secure injection of Firebase configuration and Backend API URLs during the build process, preventing sensitive data leakage in source control.

---

## 💻 Tech Stack Summary

| Category | Technologies |
|---|---|
| **Framework & Build** | React 19, Vite |
| **Routing & State** | React Router DOM, React Context API |
| **Styling & UI** | Tailwind CSS |
| **Backend Integration** | REST API Consumption, Firebase Auth & Storage |
| **Data Viz & Linting** | Chart.js, ESLint |
| **Hosting & CI/CD** | Vercel |

---

## 🛠️ Local Development Guide

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/sandaluruba/CampusAura-frontend.git
   cd CampusAura-frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and populate it with your Firebase config and API endpoint:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   
   VITE_API_BASE_URL=http://localhost:8080 # Or production API URL
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

---
<div align="center">
  <i>Developed to demonstrate robust, scalable, and modern Software Engineering principles.</i>
</div>
