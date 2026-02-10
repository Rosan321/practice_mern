import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth & Todo API",
      version: "1.0.0",
      description: "API documentation for Auth and Todo services",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
