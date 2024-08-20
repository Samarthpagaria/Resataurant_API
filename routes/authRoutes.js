import express from "express"
import { loginControllers, registerControllers } from "../controllers/authControllers.js"

const router = express.Router()
router.post("/register",registerControllers)

//Login 
router.post("/login",loginControllers)
export {router}