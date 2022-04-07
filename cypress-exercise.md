Now that we've learned how to configure Cypress in our Express applications and how to write tests, let's practice using them!

### Learning Goals

- Learn how to use acceptance tests combined with acceptance criteria to help guide you in development
- Become comfortable reading a spec file to understand what is being tested.

### Getting Started

```
et get cypress-exercise
cd cypress-exercise
yarn install
code .
```

### How to begin

Feel free to look around the code that is provided. Currently we have an app that is set up for users to add and view some of their favorite travel attractions. In the `/cypress/integration/travelAttractions` folder there are 3 spec files. The first two have been filled out already -- we will get to the third file a little later.

To get started let's run the test suite provided by running `yarn run dev` in one terminal window, and `yarn run test:open` in another. Instead of running all of our tests at once, let's take it file by file and first click on `01_userViewsTravelAttractionsIndex.spec.js` in the Cypress window.

Focus on the first failing test within this spec file. It's important to stay focused on the task at hand and chip away at the failing tests piece by piece by only satisfying what is currently failing.

![Image of first error on Cypress index spec][cypress-1st-error-image]

The test timed out while searching for an element, `Expected to find element: h1, but never found it.`. It sounds we need to add an `<h1>` to one of my pages, but maybe we're unsure on exactly which of our `.hbs` files this should be added to! Let's jump to the `01_userViewsTravelAttractionsIndex.spec.js` file itself and take a look.

```javascript
context("Travel Attractions Index", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/travel-attractions");
  });

  it("has a header", () => {
    cy.get("h1").should("have.text", "Our List of Attractions to see!");
  });

  it("lists all travel attractions", () => {
    cy.get(".travel-attractions")
      .find("li")
      .first()
      .should("have.text", "Sagrada Família - Barcelona, Spain");

    cy.get(".travel-attractions")
      .find("li")
      .eq(1)
      .should("have.text", "Statue of Liberty - New York, NY");
  });

  it("has a link to go to the new travel attraction form", () => {
    cy.get("a")
      .should("have.text", "Add a new Travel Attraction")
      .and("have.attr", "href", "/travel-attractions/new");
  });
});
```

In the `beforeEach()` block we can see that we will be going to `http://localhost:3000/travel-attractions` before each `it` block. Based on proper convention, the `index.hbs` file should be rendered at this path, but we can also review the `travelAttractionsRouter` and see which file is rendered currently.

In the `travelAttractionsRouter.js` file, any GET requests to `/travel-attractions` are handled by:

```javascript
travelAttractionsRouter.get("/", (req, res) => {
  const travelAttractions = TravelAttraction.findAll();
  res.render("travelAttractions/index", { travelAttractions });
});
```

This route will render the `index.hbs` file within the `views/travelAttractions`folder. Now we know where to go!

Currently the `index.hbs` is empty, so let's add just enough to pass that first test and then run it again. In this case we'll add an `<h1>` tag to pass the first assertion error and let the tests continue to give us feedback on what we should add next.

```javascript
//index.hbs
<h1></h1>
```

Now if we re-run the test we should get an error like the below:

![Image of second error on Cypress index spec][cypress-2nd-error-image]

Our tests are now able to locate the `h1` header, but they're not finding any text in it. This makes sense, because we haven't added any text yet! Let's take the text it's looking for and add it within the `h1` tag. Now our file should look like:

```javascript
//index.hbs
<h1>Our List of Attractions to see!</h1>
```

One important thing to note when adding text to get a test to pass is to double-check that you aren't hard-coding. In the case of this first test it's checking that the `h1` header will always display the string `"Our List of Attractions to see!"`. Since we cannot get this string from our data stored in `travelAttractions.json`, the above code block is a valid solution. If it were checking for our existing attractions in a list, however, we would want to read them from `travelAttractions.json` using our model, rather than hard-code them in our HTML.

Looking ahead to the second `it` block:

```javascript
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
```

This is testing that we are displaying the name and location for each travel attraction.  To get this test to pass we would need to add an `li` tag with the correct information about a travel attraction.

```html
...
<li>Sagrada Família - Barcelona, Spain</li>
...
```

Adding this to our `show.hbs` would allow part of the test to pass, but this would be hardcoding!  We are now displaying the string `"Sagrada Família - Barcelona, Spain"` regardless of what travel attractions are being stored in `travelAttractions.json`.  Currently this may seem ok, because that is one of the attractions we have stored, but imagine if we had an empty `travelAttractions.json` file.  In that case it wouldn't make any sense to display that information.  The information that we display should depend upon what data we have stored in our JSON file.

This is why we test two different travel attractions in our test: to avoid hard-coding from passing. Update your code to instead read and populate the travel attractions from the JSON file.

Now if we re-run the test, we can see that there is a green checkmark and the first test is passing! Keeping getting the tests to pass one by one until all the tests in `01_userViewsTravelAttractionsIndex` and `02_userAddsNewTravelAttraction` are passing.

### Bonus

You may have noticed there is also a `03_userViewsTravelAttractionShow.spec.js` file, but currently there is only an outline of what we may want to test. Use the acceptance criteria below to help determine what tests you will need to write. The `show.hbs` file has already been set up for you, so you won't need to edit anything there.

```no-highlight
As a user
I want to see information about a specific travel attraction
So I can plan my travel itinerary

Acceptance Criteria:
* When a user navigates to `/travel-attractions/:id`, they see a header that displays the name of the attraction
* They should also see the location of the attraction
* At the bottom of the page there should be a link to go back to the index page, which navigates to `/travel-attractions`
```

When done, your new Cypress test should pass without any edits to your views or routers.

### Resources

- [Cypress Docs][cypress-docs]
- [Common Cypress Assertions][cypress-docs-assertions]
- [Cypress API Docs: Table of Contents with all Commands][cypress-docs-toc]

[cypress-docs]: https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell
[cypress-docs-assertions]: https://docs.cypress.io/guides/references/assertions.html#Common-Assertions
[cypress-docs-toc]: https://docs.cypress.io/api/api/table-of-contents.html
[cypress-1st-error-image]: https://horizon-production.s3.amazonaws.com/images/exercise/cypress-exercise/1st-error.png
[cypress-2nd-error-image]: https://horizon-production.s3.amazonaws.com/images/exercise/cypress-exercise/2nd-error.png
