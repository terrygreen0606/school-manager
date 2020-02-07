/*!

=========================================================
* Light Bootstrap Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
// this is used to create scrollbars on windows devices like the ones from apple devices
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// react component that creates notifications (like some alerts with messages)
import NotificationSystem from "react-notification-system";

import Sidebar from "components/Sidebar/Sidebar.jsx";
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";

import image from "assets/img/full-screen-image-3.jpg";

// dinamically create dashboard routes
import routes from "routes.js";
import staffroutes from "staffroutes.js";
import axios from 'axios';

// style for notifications
import { style } from "variables/Variables.jsx";
var globalVariables = require('../services/globalVariables.jsx');

var ps;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null,
      image: image,
      color: "black",
      hasImage: true,
      navbar: false,
      mini: false,
      fixedClasses: "dropdown show-dropdown open",
      Band_Access: []
    };
  }
  componentDidMount() {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
    let roles_key = sessionStorage.getItem('roles_key');
    console.log(roles_key);
    if(roles_key == 'STAFF')
    {
      let band_id = sessionStorage.getItem('roles_key');
      let login_token = sessionStorage.getItem('login_token');
      axios.post(globalVariables.admin_api_path+'/band/band-privileges-allow',  {band_id: band_id}, {
        headers: { Authorization: "Bearer " + login_token }
      })
        .then(res => res.data).then((data) => {
          this.setState({Band_Access: data.response});
        });
    }
  }
  componentDidUpdate(e) {
    if (navigator.platform.indexOf("Win") > -1) {
      setTimeout(() => {
        ps.update();
      }, 350);
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
    if (
      window.innerWidth < 993 &&
      e.history.action === "PUSH" &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
  }
  componentWillMount() {
    if (document.documentElement.className.indexOf("nav-open") !== -1) {
      document.documentElement.classList.toggle("nav-open");
    }
  }
  // function that shows/hides notifications - it was put here, because the wrapper div has to be outside the main-panel class div
  handleNotificationClick = (position, level= 1, message = "Hello World") => {
    var color = level;
    var icon = 'pe-7s-gift';
    switch (color) {
      case 1:
        level = "success";
        icon = 'pe-7s-like2';
        break;
      case 2:
        level = "warning";
        icon = "pe-7s-info";
        break;
      case 3:
        level = "error";
        icon = 'pe-7s-attention';
        break;
      case 4:
        level = "info";
        icon = "pe-7s-info";
        break;
      default:
        break;
    }
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className={icon} />,
      message: (
        <div>
         {message}
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 10
    });
  };
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleHasImage = hasImage => {
    this.setState({ hasImage: hasImage });
  };
  handleNavbarClick = navbar => {
    this.setState({ navbar: navbar });
  };
  handleMiniClick = () => {
    this.setState({ mini: !this.state.mini });
    document.body.classList.toggle("sidebar-mini");
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show-dropdown open" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  handleCheck = val => {
    let Band_Access = this.state.Band_Access;
    let is_allow = 0;
    Band_Access.forEach(function(item){
      if(item.path == val.path)
      {
        is_allow = 1;
      }
    });
    return is_allow;
}
  getRoutes = routes => {
    let roles_key = sessionStorage.getItem('roles_key');
    if(roles_key == 'STAFF')
    {
      return routes.map((prop, key) => {
        if(this.handleCheck(prop) == 1)
        {
          if (prop.collapse) {
            return this.getRoutes(prop.views);
          }
          if (prop.layout === "/admin") {
            return (
              <Route
                path={prop.layout + prop.path}
                key={key}
                render={routeProps => (
                  <prop.component
                    {...routeProps}
                    handleClick={this.handleNotificationClick}
                  />
                )}
              />
            );
          } else {
            return null;
          }
        }
      });
    }
    else
    {
      return routes.map((prop, key) => {
        if (prop.collapse) {
          return this.getRoutes(prop.views);
        }
        if (prop.layout === "/admin") {
          return (
            <Route
              path={prop.layout + prop.path}
              key={key}
              render={routeProps => (
                <prop.component
                  {...routeProps}
                  handleClick={this.handleNotificationClick}
                />
              )}
            />
          );
        } else {
          return null;
        }
      });
    }
  };
  render() {
    let roles_key = sessionStorage.getItem('roles_key');
    return (
      <div className="wrapper">
        <NotificationSystem ref="notificationSystem" style={style} />
        <Sidebar
          {...this.props}
          image={this.state.image}
          color={this.state.color}
          hasImage={this.state.hasImage}
          mini={this.state.mini}
        />
        <div
          className={
            "main-panel" +
            (this.props.location.pathname === "/maps/full-screen-maps"
              ? " main-panel-maps"
              : "")
          }
          ref="mainPanel"
        >
          <AdminNavbar
            {...this.props}
            handleMiniClick={this.handleMiniClick}
            navbar={this.state.navbar}
          />
          <Switch>{(roles_key == 'STAFF') ? (this.getRoutes(staffroutes)) : ((roles_key === 'MEMBER') ? (this.getRoutes(routes)) : (this.getRoutes(routes)))}</Switch>
          <Footer fluid />
        </div>
      </div>
    );
  }
}

export default Dashboard;
