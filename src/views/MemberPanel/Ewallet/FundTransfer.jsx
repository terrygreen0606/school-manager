/*!
SMS Setup
Author : Amit Kumar (Github : amitkumarpro)
*/
import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
// react component that creates a switch button that changes from on to off mode
// import Switch from "react-bootstrap-switch";
import axios from 'axios';
import Select from "react-select";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Radio from "components/CustomRadio/CustomRadio.jsx";
import {TransactionTypes} from "../../../services/admin/TransactionType.jsx";
var globalVariables = require('../../../services/globalVariables.jsx');
class FundTransfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Errors
            transactionError: null,
            usernameError: null,
            amountError: null,
            transactionTypeError: null,
            valid_usename: false,
            // Form Data
            username: null,
            amount: null,
            transaction_note: '',
            transaction_type: null,
            transaction: 'debit',
            transfer_to_usernameError: null,
            valid_receiver_usename: false,
            transfer_to_username:null,
            wallet_amount: 0
        };
        }

      handleSubmit = event => {
        if(this.state.transfer_to_username === null || this.state.valid_receiver_usename === false)
        {
            this.setState({
                transfer_to_usernameError: (
                  <small className="text-danger">
                    Please enter a valid username.
                  </small>
                )
              });
        }
        else if(this.state.amount === null)
        {
            this.setState({
                amountError: (
                  <small className="text-danger">
                    Please enter a valid amount.
                  </small>
                )
              });
        }
        else if(this.state.transaction_type === null)
        {
            this.setState({
                transactionTypeError: (
                  <small className="text-danger">
                    Please select valid transaction type.
                  </small>
                )
              });
        }
        else if(this.state.transaction === null)
        {
            this.setState({
                transactionError: (
                  <small className="text-danger">
                    Please select transaction (Debit/Credit)
                  </small>
                )
              });
        }
        else
        {
            let login_token = sessionStorage.getItem('login_token');
            axios.post(globalVariables.user_api_path+'/ewallet/transfer-fund', {username: this.state.username,transfer_to_username: this.state.transfer_to_username, amount: this.state.amount, transaction_note:this.state.transaction_note, transaction_type: this.state.transaction_type.value, transaction: this.state.transaction},{
            headers: { Authorization: "Bearer " + login_token }
            }).then(res => {
                this.props.handleClick("tr", 1, "Transaction Successfully Completed");
                document.getElementById('creditdebitform').reset();
               }).catch(error => {
                this.props.handleClick("tr", 3, error.response.data.msg);
            // if(error.length)
            // {
            //     this.props.handleClick("tr", 3, error.response.data.msg);
            // }
            // else
            // {
            //     this.props.handleClick("tr", 3, "Technical Error! Please try again");
            // }
            });
        }
      }

      componentDidMount() {
      let login_token = sessionStorage.getItem('login_token');
      let user_id = sessionStorage.getItem('user_id');

        axios.get(globalVariables.profile_api_path, {
          headers: { Authorization: "Bearer " + login_token }
        })
          .then(res => res.data).then((data) => {
            if(data.response.wallet_amount !== null)
            {
              this.setState({wallet_amount: data.response.wallet_amount});
            }
            this.setState({username: data.response.username});
            console.log(data.response.username);
          });
      }

      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({amountError: null });
        this.setState({usernameError: null });
      }

      handleRadio = event => {
        const target = event.target;
        this.setState({
          [target.name]: target.value
        });
        this.setState({ transactionError: null });
      };

      handleUsername = event => {
          const target = event.target;
          console.log(target.name);
          let login_token = sessionStorage.getItem('login_token');
          axios.post(globalVariables.user_api_path+'/check-user-validity', {'username' : target.value}, {
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
              if(target.name == 'username'){
                if(data.response === true)
                {
                  this.setState({
                      usernameError: (
                        <small className="text-danger">
                          Please enter a valid username.
                        </small>
                      )
                    });
                }
                else{
                  this.setState({
                      usernameError: null
                    });
                    this.setState({valid_usename: true});
                    this.setState({username: target.value})
                }
              }
              else{
                if(data.response === false)
                {
                  this.setState({
                      transfer_to_usernameError: (
                        <small className="text-danger">
                          Please enter a valid username.
                        </small>
                      )
                    });
                }
                else{
                  this.setState({
                    transfer_to_usernameError: null
                    });
                    this.setState({valid_receiver_usename: true});
                    this.setState({transfer_to_username: target.value})
                }
              }
            })
      }
        
  render() {
    
    return (
    <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title=""
                content={
                  <form id="creditdebitform">
                    <Col md={6}>
                      <FormGroup>
                        <ControlLabel>Transfer To (Username)</ControlLabel>
                        <FormControl  onChange={this.handleUsername} name="transfer_to_username" type="text" />
                      </FormGroup>
                      {this.state.transfer_to_usernameError}
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                      <ControlLabel>Amount (Available Balance:  {this.state.wallet_amount})</ControlLabel>
                      <FormControl  onChange={this.handleChange} type="number" name="amount"/>
                      {this.state.amountError}
                    </FormGroup>
                    </Col>
                    <div className="clearfix"></div>

                    <Col md={6}>
                    <FormGroup>
                      <ControlLabel>Transaction Type</ControlLabel>
                      <Select
                            name="transaction_type"  onChange={value => this.setState({ transaction_type: value, transactionTypeError: null })}
                            options={TransactionTypes} 
                        />
                        {this.state.transactionTypeError}
                    </FormGroup>
                    </Col>

                    <Col md={6}>
                    <FormGroup>
                      <ControlLabel>Transaction Note</ControlLabel>
                      <FormControl  onChange={this.handleChange} type="text" name="transaction_note"/>
                    </FormGroup>
                    </Col>
                    <div className="clearfix"></div>

                    <Col md={6}>
                      <Button bsStyle="info" fill onClick={this.handleSubmit}>
                        Submit
                      </Button>
                    </Col>

                    <div className="clearfix"></div>
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default FundTransfer;
