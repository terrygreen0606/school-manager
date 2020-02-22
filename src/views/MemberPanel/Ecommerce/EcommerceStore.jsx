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
  PanelGroup,
  Panel,
  Nav,
  NavItem,
  Tab
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";

class EcommerceStore extends Component {
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
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={8} mdOffset={2}>
              <Card
                title="E-Commerce Store"
                category=""
                content={
                  <div>
                    <p>
                      Visit our ecommerce store by clicking following link.
                    </p>
                    <p>
                     <a href="https://google.com" target="_blank">E-Commerce Store</a>
                    </p>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default EcommerceStore;
