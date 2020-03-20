/*!
Basic Settings
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
import { Redirect,Link } from 'react-router-dom';
import axios from 'axios';

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";
var globalVariables = require('../../services/globalVariables.jsx');
class GeneologySearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id:'',
            redirect: false,
            usernameError: null,
            setup_type: 'commission_limit',
            horizontal_limit: '',
            vertical_limit: '',
            setup_key: ['horizonal_limit', 'vertical_limit'],
            setup_value: [],
            valid_usename: false
        };
        }

        handleUsername = event => {
            const target = event.target;
            let login_token = sessionStorage.getItem('login_token');
            axios.post(globalVariables.admin_api_path+'/check-user-validity', {'username' : target.value}, {
              headers: { Authorization: "Bearer " + login_token }
            })
              .then(res => res.data).then((data) => {
                  console.log(data.response);
                if(data.response === false)
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
                    this.setState({user_id: data.response.id})
                }
              })
        }

        handleSubmit = event => {
          event.preventDefault();
          if(this.state.valid_usename === false)
          {
              this.setState({
                  usernameError: (
                    <small className="text-danger">
                      Please enter a valid username.
                    </small>
                  )
                });
          }
          else
          {
            this.setState({redirect: true});
          }
          }
        
  render() {
    if(this.state.redirect)
    {
      return (
        <Redirect to={`/admin/genealogy/${this.state.user_id}`}/>
      );
    }
    return (
    <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title=""
                content={
                  <form  onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <ControlLabel>Username</ControlLabel>
                      <FormControl   onChange={this.handleUsername} name="username" type="text" />
                      {this.state.usernameError}
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

export default GeneologySearch;
