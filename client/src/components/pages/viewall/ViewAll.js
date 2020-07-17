import React, { useState, useEffect } from "react";
import "../../css/viewall.css";

// CSS
import "../../css/mainwindow.css";
import "../../css/card.css";

import getEvents from "../../../API/getEvents";

const ViewAll = () => {
  const [selectedSport, setSelectedSport] = useState(0);
  const [allEvents, setAllEvents] = useState([""]);
  const [events, setEvents] = useState([""]);

  const loadAllEvents = () => {
    let fetchedEvents = getEvents();
    let allEvents = Promise.resolve(fetchedEvents);
    allEvents.then(function (events) {
      let data = events.data;
      if (!data || data.length < 1) {
        data = [""];
      }
      setAllEvents(data);
      setSelectedSport("All");
    });
  };

  const loadEvents = () => {
    if(selectedSport === "All"){
      setEvents(allEvents);
      return;
    }

    let events = allEvents.filter((event) => {
      return event.eventCategory === selectedSport;
    });
    setEvents(events);
  };

  useEffect(() => {
    loadAllEvents();
  }, []);

  useEffect(() => {
    loadEvents();
  }, [selectedSport]);

  const onChangeSport = (event) => {
    setSelectedSport(event.target.value);
    loadEvents();
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>
          View All
          <small>
            <i>"Check all the events that are happening, here!!"</i>
          </small>
        </h1>
        <ol className="breadcrumb">
          <li>
            <a href="/home">
              <i className="fas fa-door-open"></i>
              <span className="text-orange"> Main</span>
            </a>
          </li>
          <li>View All</li>
        </ol>
      </section>

      <section className="content-header">
        <form>
          <div className="row">
            <select
              className="title-container"
              onChange={onChangeSport}
              value={selectedSport}
            >
              <option value="All">All</option>
              <option value="Soccer">Soccer</option>
              <option value="Volleyball">Volleyball</option>
              <option value="Basketball">Basketball</option>
              <option value="Tennis">Tennis</option>
            </select>
            <div className="title-container"></div>
          </div>
          <div className="homeT_wrapper">
            <div className="homeT_table">
              <div className="homeT_row homeT_header homeT_green">
                <div className="homeT_cell">Event Type</div>
                <div className="homeT_cell">Category</div>
                <div className="homeT_cell">Title</div>
                <div className="homeT_cell">Location</div>
                <div className="homeT_cell">Event Date</div>
                <div className="homeT_cell">Participants</div>
                <div className="homeT_cell">Start Time</div>
                <div className="homeT_cell">End Time</div>
                <div className="homeT_cell">Event Notes</div>
                <div className="homeT_cell">Status</div>
              </div>

              {events.map((event, index) => (
                <div className="homeT_row" key={index}>
                  <div className="homeT_cell" data-title="Event Type">
                    <strong>{event.eventType}</strong> 
                  </div>
                  <div className="homeT_cell" data-title="Event Category">
                    {event.eventCategory}
                  </div>
                  <div className="homeT_cell" data-title="Event Name">
                    {event.eventName}
                  </div>
                  <div className="homeT_cell" data-title="Location">
                    {event.location}
                  </div>
                  <div className="homeT_cell" data-title="Event Date">
                    {event.eventDate}
                  </div>
                  <div className="homeT_cell" data-title="Participants">
                    {parseInt(event.participants) - parseInt(!event.signedUpUsers ? "0" : event.signedUpUsers.length)}
                  </div>
                  <div className="homeT_cell" data-title="Start Time">
                    {event.eventStart}
                  </div>
                  <div className="homeT_cell" data-title="End Time">
                    {event.eventEnd}
                  </div>
                  <div className="homeT_cell" data-title="Event Notes">
                    {event.notes}
                  </div>
                  <div className="homeT_cell" data-title="Event Status">
                    <button className="va-joinin-btn">Join In</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ViewAll;
