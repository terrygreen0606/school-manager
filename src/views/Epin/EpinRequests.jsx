/*!
Transaction
Developed by Amit Kumar
*/
import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Table,
  Tooltip
} from "react-bootstrap";
// react component that creates a switch button that changes from on to off mode
// import Switch from "react-bootstrap-switch";
import axios from 'axios';

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";
var globalVariables = require('../../services/globalVariables.jsx');
class EpinRequests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            contentList: [],
            selectedItem: null,
            setup_value: '',
            setup_key: ''
        };
        }
      
        componentDidMount() {
          let login_token = sessionStorage.getItem('login_token');
          axios.post(globalVariables.admin_api_path+'/ewallet/transaction', {model_call: 'Transaction', search_f:'transaction_id'}, {
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
              this.setState({contentList: data.response});
              console.log(this.state.contentList);
            })
        }

        

     
  render() {
    const edit = <Tooltip id="edit">View User Details</Tooltip>;
    
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                tableFullWidth
                content={
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Transaction ID</th>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Debit</th>
                        <th>Credit</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Remark</th>
                      </tr>
                    </thead>
                    <tbody>
                    { this.state.contentList.map((cotnentSingle, index_key) => (
                      <tr key={index_key}>
                        <td>{cotnentSingle.transaction_id}</td>
                        <td>{cotnentSingle.username} </td>
                        <td>{cotnentSingle.first_name}</td>
                        <td> {cotnentSingle.last_name}</td>
                        <td>{cotnentSingle.debit}</td>
                        <td>{cotnentSingle.credit}</td>
                        <td>{cotnentSingle.total}</td>
                        <td>
                            {(() => {
                                switch(cotnentSingle.status)
                                {
                                    case 1:
                                        return  <Button simple bsStyle="success" bsSize="xs"  fill> Succcess </Button>;
                                    case 0:
                                        return  <Button simple bsStyle="danger" bsSize="xs"  fill> Cancelled </Button>;
                                }
                            })()}
                        </td>
                        <td>{cotnentSingle.remark}</td>
                      </tr>
                    )) }
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default EpinRequests;
