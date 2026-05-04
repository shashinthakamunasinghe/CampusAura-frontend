# CampusAura

CampusAura is a modern campus engagement platform that brings together event discovery, ticketing, fundraising, and a student marketplace in one web application.

## Overview

CampusAura is designed to help students, coordinators, and administrators manage campus life from a single interface. The application includes role-based access for different user types and supports features such as event browsing, marketplace access, profile management, and administrative dashboards.

## Key Features

- Event discovery and detailed event pages
- Ticket and event management workflows
- Student marketplace for browsing and purchasing products
- Role-based routing for students, coordinators, and administrators
- Firebase authentication, Firestore, and storage integration
- Responsive landing page with sections for highlights, features, and contact information

## Tech Stack

- React 19
- Vite
- React Router
- Firebase Authentication, Firestore, and Storage
- Chart.js for dashboard visualizations
- ESLint for code quality

## Project Structure

- `src/Components/` contains the UI components for landing pages, auth, events, marketplace, admin, and coordinator areas
- `src/Context/` contains application-wide context providers
- `src/firebase/` contains Firebase initialization
- `src/pages/` contains page-level screens such as the profile view
- `src/services/` contains API helpers

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root and add your Firebase values:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Deployment

This project is ready to deploy on Vercel.

Recommended Vercel settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

The repository also includes [vercel.json](vercel.json) to support single-page application routing and security headers.

## Notes

- The app uses role-based routes for authenticated users.
- Firebase configuration is loaded from Vite environment variables.
- If you add new secrets or third-party integrations, keep them out of source control and document them here.
