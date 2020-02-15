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
import { Grid, Row, Col, Media, FormControl, FormGroup, Alert } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import axios from 'axios';
import Button from "components/CustomButton/CustomButton.jsx";
import { Login } from "services/admin/Login.jsx";
import { Profile } from "services/admin/Profile.jsx";
import { Redirect } from "react-router-dom";
var globalVariables = require('../../services/globalVariables.jsx');
class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardHidden: true,
      /// Login
      email: "",
      first_name: "",
      password: "",
      last_name: "",
      company: "",
      redirect: false,
      username: "",
      // Type
      confirm_password: "",
      sponsor_username: null,
      type_email: "",
      type_emailError: null,
      type_number: "",
      type_numberError: null,
      type_url: "",
      type_urlError: null,
      type_source: "",
      type_sourceError: null,
      type_destination: "",
      type_destinationError: null,
      register_msg: null,
    };
  }

  handleSignup() {
      axios.post(globalVariables.api_url+'/signup', {roles_key:'MEMBER', username:this.state.username,first_name: this.state.first_name, last_name:this.state.last_name, email:this.state.email, password: this.state.password, password_confirmation:this.state.confirm_password, company:this.state.company, sponsor_username:this.state.sponsor_username}, {
       /* headers: { Authorization: "Bearer " + login_token } */
      }).then(res => {
        this.setState({register_msg:  (<Alert bsStyle="success">
        <span>
        Registration Successful. Please wait.... we are logingin to the system
        </span>
      </Alert>)});
      document.getElementById("registration_form").style.display = "none";
            Login({email: this.state.email, password: this.state.password}).then((result) => {
              let responseJSON = result;
              if(responseJSON.success)
              {
                this.setState({
                  loginErrorMsg: (<Alert bsStyle="success">
                    <span>
                     {responseJSON.msg}
                    </span>
                  </Alert>),
                  passwordError: null
                });
                if(responseJSON.response.token)
                {
                  console.log(responseJSON.response);
                  sessionStorage.setItem('login_token', responseJSON.response.token);
                  this.setState({
                    redirect: true,
                    roles_key: responseJSON.response.roles_key
                  });
                  Profile().then((profiledata) => {
                    let ProfileJSON = profiledata;
                   // console.log(ProfileJSON);
                    if(ProfileJSON.success)
                    {
                      // console.log(ProfileJSON);
                    //  console.log(ProfileJSON.response);
                     // UserProfile.setName(ProfileJSON.response.first_name);
                      sessionStorage.setItem('first_name', ProfileJSON.response.first_name);
                      sessionStorage.setItem('last_name', ProfileJSON.response.last_name);
                      sessionStorage.setItem('user_id', ProfileJSON.response.id);
                      sessionStorage.setItem('id', ProfileJSON.response.id);
                      sessionStorage.setItem('user_username', ProfileJSON.response.username);
                      sessionStorage.setItem('user_email', ProfileJSON.response.email);
                      sessionStorage.setItem('profile_pic', ProfileJSON.response.profile_pic);
                      sessionStorage.setItem('roles_key', ProfileJSON.response.roles_key);
                      sessionStorage.setItem('band_id', ProfileJSON.response.band_id);
                     // this.props.history.push('/');
                      // this.setState({
                      //   roles_key: ProfileJSON.response.roles_key
                      // });
                    }
                  }); 
                }
              }
              else{
                this.setState({
                  loginErrorMsg: (<Alert bsStyle="danger">
                    <span>
                      {responseJSON.msg}
                    </span>
                  </Alert>),
                  passwordError: null
                });
              }
            })
       }).catch(error => {
         console.log(error);
    if(error.response.data.msg)
    {
      this.setState({msg_type: "error"});
      this.setState({register_msg: (<Alert bsStyle="danger">
      <span>
       {error.response.data.msg}
      </span>
    </Alert>)});
    }
    else
    {
      this.setState({msg_type: "error"});
      this.setState({register_msg: (<Alert bsStyle="danger">
      <span>
      Technical Error! Please check now.
      </span>
    </Alert>)});
    }
    });
  }

  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ cardHidden: false });
      }.bind(this),
      700
    );
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    if(this.state.redirect)
    {
      switch(this.state.roles_key)
      {
        case "STAFF":
          return (
            <Redirect to={'/staff/dashboard'} />
          );
          break;
        case "MEMBER":
          return (
            <Redirect to={'/member/dashboard'} />
          );
          break;
        case "ADMIN":
          return (
            <Redirect to={'/admin/dashboard'} />
          );
          break;
        default:
          return (
            <Redirect to={'/'} />
          );
          break;

      }
      // return (
      //   <Redirect to={'/'} />
      // );
    }

    if(sessionStorage.getItem('login_token'))
    {
      switch(sessionStorage.getItem('roles_key'))
      {
        case "STAFF":
          return (
            <Redirect to={'/staff/dashboard'} />
          );
          break;
        case "MEMBER":
          return (
            <Redirect to={'/member/dashboard'} />
          );
          break;
        case "ADMIN":
          return (
            <Redirect to={'/admin/dashboard'} />
          );
          break;
        default:
          return (
            <Redirect to={'/'} />
          );
          break;

      } 
      // return (
      //   <Redirect to={'/'} />
      // );
    }
    return (
      <Grid>
        <Row>
          <Col md={8} mdOffset={2}>
            <div className="header-text">
              <h2>Welcome to Hope Partners Network</h2>
              <h4>Register Our network Today and Earn money</h4>
              <hr />
            </div>
          </Col>
          <Col md={4} mdOffset={2}>
            <Media>
              <Media.Left>
                <div className="icon">
                  <i className="pe-7s-user" />
                </div>
              </Media.Left>
              <Media.Body>
                <Media.Heading>Free Account</Media.Heading>
                Here you can write a feature description for your dashboard, let
                the users know what is the value that you give them.
              </Media.Body>
            </Media>
            <Media>
              <Media.Left>
                <div className="icon">
                  <i className="pe-7s-graph1" />
                </div>
              </Media.Left>
              <Media.Body>
                <Media.Heading>Awesome Performances</Media.Heading>
                Here you can write a feature description for your dashboard, let
                the users know what is the value that you give them.
              </Media.Body>
            </Media>
            <Media>
              <Media.Left>
                <div className="icon">
                  <i className="pe-7s-headphones" />
                </div>
              </Media.Left>
              <Media.Body>
                <Media.Heading>Global Support</Media.Heading>
                Here you can write a feature description for your dashboard, let
                the users know what is the value that you give them.
              </Media.Body>
            </Media>
          </Col>
          <Col md={4}>
          <div id="result_div">{ this.state.register_msg}</div>
            <form id="registration_form">
              <Card
                plain
                content={
                  <div>
                    <FormGroup>
                      <FormControl type="text" placeholder="Your First Name" name="first_name" onChange={event => this.handleChange(event)} />
                    </FormGroup>
                    <FormGroup>
                      <FormControl type="text" placeholder="Your Last Name" name="last_name" onChange={event => this.handleChange(event)} />
                    </FormGroup>
                    <FormGroup>
                      <FormControl type="text" placeholder="Company" name="company" onChange={event => this.handleChange(event)} />
                    </FormGroup>
                    <FormGroup>
                      <FormControl type="text" placeholder="Choose a Username" name="username" onChange={event => this.handleChange(event)} />
                    </FormGroup>
                    <FormGroup>
                      <FormControl type="email" placeholder="Enter Email" name="email" onChange={event => this.handleChange(event)}/>
                      {this.state.emailError}
                    </FormGroup>
                    <FormGroup>
                      <FormControl type="password" placeholder="Password" name="password" autoComplete="off" onChange={event => this.handleChange(event)}/>
                      {this.state.passwordError}
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        type="password"
                        autoComplete="off"
                        placeholder="Password Confirmation" name="confirm_password" onChange={event => this.handleChange(event)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControl type="text" placeholder="Your Sponsor Username" onChange={event => this.handleChange(event)} />
                    </FormGroup>
                  </div>
                }
                ftTextCenter
                legend={
                  <Button wd fill neutral onClick={event => this.handleSignup(event)}>
                    Create Free Account
                  </Button>
                }
              />
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default RegisterPage;
