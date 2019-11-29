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
import {
  Grid,
  Row,
  Col,
  Nav,
  NavItem,
  Tab
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";

class WithdrawalStaus extends Component {
  isMac() {
    let bool = false;
    if (
      navigator.platform.toUpperCase().indexOf("MAC") >= 0 ||
      navigator.platform.toUpperCase().indexOf("IPAD") >= 0
    ) {
      bool = true;
    }
    return bool;
  }
  render() {

    const tabs = (
      <Tab.Container id="tabs-with-dropdown" defaultActiveKey="info">
        <Row className="clearfix">
          <Col sm={12}>
            <Nav bsStyle="tabs">
              <NavItem eventKey="info">Active Requests</NavItem>
              <NavItem eventKey="account">Approved-Pending Requests</NavItem>
              <NavItem eventKey="style">Approved - Paid</NavItem>
              <NavItem eventKey="settings">Rejected Requests</NavItem>
            </Nav>
          </Col>
          <Col sm={12}>
            <Tab.Content animation>
              <Tab.Pane eventKey="info">
                Agency is a group of professional individuals looking to create
                amazing pieces of clothing. We have studied at the best schools
                of design, we have tailored the suits for the most stylish men
                in the industry, we are what you need!
              </Tab.Pane>
              <Tab.Pane eventKey="account">
                We are Houses Inc., a group of architects and interior designers
                based in Chicago and operating for clients worldwide. We’ve been
                designing stunningly beautiful houses and making clients happy
                for years.
              </Tab.Pane>
              <Tab.Pane eventKey="style">
                Explore a wide variety of styles, personalise your finishes, and
                let us design the perfect home for you. It's what we do best and
                you can see proof in the products and reviews below.
              </Tab.Pane>
              <Tab.Pane eventKey="settings">
                Explore a wide Houses Inc., a group of architects and interior
                designers based in Chicago and operating for clients worldwide.
                We’ve been designing stunningly beautiful houses and making
                clients happy for years.
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
    
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title=""
                content={tabs}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default WithdrawalStaus;
