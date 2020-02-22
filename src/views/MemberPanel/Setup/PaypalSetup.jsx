/*!
Paypal Setup
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
class PaypalSetup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SetupItems: [],
            setup_type: 'paypal_setup',
            paypal_api_key: '',
            paypal_secret: '',
            setup_key: ['paypal_api_key', 'paypal_secret'],
            setup_value: []
        };
        }
      
        componentDidMount() {
          let login_token = sessionStorage.getItem('login_token');
          axios.post(globalVariables.admin_api_path+'/setup/paypal-settings', { setup_type:'paypal_setup' }, {
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
              this.setState({SetupItems: data.response});
              this.setState({paypal_api_key:data.response[0].value});
              this.setState({paypal_secret:data.response[1].value});
              this.setState({setup_value: [this.state.paypal_api_key, this.state.paypal_secret]});
            })
        }


      handleSubmit = event => {
        event.preventDefault();
        let login_token = sessionStorage.getItem('login_token');
        let AllSetupItems = this.state.SetupItems;
        axios.post(globalVariables.admin_api_path+'/setup/update-multi-setting', {keys: this.state.setup_key, value: [this.state.paypal_api_key, this.state.paypal_secret]},{
          headers: { Authorization: "Bearer " + login_token }
        })
          .then(res => {
            this.props.handleClick("tr", 1, "Settings Updated Successfully");
             axios.post(globalVariables.admin_api_path+'/setup/paypal-settings', { setup_type:'paypal_setup' }, {
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(response => response.data).then((data) => {
              this.setState({SetupItems: data.response});
              this.setState({paypal_api_key:data.response[0].value});
              this.setState({paypal_secret:data.response[1].value});
              this.setState({setup_value: [this.state.paypal_api_key, this.state.paypal_secret]});
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
                      <ControlLabel>Paypal API Key</ControlLabel>
                      <FormControl  onChange={this.handleChange} defaultValue={this.state.paypal_api_key} name="paypal_api_key" type="text" />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>API Secret</ControlLabel>
                      <FormControl  onChange={this.handleChange} type="text" defaultValue={this.state.paypal_secret} name="paypal_secret"/>
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

export default PaypalSetup;
