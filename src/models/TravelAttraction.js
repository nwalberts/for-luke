import fs from "fs";
import _ from "lodash";

let travelAttractionsPath;
if (process.env.NODE_ENV === "test") {
  travelAttractionsPath = "travelAttractionsTest.json";
} else {
  travelAttractionsPath = "travelAttractions.json";
}

class TravelAttraction {
  constructor({ id, name, location }) {
    this.id = id;
    this.name = name;
    this.location = location;
  }

  static findById(id) {
    const travelAttractionData = JSON.parse(
      fs.readFileSync(travelAttractionsPath)
    ).travelAttractions;

    let selectedTravelAttraction;
    travelAttractionData.forEach((travelAttraction) => {
      if (parseInt(id) === travelAttraction.id) {
        selectedTravelAttraction = new TravelAttraction(travelAttraction);
      }
    });

    return selectedTravelAttraction;
  }

  static findAll() {
    const travelAttractionData = JSON.parse(
      fs.readFileSync(travelAttractionsPath)
    ).travelAttractions;

    let travelAttractions = [];
    travelAttractionData.forEach((travelAttraction) => {
      const newTravelAttraction = new TravelAttraction(travelAttraction);
      travelAttractions.push(newTravelAttraction);
    });

    return travelAttractions;
  }

  static getNextTravelAttractionId() {
    const maxTravelAttraction = _.maxBy(
      this.findAll(),
      (travelAttraction) => travelAttraction.id
    );
    return maxTravelAttraction.id + 1;
  }

  save() {
    this.id = this.constructor.getNextTravelAttractionId();
    const travelAttractions = this.constructor.findAll();
    travelAttractions.push(this);
    const data = { travelAttractions: travelAttractions };
    fs.writeFileSync(travelAttractionsPath, JSON.stringify(data));
    return true;
  }
}

export default TravelAttraction;
