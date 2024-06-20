import express, { Request, Response } from "express";
/* const apiRouter = require("./routes/index"); */
const bodyParser = require("body-parser");
const { PORT } = require("./config/server.config");
const errorHandler = require("./utils/index");
/* const connectDB = require('./config/db.config') */

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

/* app.use("/api", apiRouter);
 */
app.get("/ping", (req: Request, res: Response) => {
  return res.json({ message: "Pong from root" });
});

app.use(errorHandler.errorHandler);

app.listen(PORT, async () => {
  console.log(`server started at ${PORT}`);
  /* connectDB(); */
  console.log('Connected to Database');
});
