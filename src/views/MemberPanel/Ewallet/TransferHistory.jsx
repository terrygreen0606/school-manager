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
var globalVariables = require('../../../services/globalVariables.jsx');
class TransferHistory extends Component {
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
          let user_id = sessionStorage.getItem('user_id');
          axios.post(globalVariables.user_api_path+'/ewallet/transfer-history', {model_call: 'Transfer_history', search_f:'transaction_id', user_id: user_id}, {
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
                      <th>Date/Time</th>
                        <th>From User</th>
                        <th>To User</th>
                        <th>Amount</th>
                        {/* <th>Status</th> */}
                        <th>Remark</th>
                      </tr>
                    </thead>
                    <tbody>
                    { this.state.contentList.map((cotnentSingle, index_key) => (
                      <tr key={index_key}>
                        <td>{cotnentSingle.created_at}</td>
                        <td>{cotnentSingle.from_user_name} </td>
                        <td>{cotnentSingle.to_user_name} </td>
                        <td>{cotnentSingle.amount}</td>
                        {/* <td>
                            {(() => {
                                switch(cotnentSingle.status)
                                {
                                    case 1:
                                        return  <Button simple bsStyle="success" bsSize="xs"  fill> Succcess </Button>;
                                    case 0:
                                        return  <Button simple bsStyle="danger" bsSize="xs"  fill> Cancelled </Button>;
                                }
                            })()}
                        </td> */}
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

export default TransferHistory;
