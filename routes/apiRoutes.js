const Event = require("../models/event");

module.exports = function(app) {
  app.post("/event", async function(req, res) {
      try {
          console.log(req.body);
          const event = new Event(req.body);
          //save event into mongoDB
          await event.save();
          //new event model
        res.send(event);
      } catch (error) {
          res.status(500).send(error);
      }
  });

  app.get("/api/events", (req, res) => {
    Event.find({})
    // .sort({ date: -1 })
    .then(dbTransaction => {
      // console.log("getcall",dbTransaction);
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
  });

  app.get("/eventsByType", (req, res) => {
    Event.find({eventCategory: req.query.eventCategory})
    // .sort({ date: -1 })
    .then(dbTransaction => {
      // console.log("getcall",dbTransaction);
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
  });

  app.put("/event", async function(req, res) {
    try {
        console.log(req.body);

        //update Event document and return updated document
        Event.findOneAndUpdate(
          {eventName: req.body.eventName},
          {$push: {signedUpUsers: req.body.userEmail}},
          {returnNewDocument: true}
        ).then(updatedEvent => {
          // console.log("getcall",dbTransaction);
          res.json(updatedEvent);
        })
        .catch(err => {
          res.status(404).json(err);
        });
    } catch (error) {
        res.status(500).send(error);
    }
});
};
