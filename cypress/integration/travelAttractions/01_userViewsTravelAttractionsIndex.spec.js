/// <reference types="cypress" />

import starterTravelAttractions from "../../fixtures/starterTravelAttractions.json";

context("Travel Attractions Index", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/travel-attractions");
  });

  it("has a header", () => {
    cy.get("h1").should("have.text", "Our List of Attractions to see!");
    // We would usually not test for static elements such as this, but we will use this test to guide us through the development process in the exercise.
  });

  it("lists all travel attractions", () => {
    cy.get(".travel-attractions")
      .find("li")
      .first()
      .should("have.text", `${starterTravelAttractions.travelAttractions[0].name} - ${starterTravelAttractions.travelAttractions[0].location}`);

    cy.get(".travel-attractions")
      .find("li")
      .eq(1)
      .should("have.text", `${starterTravelAttractions.travelAttractions[1].name} - ${starterTravelAttractions.travelAttractions[1].location}`);
  });

  it("has a link to go to the new travel attraction form", () => {
    cy.get("a")
      .should("have.text", "Add a new Travel Attraction")
      .and("have.attr", "href", "/travel-attractions/new");
  });
});
