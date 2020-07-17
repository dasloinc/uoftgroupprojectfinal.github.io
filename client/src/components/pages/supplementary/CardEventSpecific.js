import React from "react";
import "../../css/cardevent.css";

function CardEventSpecific(props) {
  const hrefNewEvent = `/create-event=${props.headtitle}@10${props.eventid}:${props.category.title}`;
  const hrefJoinEvent = `/join-in-event=${props.headtitle}@10${props.eventid}:${props.category.title}`;

  return (
    <div className="event-full" id={props.category.title}>
      <img src={props.category.src_img} alt={props.category.src_img} className="event-img"></img>
      <span className="back-text">{props.category.title}</span>
      
      <span className="card-button">
        <a href={hrefNewEvent} className="default-btn br-l effect-btn top" data-tooltip="New Event" data-position="top">
          <i className="fas fa-user-edit icon-btn"></i>
        </a>
        <a href={hrefJoinEvent} className="default-btn br-b effect-btn top" data-tooltip="Join In" data-position="top">  
          <i className="fas fa-users icon-btn"></i>
        </a>
      </span>
    </div>
  );
}

export default CardEventSpecific;