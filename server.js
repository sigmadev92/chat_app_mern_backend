import app from "./app.js";
import { PORT } from "./src/config/env.js";

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON HTTP://LOCALHOST:${PORT}`);
});
