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
class EpinTransfer extends Component {
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
            transaction: null
        };
        }

      handleSubmit = event => {
        event.preventDefault();
        if(this.state.username === null || this.state.valid_usename === false)
        {
            this.setState({
                usernameError: (
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
            axios.post(globalVariables.admin_api_path+'/ewallet/credit-debit', {username: this.state.username, amount: this.state.amount, transaction_note:this.state.transaction_note, transaction_type: this.state.transaction_type.value, transaction: this.state.transaction},{
            headers: { Authorization: "Bearer " + login_token }
            }).then(res => {
                this.props.handleClick("tr", 1, "Transaction Successfully Completed");
                document.getElementById('creditdebitform').reset();
               }).catch(error => {
            if(error.length)
            {
                this.props.handleClick("tr", 3, error.response.data.msg);
            }
            else
            {
                this.props.handleClick("tr", 3, "Technical Error! Please try again");
            }
            
            });
        }
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
          let login_token = sessionStorage.getItem('login_token');
          axios.post(globalVariables.admin_api_path+'/check-user-validity', {'username' : target.value}, {
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
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
                  <form  onSubmit={this.handleSubmit} id="creditdebitform">
                    <FormGroup>
                      <ControlLabel>Username</ControlLabel>
                      <FormControl  onChange={this.handleUsername} name="username" type="text" />
                      {this.state.usernameError}
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Amount</ControlLabel>
                      <FormControl  onChange={this.handleChange} type="number" name="amount"/>
                      {this.state.amountError}
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Transaction Note</ControlLabel>
                      <FormControl  onChange={this.handleChange} type="text" name="transaction_note"/>
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Transaction Type</ControlLabel>
                      <Select
                            name="transaction_type"  onChange={value => this.setState({ transaction_type: value, transactionTypeError: null })}
                            options={TransactionTypes} 
                        />
                        {this.state.transactionTypeError}
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Transaction</ControlLabel>
                      <Radio
                            number="5"
                            option="debit"
                            name="transaction"
                            onChange={this.handleRadio}
                            checked={this.state.transaction === "debit"}
                            label="Debit"
                          />
                          <Radio
                            number="6"
                            option="credit"
                            name="transaction"
                            onChange={this.handleRadio}
                            checked={this.state.transaction === "credit"}
                            label="Credit"
                          />
                          {this.state.transactionError}
                    </FormGroup>
                    <Button bsStyle="info" fill type="submit">
                      Submit
                    </Button>
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

export default EpinTransfer;
