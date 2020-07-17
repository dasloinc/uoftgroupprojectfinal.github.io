const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
    // process.env.MONGODB_URI || 
    "mongodb://localhost/togather",{
        useNewUrlParser: true, useFindAndModify: false
    }, (error) => console.log("ERROR" + error)
  );

  const eventSeed = [
      {
        sportType: "Soccer",
        eventName: "Leeroy's Game",
        participants: 4,
        eventDate: new Date("12/04/2020"),
        eventStart: 17,
        eventEnd: 19,
        location: "1 PARKMOUNTH RD, TORONTO, ON M4J 0A5"
      },
      {
        sportType: "Volleyball",
        eventName: "Daniel's Game",
        participants: 4, 
        eventDate: new Date("12/05/2020"),
        eventStart: 18,
        eventEnd: 19,
        location: "75 CARL HALL RD, NORTH YORK M3K 2B9"
      },
      {
        sportType: "Basketball",
        eventName: "Nikola's Game",
        participants: 4,
        eventDate: new Date("12/05/2020"),
        eventStart: 5,
        eventEnd: 9,
        location: "101 RAILSIDE RD, NORTH YORK, ON  M3A 1B2"
      },
      {
        sportType: "Soccer",
        eventName: "Diana's Game",
        participants: 4,
        eventDate: new Date("12/05/2020"),
        eventStart: 7,
        eventEnd: 12,
        location: "480 SHUTER ST, TORONTO, ON M5A 3K1"
      },
      {
        sportType: "Tennis",
        eventName: "Moreno's Game",
        participants: 4,
        eventDate: new Date("12/05/2020"),
        eventStart: 5,
        eventEnd: 8,
        location: "275 UNWIN AVE, TORONTO, ON M5A 3K8"
      },
      {
        sportType: "Volleyball",
        eventName: "Rodrigo's Game",
        participants: 4,
        eventDate: new Date("12/05/2020"),
        eventStart: 16,
        eventEnd: 18,
        location: "725 BATHURST ST, TORONTO M5S 2R5"
      },
  ];

  db.Event.collection.insertMany(eventSeed)
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });