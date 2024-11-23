import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv"
dotenv.config()

// Define the Swagger documentation object
const doc = {
  info: {
    title: 'Social Media API',
    description: 'API docs for my Social Media API',
  },
  host: process.env.NODE_ENV === 'production'
    ? 'social-media-app-api-assignment.vercel.app' // Vercel production URL
    : 'localhost:3000', // Local development URL
};

const outputFile = '../swagger-output.json';  // Ensure the output file is correctly placed in the root folder
const routes = ['./routes/index.js'];

// Generate the Swagger documentation
swaggerAutogen()(outputFile, routes, doc);
