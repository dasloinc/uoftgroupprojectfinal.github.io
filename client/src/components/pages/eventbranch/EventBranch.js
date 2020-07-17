import React, { Component } from "react";
import CardEventSpecific from "../supplementary/CardEventSpecific";
import togatherList from "../supplementary/togather.json";
// CSS
import "../../css/mainwindow.css";
import "../../css/card.css";




class EventBranch extends Component {
  state = {
    togatherList
  };

  render() {

    const eventObject = this.state.togatherList.map(togather => (
      togather.events.filter(events => {
        return events.id === parseInt((window.location.href).charAt((window.location.href).length-1))
      })
    ));

    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>
          {eventObject[0][0].headtitle}
            <small><i>"Start something new or join in.."</i></small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <a href="/home"><i className="fas fa-door-open"></i><span className="text-orange"> Main</span></a>
            </li>
            <li>
            <a href="/events"><span className="text-orange"> Events</span></a>
            </li>
            <li>{eventObject[0][0].headtitle}</li>
          </ol>
        </section>

        <section className="content">
          <div className="row">
            {eventObject[0][0].category.map(session =>
              (
                <CardEventSpecific  
                  eventid={eventObject[0][0].id} 
                  headtitle={eventObject[0][0].headtitle} 
                  category={session}
                />
              ))
            }
          </div>
        </section>
      </div>
    );
  }
}

export default EventBranch;