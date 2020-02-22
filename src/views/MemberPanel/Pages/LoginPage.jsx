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
  Alert, Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";
import { Login } from "services/admin/Login.jsx";
import { Profile } from "services/admin/Profile.jsx";
import { Redirect } from "react-router-dom";
/* import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx"; */

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardHidden: true,
      /// Login
      emailLogin: "",
      emailErrorLogin: null,
      passwordLogin: "",
      passwordErrorLogin: null,
      loginErrorMsg: "",
      redirect: false,
      roles_key: '',
      // Type
      type_text: "",
      type_textError: null,
      type_email: "",
      type_emailError: null,
      type_number: "",
      type_numberError: null,
      type_url: "",
      type_urlError: null,
      type_source: "",
      type_sourceError: null,
      type_destination: "",
      type_destinationError: null
    };
  }
  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    re.test(event.target.value) === false
      ? this.setState({
          emailError: (
            <small className="text-danger">
              Email is required and format should be <i>john@doe.com</i>.
            </small>
          )
        })
      : this.setState({ emailError: null });
  }
  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
    event.target.value.length < 6
      ? this.setState({
          passwordError: (
            <small className="text-danger">
              You must enter a password of at least 6 characters.
            </small>
          )
        })
      : this.setState({ passwordError: null });
  }

  handleLoginEmail(event) {
    this.setState({
      emailLogin: event.target.value
    });
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    re.test(event.target.value) === false
      ? this.setState({
          emailErrorLogin: (
            <small className="text-danger">
              Email is required and format should be <i>john@doe.com</i>.
            </small>
          ), loginErrorMsg: null
        })
      : this.setState({ emailErrorLogin: null });
  }
  handleLoginPassword(event) {
    this.setState({
      passwordLogin: event.target.value
    });
    event.target.value.length < 6
      ? this.setState({
          passwordErrorLogin: (
            <small className="text-danger">
              You must enter a password of at least 6 characters.
            </small>
          ), loginErrorMsg: null
        })
      : this.setState({ passwordErrorLogin: null });
  }
  handleLoginSubmit() {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(this.state.emailLogin) === false)
    {
      this.setState({
        emailErrorLogin: (
          <small className="text-danger">
            Email is required and format should be <i>john@doe.com</i>.
          </small>
        ),
        loginErrorMsg: null
      });
    }
    else if(this.state.passwordLogin.length < 6)
    {
      this.setState({
        passwordErrorLogin: (
          <small className="text-danger">
            You must enter a password of at least 6 characters.
          </small>
        ),
        emailErrorLogin: null, loginErrorMsg: null
      });
    }
    else
    {
      Login({email: this.state.emailLogin, password: this.state.passwordLogin}).then((result) => {
        let responseJSON = result;
        if(responseJSON.success)
        {
          this.setState({
            loginErrorMsg: (<Alert bsStyle="success">
              <span>
               {responseJSON.msg}
              </span>
            </Alert>),
            passwordErrorLogin: null
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
            passwordErrorLogin: null
          });
        }
      })
       
      }
  }
  handleTypeValidation() {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    emailRex.test(this.state.type_email) === false
      ? this.setState({
          type_emailError: (
            <small className="text-danger">
              Email is required and format should be <i>john@doe.com</i>.
            </small>
          )
        })
      : this.setState({ type_emailError: null });
    this.state.type_text === ""
      ? this.setState({
          type_textError: (
            <small className="text-danger">Text is required.</small>
          )
        })
      : this.setState({ type_textError: null });
    var digitRex = /^\d+$/;
    digitRex.test(this.state.type_number) === false
      ? this.setState({
          type_numberError: (
            <small className="text-danger">
              type_number has to be a number.
            </small>
          )
        })
      : this.setState({ type_numberError: null });
    var urlRex = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
    urlRex.test(this.state.type_url)
      ? this.setState({ type_urlError: null })
      : this.setState({
          type_urlError: (
            <small className="text-danger">Must be a valid URL!</small>
          )
        });
    this.state.type_source === ""
      ? this.setState({
          type_sourceError: (
            <small className="text-danger">IdSource is required</small>
          )
        })
      : this.setState({ type_sourceError: null });
    this.state.type_source === this.state.type_destination
      ? this.setState({ type_destinationError: null })
      : this.setState({
          type_destinationError: (
            <small className="text-danger">IdSource mismatch!</small>
          )
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
          <Col md={4} sm={6} mdOffset={4} smOffset={3}>
            <form>
              <Card
                hidden={this.state.cardHidden}
                textCenter
                title="Login"
                content={
                  <div>
                      {this.state.loginErrorMsg}
                    <FormGroup>
                      <ControlLabel>Email address</ControlLabel>
                      <FormControl placeholder="Enter email" type="email"  onChange={event => this.handleLoginEmail(event)}/>
                      {this.state.emailErrorLogin}
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Password</ControlLabel>
                      <FormControl placeholder="Password" type="password" autoComplete="off"  onChange={event => this.handleLoginPassword(event)}/>
                      {this.state.passwordErrorLogin}
                    </FormGroup>
                    {/*
                    <FormGroup>
                      <Checkbox number="1" label="Subscribe to newsletter" />
                    </FormGroup>
                    */}
                  </div>
                }
                legend={
                  <Button bsStyle="info" fill wd  onClick={this.handleLoginSubmit.bind(this)}>
                    Login
                  </Button>
                }
                ftTextCenter
              />
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default LoginPage;
