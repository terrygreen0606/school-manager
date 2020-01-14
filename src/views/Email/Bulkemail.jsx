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
import {TransactionTypes} from "../../services/admin/TransactionType.jsx";
var globalVariables = require('../../services/globalVariables.jsx');
class Bulkemail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Errors
            transactionError: null,
            usernameError: null,
            amountError: null,
            transactionTypeError: null,
            valid_usename: false,
            Users: [],
            multipleSelect: null
        };
        }

    componentDidMount() {
        let login_token = sessionStorage.getItem('login_token');
        axios.post(globalVariables.admin_api_path+'/member/list',  {status: 1},{
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
              let memmbers = [];
              console.log(data.response.length);
              for(var i = 0; i < data.response.length; i++)
              {
                console.log(data.response[i].id);
                memmbers.push({value: data.response[i].id, label: data.response[i].username});
              }
              this.setState({Users: memmbers});
            });        
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
        this.setState({ multipleSelect: null })
        const target = event.target;
        let login_token = sessionStorage.getItem('login_token');
        if(target.value == '2')
        {
            axios.post(globalVariables.admin_api_path+'/member/list',  {status: 1},{
                headers: { Authorization: "Bearer " + login_token }
              })
                .then(res => res.data).then((data) => {
                  let memmbers = [];
                  for(var i = 0; i < data.response.length; i++)
                  {
                    memmbers.push({value: data.response[i].id, label: data.response[i].username});
                  }
                  this.setState({Users: memmbers});
                });
        }
        else
        {
            axios.post(globalVariables.admin_api_path+'/staff/list',  {status: 1, roles_key: 'STAFF'},{
                headers: { Authorization: "Bearer " + login_token }
              })
                .then(res => res.data).then((data) => {
                  let memmbers = [];
                  for(var i = 0; i < data.response.length; i++)
                  {
                    memmbers.push({value: data.response[i].id, label: data.response[i].username});
                  }
                  this.setState({Users: memmbers});
                });
        }
      };
        
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
                      <ControlLabel>Select User Type</ControlLabel>
                        <Radio
                            number="5"
                            option="1"
                            name="user_type"
                            onChange={this.handleRadio}
                            label="Staff" value="1" selected/>
                        <Radio
                            number="6"
                            option="0"
                            name="user_type"
                            onChange={this.handleRadio}
                            label="Members" value="2"/>
                    </FormGroup>
                    <FormGroup>
                    <ControlLabel>Email Subject</ControlLabel>
                    <FormControl name="email_subject"  type="text" defaultValue={this.state.email_subject} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Email Body</ControlLabel>
                      <FormControl
                            name="email_body"
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Message"
                            defaultValue={this.state.email_body}
                            onChange={this.handleChange}
                          />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Users</ControlLabel>
                      <Select
                            name="multipleSelect" 
                            options={this.state.Users} isMulti closeOnSelect={false} value={this.state.multipleSelect}
                            onChange={value =>this.setState({ multipleSelect: value })}
                        />
                        {this.state.transactionTypeError}
                    </FormGroup>
                    
                    <Button bsStyle="info" fill type="submit">
                      Send
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

export default Bulkemail;
