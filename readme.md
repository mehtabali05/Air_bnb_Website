# Airbnb Website Clone

This is a full-stack Airbnb clone project built using Node.js, Express, EJS templates, and MongoDB. It replicates the core functionality of Airbnb such as listing properties, viewing details, booking, and handling user authentication.

---

## Features

- User Registration and Login (Authentication)
- Create, Read, Update, Delete (CRUD) Listings
- Browse and View Listing Details
- Make Bookings for Properties
- Dynamic UI using EJS Template Engine
- Proper File Structure (Models, Controllers, Routes, Views)
- Express Middleware integration
- MongoDB for Database Operations

---

## Tech Stack

- Backend: Node.js, Express.js
- Frontend: EJS, HTML, CSS, JavaScript
- Database: MongoDB
- Other: Express Middleware, Node Modules

---

## Project Structure

```

Air_bnb_Website/
├── controllers/
├── models/
├── public/
├── routes/
├── utils/
├── views/
├── cloudConfig.js
├── middleware.js
├── schema.js
├── index.js
└── package.json

````

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mehtabali05/Air_bnb_Website.git
cd Air_bnb_Website
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file and add:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
CLOUD_API_KEY=xxxxxxxxx
CLOUD_API_SECRET=xxxxxxxxxx
```

### 4. Run the Project

```bash
npm start
```

Visit in browser: `http://localhost:3000`

---

## Usage

* Register or Login to your Account
* Add a Listing (if you are a host)
* Browse and Book Listings (as a user)
* Edit or Delete your Listings
* Explore Airbnb-like functionality in a local development environment

---

## Future Enhancements

* Payment Integration (Stripe/PayPal)
* Reviews & Ratings for Listings
* Image Upload (Cloud Storage)
* Filters & Search functionality
* Advanced UI / Responsive Design
* Email Notifications
* Deployment on Cloud (Heroku/AWS/Vercel)

---

## Author

**Mehtab Ali**
GitHub: [https://github.com/mehtabali05](https://github.com/mehtabali05)
Email: (add your email here if you want)

---
