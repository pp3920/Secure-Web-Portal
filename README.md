Secure Web Portal
Overview

Secure Web Portal is a Node.js, Express, and MongoDB backend application that demonstrates:

Local Authentication (Email + Password)
JWT Authentication
GitHub OAuth Authentication
Protected CRUD APIs
Authorization using Resource Ownership

The application allows users to register, log in, authenticate using GitHub, and manage their own private bookmarks.

Technologies Used
Node.js
Express.js
MongoDB Atlas
Mongoose
bcrypt
jsonwebtoken (JWT)
Passport.js
passport-github2
dotenv
Project Structure
secure-web-portal/
│
├── config/
│   └── passport.js
│
├── models/
│   ├── User.js
│   └── Bookmark.js
│
├── routes/
│   └── api/
│       ├── userRoutes.js
│       └── bookmarkRoutes.js
│
├── utils/
│   └── auth.js
│
├── .env
├── .gitignore
├── server.js
└── package.json
Features
Local Authentication

Users can:

Register with email and password
Login using email and password
Receive a JWT token after successful login

Passwords are hashed using bcrypt before being stored in MongoDB.

GitHub OAuth Authentication

Users can:

Login using their GitHub account
Authorize the application
Receive a JWT token after successful authentication

Passport.js and passport-github2 are used to implement OAuth 2.0.

Bookmark Management

Authenticated users can:

Create bookmarks
View all their bookmarks
View a single bookmark
Update bookmarks
Delete bookmarks

Each bookmark belongs to a specific user.

Authentication

JWT tokens are required for protected routes.

Example:

Authorization: Bearer YOUR_TOKEN

Authentication middleware verifies:

Token exists
Token is valid
Token is not expired
Authorization

Authorization ensures users can only access their own bookmarks.

Example:

User A cannot:

Read User B bookmarks
Update User B bookmarks
Delete User B bookmarks

Unauthorized access returns:

{
  "message": "Forbidden"
}
Environment Variables

Create a .env file.

PORT=3001

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

GITHUB_CLIENT_ID=your_client_id

GITHUB_CLIENT_SECRET=your_client_secret

GITHUB_CALLBACK_URL=http://localhost:3001/api/users/auth/github/callback
Installation

Install dependencies:

npm install

Start server:

node server.js

Expected output:

MongoDB Connected
Server running on port 3001
API Endpoints
User Routes

Register

POST /api/users/register

Login

POST /api/users/login

GitHub Login

GET /api/users/auth/github

GitHub Callback

GET /api/users/auth/github/callback
Bookmark Routes

Create Bookmark

POST /api/bookmarks

Get All Bookmarks

GET /api/bookmarks

Get One Bookmark

GET /api/bookmarks/:id

Update Bookmark

PUT /api/bookmarks/:id

Delete Bookmark

DELETE /api/bookmarks/:id
Security Features
Password Hashing

Passwords are hashed using bcrypt before being stored.

JWT Authentication

Protected routes require a valid JWT.

OAuth Authentication

GitHub OAuth 2.0 login flow implemented using Passport.js.

Resource Ownership

Users can only access resources they own.

Testing Checklist
Local Authentication
Register User
Login User
Verify JWT Generated
GitHub Authentication
Login via GitHub
Verify User Created
Verify JWT Generated
Bookmark CRUD
Create Bookmark
Get All Bookmarks
Get Single Bookmark
Update Bookmark
Delete Bookmark
Security
Verify protected routes require JWT
Verify users cannot access another user's bookmarks
Learning Outcomes

This project demonstrates:

Password hashing with bcrypt
JWT authentication
OAuth 2.0 authentication
Passport.js integration
Express middleware
MongoDB relationships
Authentication and Authorization
REST API development
