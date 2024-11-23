import swaggerAutogen from "swagger-autogen"

const doc = {
    info: {
      title: 'Social Media API',
      description: 'API docs for my Social Media API'
    },
    host: 'localhost:3000',
  };
  
  const outputFile = '../swagger-output.json';
  const routes = ['./routes/index.js'];
  
  swaggerAutogen()(outputFile, routes, doc);