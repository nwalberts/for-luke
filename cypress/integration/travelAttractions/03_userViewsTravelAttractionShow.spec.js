/// <reference types="cypress" />

import starterTravelAttractions from "../../fixtures/starterTravelAttractions.json";

context("Travel Attractions Show", () => {
  beforeEach(() => {
    //For this test we will be using the travel attraction with an id of 1
    cy.visit("http://localhost:3000/travel-attractions/1");
  });

  it("has a header displaying the attractions name", () => {});

  it("lists the location of the attraction", () => {});

  it("has a link to go back to the index page", () => {});
});
