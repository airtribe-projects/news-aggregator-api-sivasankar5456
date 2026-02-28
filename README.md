# 📰 News Aggregator API

## Overview

This project is a News Aggregator REST API built using Node.js, Express.js, and MongoDB.  
It allows users to register, login, fetch top news, mark articles as read or favorite, and search through saved articles.  
The application uses caching for news data and stores user-specific read/favorite articles in the database.

---

## Setup Instructions

### Prerequisites
- Node.js (version 18 or higher)
- npm
- MongoDB

### Steps to Run

1. Clone the repository  
   `git clone <repository-url>`

2. Navigate to the project directory  
   `cd news-aggregator`

3. Install dependencies  
   `npm install`

4. Create a `.env` file with:

PORT=5000
MONGO_URI=<your-mongo-uri>
GNEWS_API_KEY=<your-gnews-api-key>
JWT_SECRET=<your-jwt-secret>


5. Start the server  
`npm run dev`

The server will start on:  
`http://localhost:5000`

---

## Base API URL

`http://localhost:5000/api/news`

Authentication is required for all endpoints except `register` and `login`. Include `Authorization: Bearer <token>` header for protected routes.

---

## API Documentation

### 1️⃣ User Registration

POST `/api/users/register`

Request Body:
```json
{
"name": "John Doe",
"email": "john@example.com",
"password": "password123"
}

Response:
Status: 201

{
  "success": true,
  "message": "User registered successfully",
  "token": "<jwt-token>"
}
2️⃣ User Login

POST /api/users/login

Request Body:

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
Status: 200

{
  "success": true,
  "message": "Login successful",
  "token": "<jwt-token>"
}
3️⃣ Get Top News

GET /api/news?topic=technology&language=en

Query Parameters (Optional):

topic — News topic (e.g., sports, tech)

language — Language code (e.g., en, hi)

Response:
Status: 200

{
  "success": true,
  "totalArticles": 10,
  "articles": [
    {
      "id": "5d276b8f7594733cbe10adbe42b3b557",
      "title": "North Korean leader Kim Jong Un presents sniper to daughter Kim Ju Ae",
      "url": "https://www.livemint.com/news/world/north-korean-leader-kim-jong-un-presents-sniper-to-daughter-kim-ju-ae-amid-succession-speculations-11772252507901.html"
    },
    {
      "id": "5547bd5a4c7fb3a27f6f253d50a6c4d7",
      "title": "Tere Naam Re-Release Day 1 Box Office Collections",
      "url": "https://www.pinkvilla.com/entertainment/box-office/tere-naam-re-release-day-1-box-office-collections-salman-khans-cult-classic-romantic-drama-opens-with-rs-25-lakh-1401132"
    }
  ],
  "cached": false
}
4️⃣ Mark Article as Read

POST /api/news/:id/read

Request Body:

{
  "title": "North Korean leader Kim Jong Un presents sniper to daughter Kim Ju Ae",
  "url": "https://www.livemint.com/news/world/north-korean-leader-kim-jong-un-presents-sniper-to-daughter-kim-ju-ae-amid-succession-speculations-11772252507901.html"
}

Response:
Status: 200

{
  "success": true,
  "message": "Article marked as read",
  "readArticles": [
    { "title": "...", "url": "..." }
  ]
}
5️⃣ Mark Article as Favorite

POST /api/news/:id/favorite

Request Body:

{
  "title": "North Korean leader Kim Jong Un presents sniper to daughter Kim Ju Ae",
  "url": "https://www.livemint.com/news/world/north-korean-leader-kim-jong-un-presents-sniper-to-daughter-kim-ju-ae-amid-succession-speculations-11772252507901.html"
}

Response:
Status: 200

{
  "success": true,
  "message": "Article marked as favorite",
  "favoriteArticles": [
    { "title": "...", "url": "..." }
  ]
}
6️⃣ Get Read Articles

GET /api/news/read

Response:
Status: 200

{
  "success": true,
  "readArticles": [
    { "title": "...", "url": "..." }
  ]
}
7️⃣ Get Favorite Articles

GET /api/news/favorites

Response:
Status: 200

{
  "success": true,
  "favoriteArticles": [
    { "title": "...", "url": "..." }
  ]
}
8️⃣ Search Articles

GET /api/news/search/:keyword

Response:
Status: 200

{
  "success": true,
  "results": [
    { "title": "...", "url": "..." }
  ]
}
Notes

All :id in POST read/favorite routes correspond to the article ID from cached news data.

Users must provide title and url in the body when marking read/favorite.

News API results are cached to reduce API calls.

JWT authentication is required for all routes except register/login.

MongoDB stores users and their read/favorite articles.

Use tools like Postman, Thunder Client, or curl to test endpoints.

Testing Example
GET http://localhost:5000/api/news?topic=technology&language=en
Authorization: Bearer <token>
POST http://localhost:5000/api/news/5d276b8f7594733cbe10adbe42b3b557/read
Authorization: Bearer <token>
Body:
{
  "title": "North Korean leader Kim Jong Un presents sniper to daughter Kim Ju Ae",
  "url": "https://www.livemint.com/news/world/north-korean-leader-kim-jong-un-presents-sniper-to-daughter-kim-ju-ae-amid-succession-speculations-11772252507901.html"
}

This is a full working README with all endpoints, payloads, and responses, ready to copy-paste into a README.md file.


This file covers **register, login, get news, mark read/favorite, fetch lists, and search**, exactly like your instructions.  

If you want, I can also **add a ready Postman collection snippet** at the bottom so you can **import all endpoints directly** without writing anything.  

Do you want me to do that?