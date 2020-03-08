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

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
var globalVariables = require('../../services/globalVariables.jsx');
class ChangeMPassword extends Component {
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
            new_password: '',
            confirm_password: ''

        };
        }

      handleSubmit = event => {
          event.preventDefault();
            let login_token = sessionStorage.getItem('login_token');
            axios.post(globalVariables.admin_api_path+'/change-m-password', {username: this.state.username, password: this.state.new_password, password_confirmation:this.state.confirm_password},{
            headers: { Authorization: "Bearer " + login_token }
            }).then(res => {
                this.props.handleClick("tr", 1, "Password Updated Successfully");
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
                      <ControlLabel>New Password</ControlLabel>
                      <FormControl  onChange={this.handleChange} type="password" name="new_password"/>
                      {this.state.amountError}
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Confirm Password</ControlLabel>
                      <FormControl  onChange={this.handleChange} type="password" name="confirm_password"/>
                    </FormGroup>
                   
                    <Button bsStyle="info" fill type="submit">
                      Update
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

export default ChangeMPassword;
