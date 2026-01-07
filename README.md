# Hackathon Digitalflake

## Overview
This project is a full-stack application built with React for the frontend and Node.js/Express for the backend. It includes authentication, category and subcategory management, and product CRUD operations.

## Features
- User authentication (login, forgot password)
- Dashboard with protected routes
- Category management (add, edit, delete)
- Subcategory management (add, edit, delete)
- Product management (add, edit, delete)
- Search and filter functionality
- Image upload with preview

## Tech Stack
- React
- React Router
- Tailwind CSS
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/HansrajS1/Hackathon-Digitalflake.git
   cd Hackathon-Digitalflake
   npm install
   npm run dev
   cd backend
   npm install
   npm start
   ```
2. file .env
   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   SENDGRID_API_KEY=your_sendgrid_api_key
   JWT_EXPIRE=7d
   PORT=10000
   CLOUDINARY_CLOUD_NAME=CLOUDINARY_CLOUD_NAME
   CLOUDINARY_API_SECRET=CLOUDINARY_API_SECRET
   CLOUDINARY_API_KEY=CLOUDINARY_API_KEY
   SENDGRID_API_KEY=SENDGRID_API_KEY
   ```

