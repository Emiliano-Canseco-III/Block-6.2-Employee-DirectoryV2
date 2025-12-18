import express from "express";
import employeeRouter from "./routes/employees.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

app.use("/employees", employeeRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal server Error");
});

export default app;
