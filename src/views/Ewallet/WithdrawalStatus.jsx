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
  Tab,
  Table,
  Tooltip,
  OverlayTrigger
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from 'axios';
var globalVariables = require('../../services/globalVariables.jsx');
class WithdrawalStaus extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showModal: false,
        contentList: {['active_requests']:[], ['approved_pending_requests']:[], ['approved_paid_requests']:[], ['rejected_requests']:[]},
        selectedItem: null,
        setup_value: '',
        setup_key: '',
        no_of_epin: '',
        amount: '',
        expiry_date: '',
        packageList: '',
        TotalRecords: 0,
        ActivePage: 1
    };
    }

    componentDidMount() {
      let login_token = sessionStorage.getItem('login_token');
      axios.post(globalVariables.admin_api_path+'/ewallet/withdrawal-requests', {}, {
        headers: { Authorization: "Bearer " + login_token }
      })
        .then(res => res.data).then((data) => {
          console.log(data);
          this.setState({contentList: data.response});
          console.log(this.state.contentList);
        });
    }
    
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

  change_status = (i, id, status) => {
    const SetupItem = this.state.contentList['active_requests'][i];
    let login_token = sessionStorage.getItem('login_token');
    axios.post(globalVariables.admin_api_path+'/ewallet/update-withdrawal-status', {id: id, status: 1, payment_status: status}, {
      headers: { Authorization: "Bearer " + login_token }
    }).then(res => {
      this.props.handleClick("tr", 1, "Status updated Successfully");
      axios.post(globalVariables.admin_api_path+'/ewallet/withdrawal-requests', {}, {
        headers: { Authorization: "Bearer " + login_token }
      }).then(res => res.data).then((data) => {
        console.log(data);
        this.setState({contentList: data.response});
        console.log(this.state.contentList);
      })
    }).catch(error => {
      this.props.handleClick("tr", 3, error.response.data.msg);
    });
     console.log(SetupItem);
  };
  render() {
    const approved = <Tooltip id="approve_request">Approve Request</Tooltip>;
    const reject = <Tooltip id="reject_request">Reject Request</Tooltip>;
    const approved_paid = <Tooltip id="approve__pay_request">Approve and Paid</Tooltip>;
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
              
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Phone Number</th>
                        <th>Payment Type</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    { this.state.contentList['active_requests'].map((cotnentSingle, index_key) => (
                      <tr key={index_key}>
                        <td>{(this.state.ActivePage-1)*10+index_key+1}</td>
                        <td>{cotnentSingle.username} </td>
                        <td>{cotnentSingle.first_name + ' ' + cotnentSingle.last_name}</td>
                        <td>{cotnentSingle.phone_number}</td>
                        <td>{cotnentSingle.payment_type}</td>
                        <td>{cotnentSingle.amount}</td>
                        <td>{cotnentSingle.created_at}</td>
                        <td>{cotnentSingle.expiry_date}</td>
                        <td><OverlayTrigger placement="top" overlay={approved}>
                            <Button simple bsStyle="primary" bsSize="xs"  fill  onClick={() => this.change_status(index_key, cotnentSingle.id, 2)}>
                                 <i className="fa fa-check" />
                            </Button>
                            </OverlayTrigger>

                            <OverlayTrigger placement="top" overlay={approved_paid}>
                            <Button simple bsStyle="success" bsSize="xs"  fill  onClick={() => this.change_status(index_key, cotnentSingle.id, 1)}>
                                 <i className="fa fa-check" />
                            </Button>
                            </OverlayTrigger>

                            <OverlayTrigger placement="top" overlay={reject}>
                            <Button simple bsStyle="danger" bsSize="xs"  fill   onClick={() => this.change_status(index_key, cotnentSingle.id, 3)}>
                                 <i className="fa fa-times" />
                            </Button>
                            </OverlayTrigger>
                            </td>
                      </tr>
                    )) }
                    </tbody>
                  </Table>
              </Tab.Pane>
              <Tab.Pane eventKey="account">
              <Table responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Phone Number</th>
                        <th>Payment Type</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    { this.state.contentList['approved_pending_requests'].map((cotnentSingle, index_key) => (
                      <tr key={index_key}>
                        <td>{(this.state.ActivePage-1)*10+index_key+1}</td>
                        <td>{cotnentSingle.username} </td>
                        <td>{cotnentSingle.first_name + ' ' + cotnentSingle.last_name}</td>
                        <td>{cotnentSingle.phone_number}</td>
                        <td>{cotnentSingle.payment_type}</td>
                        <td>{cotnentSingle.amount}</td>
                        <td>{cotnentSingle.created_at}</td>
                        <td>
                        <OverlayTrigger placement="top" overlay={approved_paid}>
                            <Button simple bsStyle="success" bsSize="xs"  fill  onClick={() => this.change_status(index_key, cotnentSingle.id, 1)}>
                                 <i className="fa fa-check" />
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    )) }
                    </tbody>
                  </Table>
              </Tab.Pane>
              <Tab.Pane eventKey="style">
              <Table responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Phone Number</th>
                        <th>Payment Type</th>
                        <th>Amount</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                    { this.state.contentList['approved_paid_requests'].map((cotnentSingle, index_key) => (
                      <tr key={index_key}>
                        <td>{(this.state.ActivePage-1)*10+index_key+1}</td>
                        <td>{cotnentSingle.username} </td>
                        <td>{cotnentSingle.first_name + ' ' + cotnentSingle.last_name}</td>
                        <td>{cotnentSingle.phone_number}</td>
                        <td>{cotnentSingle.payment_type}</td>
                        <td>{cotnentSingle.amount}</td>
                        <td>{cotnentSingle.created_at}</td>
                      </tr>
                    )) }
                    </tbody>
                  </Table>
              </Tab.Pane>
              <Tab.Pane eventKey="settings">
              <Table responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Phone Number</th>
                        <th>Payment Type</th>
                        <th>Amount</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                    { this.state.contentList['rejected_requests'].map((cotnentSingle, index_key) => (
                      <tr key={index_key}>
                        <td>{(this.state.ActivePage-1)*10+index_key+1}</td>
                        <td>{cotnentSingle.username} </td>
                        <td>{cotnentSingle.first_name + ' ' + cotnentSingle.last_name}</td>
                        <td>{cotnentSingle.phone_number}</td>
                        <td>{cotnentSingle.payment_type}</td>
                        <td>{cotnentSingle.amount}</td>
                        <td>{cotnentSingle.created_at}</td>
                      </tr>
                    )) }
                    </tbody>
                  </Table>
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
