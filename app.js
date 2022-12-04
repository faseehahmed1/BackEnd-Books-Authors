import express from "express";
import morgan from "morgan";

import bookRouter from "./routes/books.js";
import authorRouter from "./routes/authors.js";

const app = express();
const PORT = process.env.PORT;
// Refactor this PORT variable to call on the environment variable instead!

app.use(
  morgan(":method :url :status :date[web]")
);
// app.use(express.static("public"));
app.use(express.json());

app.use("/api/books", bookRouter);
app.use("/api/authors", authorRouter);

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});
