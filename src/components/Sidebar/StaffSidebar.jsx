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
/*eslint-disable*/
import React, { Component } from "react";
import { Collapse } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
// this is used to create scrollbars on windows devices like the ones from apple devices
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.jsx";

// image for avatar in Sidebar
import avatar from "assets/img/default-avatar.png";
// logo for sidebar
import logo from "logo.png";

// import routes from "staffroutes.js";
import axios from 'axios';
import Dashboard from "views/Dashboard.jsx";
import BasicSettings from "views/Setup/BasicSettings.jsx";
import CommissionLimit from "views/Setup/CommissionLimit.jsx";
import LevelCommissionSetup from "views/Setup/LevelCommissionSetup.jsx";
import RepurchaseCommissionSetup from "views/Setup/RepurchaseCommission.jsx";
import RewardSetup from "views/Setup/RewardSetup.jsx";
import SmsSetup from "views/Setup/SmsSetup.jsx";
import EmailSetup from "views/Setup/EmailSetup.jsx";
import ReferralCommissionSetup from "views/Setup/ReferralCommissionSetup.jsx";
import PaypalSetup from "views/Setup/PaypalSetup.jsx";
import LanguageSettings from "views/Setup/LanguageSetup.jsx";
import WithdrawalSetup from "views/Setup/WithdrawalSetup.jsx";
import Profile from "views/Profile/Profile.jsx";
import Orders from "views/Orders/Orders.jsx";
import Buttons from "views/Components/Buttons.jsx";
import GridSystem from "views/Components/GridSystem.jsx";
import Panels from "views/Components/Panels.jsx";
import SweetAlert from "views/Components/SweetAlertPage.jsx";
import Notifications from "views/Components/Notifications.jsx";
import Icons from "views/Components/Icons.jsx";
import Typography from "views/Components/Typography.jsx";
import RegularForms from "views/Forms/RegularForms.jsx";
import ExtendedForms from "views/Forms/ExtendedForms.jsx";
import ValidationForms from "views/Forms/ValidationForms.jsx";
import Wizard from "views/Forms/Wizard/Wizard.jsx";
// import RegularTables from "views/Tables/RegularTables.jsx";
// import ExtendedTables from "views/Tables/ExtendedTables.jsx";
// import ReactTables from "views/Tables/ReactTables.jsx";
// import GoogleMaps from "views/Maps/GoogleMaps.jsx";
// import FullScreenMap from "views/Maps/FullScreenMap.jsx";
// import VectorMap from "views/Maps/VectorMap.jsx";
import Charts from "views/Charts.jsx";
// import Calendar from "views/Calendar.jsx";
// import UserPage from "views/Pages/UserPage.jsx";
import LoginPage from "views/Pages/LoginPage.jsx";
import Ewallet from "views/Ewallet/Ewallet";
import Transaction from "views/Ewallet/Transaction";
import WithdrawalOnWardTransaction from "views/Ewallet/WithdrawalOnwardTrans";
import CreditDebit from "views/Ewallet/CreditDebit";
import FundTransfer from "views/Ewallet/FundTransfer";
import TransferHistory from "views/Ewallet/TransferHistory";
import UserEarnings from "views/Ewallet/UserEarnings";
import WithdrawalStaus from "views/Ewallet/WithdrawalStatus";
import GlobalNotices from "views/Notice/GlobalNotices";
import NotificationSystem from "views/Notification/Notifications";
import UserOverview from "views/User/UserOverview";
import BusinessSummary from "views/Business/BusinessSummary";
import BusinessTransactions from "views/Business/BusinessTransaction";
import Epins from "views/Epin/Epins";
import EpinRequests from "views/Epin/EpinRequests";
import EpinAllocation from "views/Epin/EpinAllocation";
import ViewEpin from "views/Epin/ViewEpin";
import EpinTransfer from "views/Epin/EpinTransfer";
import About from "views/CMS/About";
import Contact from "views/CMS/Contact";
import Mission from "views/CMS/Mission";
import Vission from "views/CMS/Vision";
import FAQ from "views/CMS/Faq";
import Genealogy from "views/Downlines/Genealogy";
import Tabular from "views/Downlines/Tabular";
import EpinPackages from "views/Epin/EpinPackages";
import MemberList from "views/MemberManagement/MemberList";
import ChangeMPassword from "views/MemberManagement/ChangeMPassword";
import ChangeMTrsansactionPassword from "views/MemberManagement/ChangeMTransactionPassword";
import PayoutList from "views/Payout/Payoutlist";
import StaffList from "views/Staff/StaffList";
import BandList from "views/Staff/BandList";
import TeamList from "views/Staff/TeamList";
import TicketList from "views/SupportSystem/TicketList";
import TicketCategories from "views/SupportSystem/TicketCategories";
import OpenTickets from "views/SupportSystem/OpenTickets";
import ClosedTickets from "views/SupportSystem/ClosedTickets";
import Blogs from "views/Blogs/Blogs";
import EcommerceStore from "views/Ecommerce/EcommerceStore";
import Bulksms from "views/SMS/Bulksms";
import Bulkemail from "views/Email/Bulkemail";
import EditStaff from "views/Staff/EditStaff";
import AddUpdatePrivileges from "views/Staff/AddUpdatePrivileges";
var globalVariables = require("services/globalVariables.jsx");

var ps;
var globalVariables = require('../../services/globalVariables.jsx');
// const routes = [{
//   path: "/dashboard",
//   layout: "/staff",
//   name: "Dashboard",
//   icon: "pe-7s-graph",
//   component: Dashboard
// }];

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
     // ...this.getCollapseStates(routes),
      openAvatar: false,
      isWindows: navigator.platform.indexOf("Win") > -1 ? true : false,
      width: window.innerWidth,
      routes: []
    };
  }
  // this creates the intial state of this component based on the collapse routes
  // that it gets through this.props.routes
  getCollapseStates = routes => {
    let initialState = {};
    routes.map((prop, key) => {
      if(prop.invisible) return null;
      if (prop.collapse) {
        initialState = {
          [prop.state]: this.getCollapseInitialState(prop.views),
          ...this.getCollapseStates(prop.views),
          ...initialState
        };
      }
      return null;
    });
    return initialState;
  };
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.jsx - route /admin/regular-forms
  getCollapseInitialState(routes) {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && this.getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (window.location.href.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  }
  // this function creates the links and collapses that appear in the sidebar (left menu)
  createLinks = routes => {
    return routes.map((prop, key) => {
      if(prop.invisible) return null;
      if (prop.redirect) {
        return null;
      }
      if (prop.collapse) {
        var st = {};
        st[prop["state"]] = !this.state[prop.state];
        return (
          <li
            className={this.getCollapseInitialState(prop.views) ? "active" : ""}
            key={key}
          >
            <a
              href="#pablo"
              onClick={e => {
                e.preventDefault();
                this.setState(st);
              }}
            >
              <i className={prop.icon} />
              <p>
                {prop.name}
                <b
                  className={
                    this.state[prop.state] ? "caret rotate-180" : "caret"
                  }
                />
              </p>
            </a>
            <Collapse in={this.state[prop.state]}>
              <ul className="nav">{this.createLinks(prop.views)}</ul>
            </Collapse>
          </li>
        );
      }
      return (
        <li className={this.activeRoute(prop.layout + prop.path)} key={key}>
          <NavLink
            to={prop.layout + prop.path}
            className="nav-link"
            activeClassName="active"
          >
            {prop.icon ? (
              <>
                <i className={prop.icon} />
                <p>{prop.name}</p>
              </>
            ) : (
              <>
                <span className="sidebar-mini">{prop.mini}</span>
                <span className="sidebar-normal">{prop.name}</span>
              </>
            )}
          </NavLink>
        </li>
      );
    });
  };
  // verifies if routeName is the one active (in browser input)
  activeRoute = routeName => {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // if the windows width changes CSS has to make some changes
  // this functions tell react what width is the window
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidUpdate() {
    if (navigator.platform.indexOf("Win") > -1) {
      setTimeout(() => {
        ps.update();
      }, 350);
    }
  }
  componentDidMount() {
    this.updateDimensions();
    // add event listener for windows resize
    window.addEventListener("resize", this.updateDimensions.bind(this));
    // if you are using a Windows Machine, the scrollbars will have a Mac look
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebarWrapper, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }

let band_id = sessionStorage.getItem('band_id');
let login_token = sessionStorage.getItem('login_token');
axios.post(globalVariables.admin_api_path+'/band/single-band-data/'+band_id,  {band_id: band_id}, {
  headers: { Authorization: "Bearer " + login_token }
})
  .then(res => res.data).then((data) => {
    this.setState({routes: data.response});
  });
  }
  componentWillUnmount() {
    // we need to destroy the false scrollbar when we navigate
    // to a page that doesn't have this component rendered
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    return (
      <div
        className="sidebar"
        data-color={this.props.color}
        data-image={this.props.image}
      >
        {this.props.hasImage ? (
          <div
            className="sidebar-background"
            style={{ backgroundImage: "url(" + this.props.image + ")" }}
          />
        ) : (
          ""
        )}
        <div className="logo">
          {/*
          <a
            href="https://www.creative-tim.com?ref=lbdpr-sidebar"
            className="simple-text logo-mini"
            target="_blank"
          >
            <div className="logo-img">
               <img src={logo} alt="react-logo" /> 
            </div>
          </a>
          */}
          <Link to={'/'}
            className="simple-text logo-normal">
            <img src={logo} alt="react-logo" style={{height:'65px'}}/>
          </Link>
        </div>
        <div className="sidebar-wrapper" ref="sidebarWrapper">
          <div className="user">
            <div className="photo">
              <img src={(sessionStorage.getItem('profile_pic')) ? globalVariables.img_upload_path+sessionStorage.getItem('profile_pic') : avatar} alt="Avatar" />
            </div>
            <div className="info">
              <a
                href="#pablo"
                onClick={e => {
                  e.preventDefault();
                  this.setState({ openAvatar: !this.state.openAvatar });
                }}
              >
                <span>
                    {sessionStorage.getItem('first_name')} {sessionStorage.getItem('last_name')}
                  <b
                    className={
                      this.state.openAvatar ? "caret rotate-180" : "caret"
                    }
                  />
                </span>
              </a>
              <Collapse in={this.state.openAvatar}>
                <ul className="nav">
                  <li>
                    <Link to={'profile'}>
                      <span className="sidebar-mini">MP</span>
                      <span className="sidebar-normal">My Profile</span>
                    </Link>
                  </li>
                  { /*
                  <li>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <span className="sidebar-mini">EP</span>
                      <span className="sidebar-normal">Edit Profile</span>
                    </a>
                  </li>
                  */ }
                  <li>
                    <Link to={'dashboard'}>
                      <span className="sidebar-mini">D</span>
                      <span className="sidebar-normal">Dashboard</span>
                    </Link>
                  </li>
                </ul>
              </Collapse>
            </div>
          </div>
          <ul className="nav">
            {/*
              If we are on responsive, we want both links from navbar and sidebar
              to appear in sidebar, so we render here HeaderLinks
            */}
            {this.state.width <= 992 ? <AdminNavbarLinks /> : null}
            {/*
              here we render the links in the sidebar if the link is simple,
              we make a simple link, if not, we have to create a collapsible group,
              with the speciffic parent button and with it's children which are the links
            */}
            {this.createLinks(this.state.routes)}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
