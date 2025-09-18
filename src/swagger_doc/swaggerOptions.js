const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // OpenAPI version
    info: {
      title: "Chat Application API",
      version: "1.0.0",
      description:
        "API documentation for the backend part of MERN stack project",
    },
    servers: [
      {
        url: "http://localhost:3001", // Backend server URL
      },
    ],
  },
  apis: ["./src/swagger_doc/routes/*.js"],
  // Path to your route files
};

export default swaggerOptions;
