import app from "./app.js";
import { PORT } from "./src/config/env.js";
import connectToDbViaMongoose from "./src/config/mongooseDb.js";

app.listen(PORT, () => {
  connectToDbViaMongoose();
  console.log(`SERVER RUNNING ON HTTP://LOCALHOST:${PORT}`);
});
