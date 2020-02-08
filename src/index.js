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
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "assets/sass/light-bootstrap-dashboard-pro-react.scss?v=1.2.0";
import "assets/css/demo.css";
import "assets/css/pe-icon-7-stroke.css";

import AuthLayout from "layouts/Auth.jsx";
import AdminLayout from "layouts/Admin.jsx";
import StaffLayout from "layouts/Staff.jsx";
import PublicLayout from "layouts/Public.jsx";
import MemberLayout from "layouts/Member.jsx";

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/member" render={props => <MemberLayout {...props} />} />
      <Route path="/staff" render={props => <StaffLayout {...props} />} />
      <Route path="/home" render={props => <PublicLayout {...props} />} />
      <Redirect from="/" to="/home/index" />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
