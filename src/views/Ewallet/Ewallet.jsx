/*!
eWallet Summery
Developed by Amit Kumar
*/
import React, { Component } from "react";
import {
    Modal,
  Grid,
  Row,
  Col,
  Table,
  OverlayTrigger,
  Tooltip,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
// react component that creates a switch button that changes from on to off mode
// import Switch from "react-bootstrap-switch";
import axios from 'axios';

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";
var globalVariables = require('../../services/globalVariables.jsx');
class Ewallet extends Component {
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
          axios.post(globalVariables.admin_api_path+'/member/search-member', {roles_key: 'MEMBER', model_call: 'User', search_f:'first_name, last_name'}, {
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
                        <th>Username</th>
                        <th>Email ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>eWallet Status</th>
                        <th>eWallet Amount</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    { this.state.contentList.map((cotnentSingle, index_key) => (
                      <tr key={index_key}>
                        <td>{cotnentSingle.username}</td>
                        <td>{cotnentSingle.email} </td>
                        <td>{cotnentSingle.first_name}</td>
                        <td> {cotnentSingle.last_name}</td>
                        <td>
                            {(() => {
                                switch(cotnentSingle.status)
                                {
                                    case 1:
                                        return  <Button simple bsStyle="success" bsSize="xs"  fill> Active </Button>;
                                    case 0:
                                        return  <Button simple bsStyle="primary" bsSize="xs"  fill> Block </Button>;
                                }
                            })()}
                        </td>
                    <td>{(cotnentSingle.wallet_amount) ? cotnentSingle.wallet_amount : 0 }</td>
                        <td className="td-actions text-right">
                            <OverlayTrigger placement="top" overlay={edit}>
                            <Button simple bsStyle="primary" bsSize="xs"  fill>
                                <i className="fa fa-eye" />
                            </Button>
                            </OverlayTrigger>
                        </td>
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

export default Ewallet;
