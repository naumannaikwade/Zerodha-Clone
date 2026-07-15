# Trading Platform

A full-stack trading platform built with React.js frontend and Node.js/Express backend with MongoDB.

## Features

- User authentication (signup/login with JWTs)
- Real-time stock data from Finnhub API
- Portfolio management (Holdings, Positions, Orders)
- Fund management with transaction history
- Responsive design with mobile support
- Watchlist with live stock prices

## Tech Stack

### Frontend
- React.js with Hooks
- Axios for API calls
- Zustand for state management
- CSS3 with responsive design

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT-based authentication
- RESTful API architecture

## Installation

## Production configuration

Configure the backend with the variables documented in `backend/.env.example`.
`CORS_ORIGINS` must contain the exact deployed dashboard and marketing-site origins,
separated by commas and without paths. Configure the dashboard build with
`REACT_APP_BACKEND_URL` from `dashboard/.env.example`.

Run the stock cron in only one backend instance by setting
`ENABLE_STOCK_CRON=true` there; leave it disabled on other replicas.

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Finnhub API key (free tier available)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/trading-platform.git
cd trading-platform
