import express from "express";
import travelAttractionsRouter from "./travelAttractionsRouter.js";

const rootRouter = new express.Router();

rootRouter.use("/travel-attractions", travelAttractionsRouter);

export default rootRouter;
