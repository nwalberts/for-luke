import express from "express";

import TravelAttraction from "../models/TravelAttraction.js";

const travelAttractionsRouter = new express.Router();

travelAttractionsRouter.get("/", (req, res) => {
  const travelAttractions = TravelAttraction.findAll();
  res.render("travelAttractions/index", { travelAttractions });
});

travelAttractionsRouter.get("/new", (req, res) => {
  res.render("travelAttractions/new");
});

travelAttractionsRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const travelAttraction = TravelAttraction.findById(id);

  res.render("travelAttractions/show", {
    name: travelAttraction.name,
    location: travelAttraction.location,
  });
});

travelAttractionsRouter.post("/", (req, res) => {
  const travelAttraction = new TravelAttraction(req.body);
  travelAttraction.save();
  
  res.redirect("/travel-attractions");
});

export default travelAttractionsRouter;
