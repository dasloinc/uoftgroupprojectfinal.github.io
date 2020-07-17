import React, { useState } from "react";
import Maps from "../supplementary/Maps";

import "../../css/style_createEvent.css";

import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

//Materialize UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

//API requests
import createEventAPI from "../../../API/eventAPI";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateEvent = props => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem('token'));
    const userId = token.uid;
    // const userName = token.ue;

    if (createEventSuccess()) {
      createEventAPI (
        {
          signedUpUsers: userId,
          eventCreaterID:userId,
          eventType:     eventType,
          eventCategory: eventCategory,
          eventName:     eventTitle, 
          participants:  eventParticipants, 
          eventDate:     eventDate,
          eventStart:    eventStartTime,
          eventEnd:      eventEndTime,
          notes:         eventNotes,
          location:      eventSelectedAddress
        }
      );
      props.history.push('/viewall');
    }
    else {
      handleClickOpen();
    }
  };

  const createEventSuccess = () => {
    if (!eventType            ||
        !eventCategory        ||
        !eventTitle           ||
        !eventParticipants    ||
        !eventDate            ||
        !eventStartTime       ||
        !eventEndTime         ||
        !eventSelectedAddress
       )
      return false;
    else
      return true;
  };

  const headTitle  = (window.location.href).substring((window.location.href).indexOf("=") + 1, (window.location.href).length);
  const hrefCancel = `/events~category=${(headTitle).substring(0, (headTitle).indexOf(":"))}`;

  const participants = [2, 3, 4, 5, 10, 20, 30];

  const [eventTitle,           setEventTitle]           = useState(null);
  const [eventParticipants,    setEventParticipants]    = useState(participants[0]);
  const [eventDate,            setEventDate]            = useState(null);
  const [eventStartTime,       setEventStartTime]       = useState(null);
  const [eventEndTime,         setEventEndTime]         = useState(null);
  const [eventNotes,           setEventNotes]           = useState(null);
  const [eventSelectedAddress, setEventSelectedAddress] = useState(null);
  const [eventDescription,     setEventDescription    ] = useState(null);

  const eventType     = headTitle.substring(0, headTitle.indexOf("@"));
  const eventCategory = headTitle.substring(headTitle.indexOf(":") + 1, headTitle.length);

  // const FORMAT = 'MM/dd/yyyy';
  function disabledSeconds(h, m) {
    return [h + (m % 60)];
  }

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>
          <strong>{eventType.toUpperCase()}:</strong> {eventCategory.replace(/%20/g, " ")}
          <small><i>"<strong>to.gather</strong> makes it possible!"</i></small>
        </h1>
      </section>

      <div className="form-container1">
        <div id="toast"></div>
        <form action="" className="form" onSubmit={handleSubmit}>
          <div className="row createEvent-container">
            <div className="form small-12 medium-3 large-3 column">
              <div className="form-group">
                <label htmlFor="event-title" id="form-event-title">
                  Event title
                </label>
                <div id="i-have-a-tooltip" data-description="Name your event">
                  <input
                    type="text"
                    className="form-control"
                    id="txtEventTitle"
                    aria-describedby="emailHelp"
                    onChange={ (e) => setEventTitle(e.target.value) }
                    value={eventTitle}
                    placeholder="Event Title *"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Participants</label>
                <select
                  className="form-control"
                  id="form-participants"
                  onChange={(e) => setEventParticipants(e.target.value)}
                >
                  {participants.map((pnumber) => (
                    <option value={pnumber}>{pnumber}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="exampleFormControlSelect1">Event date: </label>
                <DayPickerInput
                  onDayChange={ (day) => setEventDate(day.toString().substring(4, day.toString().indexOf(":") - 3)) }
                />
              </div>

              <div className="form-group createEvent-time-form">
                <label htmlFor="exampleFormControlSelect1">Event start: </label>
                <TimePicker
                  style={{ width: 80 }}
                  showSecond={false}
                  minuteStep={5}
                  disabledSeconds={disabledSeconds}
                  onChange={ (value) => setEventStartTime(value && value.format("HH:mm")) }
                  use12Hours
                  inputReadOnly
                />
              </div>

              <div className="form-group createEvent-time-form">
                <label htmlFor="exampleFormControlSelect1">Event end: </label>
                <TimePicker
                  style={{ width: 80 }}
                  showSecond={false}
                  minuteStep={5}
                  disabledSeconds={disabledSeconds}
                  onChange={ (value) => setEventEndTime(value && value.format("HH:mm")) }
                  use12Hours
                  inputReadOnly
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Additional notes</label>
                <div id="i-have-a-tooltip" data-description="Your rules!">
                  <textarea
                    id="exampleFormControlTextarea1"
                    className="form-control createEvent-textarea"
                    rows="10"
                    onChange={ (e) => setEventNotes(e.target.value) }
                    value={eventNotes}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="small-12 medium-3 large-3  column createEvent-right-row" id="form-notes">
              <div className="form-group">
                <label htmlFor="event-title" id="form-event-title">Location</label>
                <div id="i-have-a-tooltip" data-description="Address">
                  <input
                    value={eventSelectedAddress}
                    onChange={ (e) => setEventSelectedAddress(e.target.value) }
                    type="text"
                    className="form-control"
                    id="eventAddress"
                    aria-describedby="eventLocation"
                    disabled
                  />
                </div>
              </div>

              <div>
                <p>{!eventDescription || eventDescription === "" ? "" : "Description: "}<i>{!eventDescription || eventDescription === "" ? "" : eventDescription}</i></p>
              </div>

              <div id="i-have-a-tooltip" data-description="Your rules!">
                <section className="map-content">

                  <Maps onDescriptionchange={description => setEventDescription (description)} onAddresschange={address => setEventSelectedAddress(address)} type={eventCategory} />

                </section>
              </div>
            </div>
          </div>

          <div className="createEvent-button">
            <button
              id="create-event-btn"
              type="submit"
              className="btn btn-md btn-success createEvent-m-ml"
              // onClick=""
            >
              Create event
            </button>

            <a href={hrefCancel} className="btn-custom btn-danger btn-md createEvent-m-ml createEvent-d-inline">Cancel</a>
          </div>
        </form>
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Oops!! Sorry, your event was not created successfully."}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            It looks like you haven't completed the form before creating an event.
            {"\n"}
            Please, fill-up the form and be amazed by your new event.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Awesome
          </Button>
        </DialogActions>
      </Dialog>
    </div>              
  );
};
export default CreateEvent;
