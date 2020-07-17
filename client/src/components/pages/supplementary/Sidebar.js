import React, { Component } from "react";
import togatherList from "../supplementary/togather.json";
// CSS
import "../../css/togather.css";


class Sidebar extends Component {
  state = {
    togatherList,
    name : "Anonymous"
  };

  componentWillMount() {
    let name = localStorage.getItem('userEmail')
    console.log(name)
    if (!name){name="Anonymous"} 
    this.setState({name : name})
  }

  render() {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <div className="user-panel">
            <div className="pull-left image">
              <img src="./assets/icons/anonymous.png" className="img-circle" alt="User" />
            </div>
            <div className="pull-left info">
              <span>{this.state.name}</span>
              <p><i className="fas fa-check-double text-lime"></i> Online</p>
            </div>
          </div>
          {/* <form action="#" method="get" className="sidebar-form">
            <div className="input-group">
              <input type="text" name="q" className="form-control" placeholder="Search..." />
              <span>
                <button type="submit" name="search" id="search-btn" className="btn btn-flat">
                  <i className="fa fa-search"></i>
                </button>
              </span>
            </div>
          </form> */}
          <ul className="sidebar-menu" data-widget="tree">
            <li className="header">MAIN</li>
            {/* <li className="treeview"> */}
            <li>
              <a href="/events">
                <i className="far fa-list-alt"></i>
                <span className="m-l-sm">Events</span>
                {/* <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right"></i>
                </span> */}
              </a>
              <ul className="treeview-menu">
                {/* ROUTE to every card event */}
                {this.state.togatherList.map(togather => (
                  togather.events.map((events, index) => (
                    <li key={index}>
                      <a href={events.href}>
                        {events.headtitle}
                        {events.badge &&
                          <span className="pull-right-container">
                            <span className={((events.badge).toLowerCase() === "new" ? "label pull-right bg-green" : "label pull-right bg-purple")}>{events.badge}</span>
                          </span>
                        }
                      </a>
                    </li>
                  ))
                ))}
              </ul>
            </li> 
            <li className="header">MORE FEATURES</li> 
            <li>
              <a href="/viewall">
                <i className="far fa-eye"></i>
                <span className="m-l-sm">View All</span>
              </a>
            </li>     
          </ul>
        </section>
      </aside>

    );
  }
}

export default Sidebar;

