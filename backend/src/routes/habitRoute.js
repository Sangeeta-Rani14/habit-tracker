import express from "express";
import { createHabit, deleteHabit, getHabits, toggleHabitStatus } from "../controller/habitController.js";
import { protect } from "../middleware/authMiddleware.js";
const routes = express.Router();
routes.post("/habits", protect, createHabit);
routes.get("/habits", protect, getHabits);
routes.delete("/habits/:id", protect, deleteHabit);
routes.patch('/habits/:id/toggle', protect, toggleHabitStatus);
console.log("habit log ")

export default routes;