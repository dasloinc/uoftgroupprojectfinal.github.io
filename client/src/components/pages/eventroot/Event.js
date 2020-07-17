// import React from "react";
import React, { Component } from "react";
import CardEvent from "../supplementary/CardEvent";
import togatherList from "../supplementary/togather.json";
// CSS
import "../../css/mainwindow.css";
import "../../css/card.css";


// function Event () {
class Event extends Component {
  state = {
    togatherList
  };

  render() {
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>
          Events
          <small><i>"Choose among many events"</i></small>
        </h1>
        <ol className="breadcrumb">
          <li>
            <a href="/home"><i className="fas fa-door-open"></i><span className="text-orange"> Main</span></a>
          </li>
          <li>Events</li>
        </ol>
      </section>

      <section className="content">
        <div className="row">
          {/* ROUTE to every card event */}
          {this.state.togatherList.map(togather => (
            togather.events.map(events => (
              <CardEvent 
                id={events.id} 
                headtitle={events.headtitle} 
                badge={events.badge} 
                caption={events.caption} 
                example={events.example}
                href={events.href}
              />
            ))
          ))}
        </div>
      </section>
    </div>
  );
  }
}

export default Event;
