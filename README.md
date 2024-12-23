# Social Media App API

Welcome to the **Social Media App API** project! This API powers the backend of a social media application. This guide will walk you through setting up and running the app locally.

## Prerequisites

Before setting up the app, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (Recommended version: v14 or above)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [git](https://git-scm.com/) (Version control)

## Getting Started

Follow these steps to get the project up and running locally.

### 1. Clone the Repository

Start by cloning the repository to your local machine. Open a terminal and run:

```bash
git clone https://github.com/nidhish-srivastava/SocialMediaApp-API-Assignment.git
```

### 2. Navigate to the Project Directory
Go into the project directory:
```bash
cd SocialMediaApp-API-Assignment
```

### 3. Install Dependencies
Install all required dependencies using npm:
```bash
npm install
```

### 4. Set Up Environment Variables
Create a .env file in the root of the project directory. You can copy the contents from the .env.example (if available) or create your own environment variables. Here's an example of what you might need:
```bash
ACCESS_TOKEN_SECRET = "your access token secret"
ACCESS_TOKEN_EXPIRY = "10d"
MONGO_DB_URI = ""
PORT = 
```

### 5. Start the Application
Once everything is set up, start the Express.js application locally:
```bash
npm run dev
```
By Default it is running on port 3000

### 6. Access the API Documentation(Swagger Ui)
Once the app is running, you can access the API documentation at:
http://localhost:3000/api-docs
Command to generate docs
```bash
npm run generateDoc
```



### 7. WebSocket Server
Basic real-time chat using WebSockets (Socket.io) and real time notification when a user comments on a post

### Database design schema:
https://excalidraw.com/#json=l1s13_7xsPgg4t6Ae3Qmp,05_CSiROvvsjiVWz4yR2IQ

### Deployment(Vercel):
https://social-media-app-api-ten.vercel.app

---


## Tech Stack

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A minimal and flexible Node.js web application framework.

### Database

- **MongoDB**: A NoSQL database for storing application data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.

### Packages

- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **bcrypt**: A library to help hash passwords.
- **cookie-parser**: Parse HTTP request cookies.
- **cors**: Enable Cross-Origin Resource Sharing (CORS) with various options.
- **jsonwebtoken**: Implementation of JSON Web Tokens.
- **nodemon**: A tool that helps develop Node.js-based applications by automatically restarting the node application when file changes are detected.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **swagger-ui-express**: Serve auto-generated swagger-ui generated API docs from express.
- **swagger-autogen**: Automatic swagger documentation generator.
