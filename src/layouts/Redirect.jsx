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
import {Redirect } from "react-router-dom";

var ps;

class RedirectDashboard extends Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    if(sessionStorage.getItem('login_token'))
    {
      switch(sessionStorage.getItem('roles_key'))
      {
        case "STAFF":
          return (
            <Redirect to={'/staff/dashboard'} />
          );
          break;
        case "MEMBER":
          return (
            <Redirect to={'/member/dashboard'} />
          );
          break;
        case "ADMIN":
          return (
            <Redirect to={'/admin/dashboard'} />
          );
          break;
        default:
          return (
            <Redirect to={'/auth/login'} />
          );
          break;

      } 
      // return (
      //   <Redirect to={'/'} />
      // );
    }
    return (
      <Redirect to={'/auth/login'} />
    );
  }
}

export default RedirectDashboard;
