import express from "express";
import employees from "../db/employees.js";

const router = express.Router();

router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("Employee not found.");
  }

  res.send(employees);
});

router.post("/", (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).send("Name is required and must be a string.");
  }

  const newEmployee = {
    id: employees.length + 1,
    name: name,
  };

  employees.push(newEmployee);
});

export default router;
