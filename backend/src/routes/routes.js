import express from "express";
import { regiater,login } from "../controller/authController.js";

const routes = express.Router();

routes.post("/register",regiater);
routes.post("/login",login);


export default routes;