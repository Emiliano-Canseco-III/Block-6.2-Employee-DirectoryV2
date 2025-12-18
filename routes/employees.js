import express from "express";
import employees from "../db/employees.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.json(employees);
});

router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === Number(id));

  if (!employee) {
    return res.status(404).send("Employee not found.");
  }

  res.json(employee);
});

router.post("/", (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send("Request body or name is missing.");
  }

  const { name } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).send("Name is required.");
  }

  const newEmployee = {
    id: employees.length + 1,
    name,
  };
  employees.push(newEmployee);

  res.status(201).json(newEmployee);
});

export default router;
