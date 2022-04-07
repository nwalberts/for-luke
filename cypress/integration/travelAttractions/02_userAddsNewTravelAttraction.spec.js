/// <reference types="cypress" />

import newTravelAttraction from "../../fixtures/newTravelAttraction.json";
import starterTravelAttractions from "../../fixtures/starterTravelAttractions.json";
const travelAttractionsFilePath = "travelAttractions.json";

context("Travel Attractions New", () => {
  beforeEach(() => {
    cy.writeFile(
      travelAttractionsFilePath,
      JSON.stringify(starterTravelAttractions)
    );
    cy.visit("http://localhost:3000/travel-attractions/new");
  });

  it("adds a travel attraction to the list upon submitting the form", () => {
    cy.get("#name")
      .type(newTravelAttraction.name)
      .should("have.value", newTravelAttraction.name);

    cy.get("#location")
      .type(newTravelAttraction.location)
      .should("have.value", newTravelAttraction.location);

    cy.get(".button").should("have.value", "Save this Attraction!");

    cy.get(".new-travel-attraction-form").submit();

    cy.url().should("eq", "http://localhost:3000/travel-attractions");

    cy.get(".travel-attractions")
      .find("li")
      .last()
      .should(
        "have.text",
        `${newTravelAttraction.name} - ${newTravelAttraction.location}`
      );
  });
});
