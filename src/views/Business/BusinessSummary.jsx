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
class BusinessSummary extends Component {
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
          axios.post(globalVariables.admin_api_path+'/ewallet/summery', {}, {
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
                        <th>Transaction Category</th>
                        <th>Credited Amount</th>
                        <th>Debited Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                    { this.state.contentList.map((cotnentSingle, index_key) => (
                      <tr key={index_key}>
                        <td>{cotnentSingle.transaction_type_text}</td>
                        <td>{cotnentSingle.credit} </td>
                        <td>{cotnentSingle.debit}</td>
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

export default BusinessSummary;
