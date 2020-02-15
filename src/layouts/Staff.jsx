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

import Sidebar from "components/Sidebar/StaffSidebar.jsx";
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";

import image from "assets/img/hope-bg.jpeg";

// dinamically create dashboard routes
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
// import NotificationSystem from "views/Notification/Notifications";
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

// style for notifications
import { style } from "variables/Variables.jsx";

var ps;
var globalVariables = require('../services/globalVariables.jsx');
//const routes = [];

class StaffDashboard extends Component {
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
      routes: []
    };
  }
  componentDidMount() {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.mainPanel);
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
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
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
  getRoutes = routes => {
    console.log(routes);
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/staff") {
        let propcomp = (prop.component).trim();
        console.log(propcomp);
        switch(propcomp)
        {
          case 'Dashboard':
            return (
              <Route
                path={prop.layout + prop.path}
                key={key}
                render={routeProps => (
                  <Dashboard
                    {...routeProps}
                    handleClick={this.handleNotificationClick}
                  />
                )}
              />
            );
            break;
            case 'BasicSettings':
              return (
                <Route
                  path={prop.layout + prop.path}
                  key={key}
                  render={routeProps => (
                    <BasicSettings
                      {...routeProps}
                      handleClick={this.handleNotificationClick}
                    />
                  )}
                />
              );
              break;
              case 'CommissionLimit':
                return (
                  <Route
                    path={prop.layout + prop.path}
                    key={key}
                    render={routeProps => (
                      <CommissionLimit
                        {...routeProps}
                        handleClick={this.handleNotificationClick}
                      />
                    )}
                  />
                );
                break;
                case 'LevelCommissionSetup':
                  return (
                    <Route
                      path={prop.layout + prop.path}
                      key={key}
                      render={routeProps => (
                        <LevelCommissionSetup
                          {...routeProps}
                          handleClick={this.handleNotificationClick}
                        />
                      )}
                    />
                  );
                  break;
                  case 'RepurchaseCommissionSetup':
                    return (
                      <Route
                        path={prop.layout + prop.path}
                        key={key}
                        render={routeProps => (
                          <RepurchaseCommissionSetup
                            {...routeProps}
                            handleClick={this.handleNotificationClick}
                          />
                        )}
                      />
                    );
                    break;
                    case 'Dashboard':
                      return (
                        <SmsSetup
                          path={prop.layout + prop.path}
                          key={key}
                          render={routeProps => (
                            <SmsSetup
                              {...routeProps}
                              handleClick={this.handleNotificationClick}
                            />
                          )}
                        />
                      );
                      break;
                      case 'EmailSetup':
                        return (
                          <Route
                            path={prop.layout + prop.path}
                            key={key}
                            render={routeProps => (
                              <EmailSetup
                                {...routeProps}
                                handleClick={this.handleNotificationClick}
                              />
                            )}
                          />
                        );
                        break;
                        case 'ReferralCommissionSetup':
                          return (
                            <Route
                              path={prop.layout + prop.path}
                              key={key}
                              render={routeProps => (
                                <ReferralCommissionSetup
                                  {...routeProps}
                                  handleClick={this.handleNotificationClick}
                                />
                              )}
                            />
                          );
                          break;
                          case 'PaypalSetup':
                          return (
                            <Route
                              path={prop.layout + prop.path}
                              key={key}
                              render={routeProps => (
                                <PaypalSetup
                                  {...routeProps}
                                  handleClick={this.handleNotificationClick}
                                />
                              )}
                            />
                          );
                          break;
                          case 'LanguageSettings':
                          return (
                            <Route
                              path={prop.layout + prop.path}
                              key={key}
                              render={routeProps => (
                                <LanguageSettings
                                  {...routeProps}
                                  handleClick={this.handleNotificationClick}
                                />
                              )}
                            />
                          );
                          break;
                          case 'WithdrawalSetup':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <WithdrawalSetup
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;                            
                            case 'Profile':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <Profile
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'Orders':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <Orders
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'Ewallet':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <Ewallet
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'Transaction':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <Transaction
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'WithdrawalOnWardTransaction':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <WithdrawalOnWardTransaction
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'CreditDebit':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <CreditDebit
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'FundTransfer':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <FundTransfer
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'TransferHistory':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <TransferHistory
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'UserEarnings':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <UserEarnings
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'WithdrawalStaus':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <WithdrawalStaus
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'GlobalNotices':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <GlobalNotices
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'UserOverview':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <UserOverview
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'BusinessSummary':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <BusinessSummary
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'BusinessTransactions':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <BusinessTransactions
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'EpinAllocation':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <EpinAllocation
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'Epins':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <Epins
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'EpinRequests':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <EpinRequests
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'ViewEpin':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <ViewEpin
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'EpinTransfer':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <EpinTransfer
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'About':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <About
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'Contact':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <Contact
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'Mission':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <Mission
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'Vission':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <Vission
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'FAQ':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <FAQ
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'Genealogy':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <Genealogy
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'Tabular':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <Tabular
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'EpinPackages':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <EpinPackages
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'MemberList':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <MemberList
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'ChangeMPassword':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <ChangeMPassword
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'ChangeMTrsansactionPassword':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <ChangeMTrsansactionPassword
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'PayoutList':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <PayoutList
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'StaffList':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <StaffList
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'BandList':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <BandList
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'TeamList':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <TeamList
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'TicketList':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <TicketList
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'TicketCategories':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <TicketCategories
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'OpenTickets':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <OpenTickets
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'ClosedTickets':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <ClosedTickets
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'Blogs':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <Blogs
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'EcommerceStore':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <EcommerceStore
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'Bulksms':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <Bulksms
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'Bulkemail':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <Bulkemail
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'EditStaff':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <EditStaff
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                            case 'AddUpdatePrivileges':
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <AddUpdatePrivileges
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
                          
                          default :
                            return (
                              <Route
                                path={prop.layout + prop.path}
                                key={key}
                                render={routeProps => (
                                  <propcomp
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />
                                )}
                              />
                            );
                            break;
        }
      } else {
        return null;
      }
    });
  };
  render() {
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
          <Switch>{this.getRoutes(this.state.routes)}</Switch>
          <Footer fluid />
        </div>
      </div>
    );
  }
}

export default StaffDashboard;
