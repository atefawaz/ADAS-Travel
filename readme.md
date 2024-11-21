# TRAVEL APP 

## Introduction
This project is a robust Node.js backend application designed to serve as the backbone of a web application. It provides a structured and scalable environment to manage server-side operations efficiently. The application follows the Model-View-Controller (MVC) pattern, promoting separation of concerns and maintainability. Key features include user authentication, API endpoints for CRUD operations, and integration with Redis for caching and session management.
## Features

- Backend API endpoints for retrieving tour information
- Data validation using Joi
- JWT token authentication
- User-friendly frontend interface for booking tours
- Integration of Reactstrap for UI components
- Implementation of React Router for navigation

## Technologies

- MongoDB Atlas: Database
- Express.js: Backend framework for Node.js
- React.js: Frontend library for building user interfaces
- Node.js: JavaScript runtime environment
- JWT: JSON Web Tokens for authentication
- Joi: Library for data validation
- Reactstrap: Bootstrap components for React
- React Router DOM: Library for routing in React applications
- Vercel: Deployment platform for frontend

## Installation

### Backend Installation

1. Clone the repository:

```bash
git clone our repo
```

2. Navigate to the backend folder:

```bash
cd backend
```

3. Install dependencies:

```bash
npm install
```

### Frontend Installation

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

## Usage

### Running Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2. Run the development server:

```bash
npm run dev
```

### Running Frontend

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Start the development server:

```bash
npm start
```

## Environment Variables

Make sure to create a `.env` file in both the backend and frontend folders with the following variables:

- `PORT`: Port number for the server (i suggest 8880 for backend because we have a base url in frontend/src/utils/config.js if you dont pick 8800 then you have to change it )
- `MONGO_URL`: MongoDB Atlas connection URL
- `JWT_SECRET_KEY`: Secret key for JWT token encryption

## Strengths

Upon completing this project, you will gain knowledge in the following areas:

- Building a full-stack web application 
- Creating API endpoints with Node.js and Express.js
- Data validation techniques using Joi
- User authentication using JWT tokens
- React.js for building dynamic user interfaces
- Integration of Reactstrap for UI components
- Implementation of React Router for navigation



## Backend Usage

#  MongoDB

#### Stored Data
In the `test` database, we have the following collections:

- **Users**: Stores user information including username, email, password, photo, and role.
- **Tours**: Stores tour details including title, city, address, distance, photo, description, price, maximum group size, reviews, and whether the tour is featured.
- **Reviews**: Stores reviews for tours including product (tour) ID, username, review text, and rating.
- **Bookings**: Stores booking information including user ID, user email, tour name, full name, guest size, phone number, and booking date.

(Note: Other collections are not implemented yet.)

# Redis

### Usage
Redis is used for the following purposes:

- **Caching**: Frequently accessed data, such as tour information, is cached to improve performance.
- **Session Management**: User sessions are managed by storing session data in-memory, allowing for quick access and enhancing user experience.
- **Storing Tours and User Logins**: Tours are stored in Redis to make access faster. User login information is also cached to speed up the authentication process.

- cache miss --> data requested by the application is not found in the cache.
- cache hit --> data is retrieved from redis and not from the mongodb 

#### Advantages : improve performance , speed , access faster to tours ...etc
#### Disadvantages : when u create a tour it will not show directly because redis is using his own memory and not the updated collection in mongodb
# Neo4j 
### --> neo4jimplementation.py
we implemented neo4j in python, so you have to install the packages in order to run the file and access http://localhost:7474/browser/ where u can see the graphs 

### Integration with MongoDB

We extract booking data from MongoDB and load it into Neo4j to take advantage of its graph querying features.
### This allows us to:

Analyze Booking Patterns:
- Determine which tours are most frequently booked and identify the most active users in terms of bookings.
- Relationship Management: Create and manage relationships between users and tours, enabling us to visualize and query these connections effectively.
- Personalized Recommendations: By identifying the most booked tour and the user with the most bookings, we can suggest destinations to other users based on the popular places visited by frequent travelers. This enhances the user experience by providing personalized travel recommendations.



---
 
