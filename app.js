import express from "express";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./src/swagger_doc/swaggerOptions.js";
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (_, res) => {
  res.status(200).send("Backend");
});
// Generate docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;
