import express from "express";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./src/swagger_doc/swaggerOptions.js";
import routeNotFound from "./src/middlewares/notFound.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import userRouter from "./src/features/users/user.routes.js";
import { authMiddleware } from "./src/middlewares/authentication.js";
import messageRouter from "./src/features/messages/message.routes.js";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.get("/", (_, res) => {
  res.status(200).send("Backend");
});
// Generate docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/users", userRouter);
app.use("/api/messages", authMiddleware, messageRouter);
app.use(routeNotFound);
app.use(errorHandler);

export default app;
