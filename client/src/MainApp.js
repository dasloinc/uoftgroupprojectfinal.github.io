import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Default Webpage
import Header from "./components/pages/supplementary/Header";
import Sidebar from "./components/pages/supplementary/Sidebar";
import Footer from "./components/pages/supplementary/Footer";
// Routes
// import SignIn from "./components/pages/signin/SignIn";
// import SignUp from "./components/pages/signup/SignUp";
import Home from "./components/pages/homepage/Home";
import Event from "./components/pages/eventroot/Event";
import EventBranch from "./components/pages/eventbranch/EventBranch";
import CreateEvent from "./components/pages/creat_event/CreateEvent";
import ViewAll from "./components/pages/viewall/ViewAll";
import JoinInEvent from "./components/pages/join_in_event/JoinInEvent";



class MainApp extends Component {
  render() {
    return (
      <Router>
        {/* <Route exact path="/" component={SignIn} />
        <Route exact path="/signup" component={SignUp} /> */}
        
        <div className="wrapper">
          <Header />
          <Sidebar />
          <Route exact path="/home" component={Home} />
          <Route exact path="/events" component={Event} />
          <Route path="/events~category=:id" component={EventBranch} />
          <Route exact path="/create-event=:id" component={CreateEvent} />
          <Route exact path="/join-in-event=:id" component={JoinInEvent} />
          <Route exact path="/viewall" component={ViewAll} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default MainApp;
