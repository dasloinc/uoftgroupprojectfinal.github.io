import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Routes


import SignIn from "./components/pages/signin/SignIn";
import SignUp from "./components/pages/signup/SignUp";
import MainApp from "./MainApp";

class App extends Component {
  
//   constructor(props) {
//    super (props);
//    this.state = {
//      isAuthenticated: false
//    };
//    this.setAuthenticated = this.setAuthenticated.bind(this)
//  }

//   setAuthenticated (authValue){
//    this.setState({isAuthenticated : authValue})
//   } 

  render() {
    return (
      <Router>
        
        {/* {!this.state.isAuthenticated ? 
        (
          <React.Fragment>
            <Route exact path="/" component={()=><SignIn setAuthenticated={this.setAuthenticated}/>} />
            <Route exact path="/signup" component={SignUp} />
          </React.Fragment>
        ) : 
        (
        <div className="wrapper">
          <Header />
          <Sidebar />
          <Route exact path="/home" component={Home} />
          <Route exact path="/events" component={Event} />
          <Route path="/events~category=:id" component={EventBranch} />
          <Route exact path="/create-event=:id" component={CreateEvent} />
          <Route exact path="/join-in-event=:id" component={JoinInEvent} />
          <Route exact path="viewall" component={ViewAll} />
          <Footer />
        </div>
        )
        } */}

            <Route exact path="/" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />

          <Route  path="/home" component={MainApp} />
          <Route  path="/events" component={MainApp} />
          <Route  path="/events~category=:id" component={MainApp} />
          <Route  path="/create-event=:id" component={MainApp} />
          <Route  path="/join-in-event=:id" component={MainApp} />
          <Route  path="/viewall" component={MainApp} />
      </Router>
    );
  }
}

export default App;
