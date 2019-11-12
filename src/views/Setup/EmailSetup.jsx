/*!
Email Setup
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
class EmailSetup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailSetupItems: [],
            setup_type: 'email_setup',
            smtp_host: '',
            smtp_username: '',
            smtp_password: '',
            smtp_port: '',
            setup_key: ['smtp_host', 'smtp_username', 'smtp_password', 'smtp_port'],
            setup_value: []
        };
        }
      
        componentDidMount() {
          let login_token = sessionStorage.getItem('login_token');
          axios.post(globalVariables.admin_api_path+'/setup/email-settings', { setup_type:'email_setup' }, {
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
              this.setState({emailSetupItems: data.response});
              this.setState({smtp_host:data.response[0].value});
              this.setState({smtp_username:data.response[1].value});
              this.setState({smtp_password:data.response[2].value});
              this.setState({smtp_port:data.response[3].value});
              this.setState({setup_value: [this.state.smtp_host, this.state.smtp_username, this.state.smtp_password, this.state.smtp_port]});
            })
        }


      handleSubmit = event => {
        event.preventDefault();
        let login_token = sessionStorage.getItem('login_token');
        let AllSetupItems = this.state.emailSetupItems;
        axios.post(globalVariables.admin_api_path+'/setup/update-multi-setting', {keys: this.state.setup_key, value: [this.state.smtp_host, this.state.smtp_username, this.state.smtp_password, this.state.smtp_port]},{
          headers: { Authorization: "Bearer " + login_token }
        })
          .then(res => {
            this.props.handleClick("tr", 1, "Settings Updated Successfully");
             axios.post(globalVariables.admin_api_path+'/setup/email-settings', { setup_type:'email_setup' }, {
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(response => response.data).then((data) => {
              this.setState({emailSetupItems: data.response});
              this.setState({smtp_host:data.response[0].value});
              this.setState({smtp_username:data.response[1].value});
              this.setState({smtp_password:data.response[2].value});
              this.setState({smtp_port:data.response[3].value});
              this.setState({setup_value: [this.state.smtp_host, this.state.smtp_username, this.state.smtp_password, this.state.smtp_port]});
            });
           
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

      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
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
                  <form  onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <ControlLabel>SMTP Host</ControlLabel>
                      <FormControl  onChange={this.handleChange} defaultValue={this.state.smtp_host} name="smtp_host" type="text" />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>SMTP Username</ControlLabel>
                      <FormControl  onChange={this.handleChange} type="text" defaultValue={this.state.smtp_username} name="smtp_username"/>
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>SMTP Password</ControlLabel>
                      <FormControl  onChange={this.handleChange} type="text" defaultValue={this.state.smtp_password} name="smtp_password"/>
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>SMTP Port</ControlLabel>
                      <FormControl  onChange={this.handleChange} type="text" defaultValue={this.state.smtp_port} name="smtp_port"/>
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

export default EmailSetup;
