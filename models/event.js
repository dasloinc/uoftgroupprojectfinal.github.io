const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/togather', {useNewUrlParser: true});
const Schema = mongoose.Schema;

const eventSchema = new Schema(
    {

    signedUpUsers: {
        type: String,
        required: true,
    },
    //store user id
    eventCreaterID: {
        type: String,
        required: true,
    },

    // Type of event "festival, sport"
    eventType: {
        type: String,
        required: true
    },
    
    //subcategory e.g.Sport => Basketball, Soccer..
    eventCategory: {
        type: String,
        required: true
    },
    
    eventName: {
      type: String,
      required: true,
      unique: true
    },
    //participants number
    participants: {
        type: Number,
        required: true
    },

    signedUpUsers: [{ type: String }], 	//array of user emails that signed up for event

    //date from calendar
    eventDate: {
        type: String,
        required: true
    },

    eventStart: {
        type: String,
        required: true
    },

    eventEnd: {
        type: String,
        required: true
    },
    
    notes: {
        type: String
    },

    //this is the location from the API
    location: {
        type: String,
        required: true
    }
  });
  

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;