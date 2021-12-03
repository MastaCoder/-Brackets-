import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";

export const tournamentRouter = Router();

tournamentRouter.get("/tournaments", authenticate, async (req, res) => {
    
})

tournamentRouter.get("/tournaments/:tid", async (req, res) => {

})

tournamentRouter.post("/tournaments", async (req, res) => {

})

tournamentRouter.patch("/tournaments/:tid", async (req, res) => {
    
})