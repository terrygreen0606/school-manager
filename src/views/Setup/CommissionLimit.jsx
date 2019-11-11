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
import axios from 'axios';

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";
var globalVariables = require('../../services/globalVariables.jsx');
class CommissionLimit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commissionLimitItems: [],
            setup_type: 'commission_limit',
            horizontal_limit: '',
            vertical_limit: '',
            setup_key: ['horizonal_limit', 'vertical_limit'],
            setup_value: []
        };
        }
      
        componentDidMount() {
          let login_token = sessionStorage.getItem('login_token');
          axios.post(globalVariables.admin_api_path+'/setup/commission-limit', { setup_type:'commission_limit' }, {
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
              this.setState({commissionLimitItems: data.response});
              this.setState({horizontal_limit:data.response[0].value});
              this.setState({vertical_limit:data.response[1].value});
              this.setState({setup_value: [this.state.horizontal_limit, this.state.vertical_limit]});
            })
        }


      handleSubmit = event => {
        event.preventDefault();
        let login_token = sessionStorage.getItem('login_token');
        let AllSetupItems = this.state.commissionLimitItems;
        axios.post(globalVariables.admin_api_path+'/setup/update-multi-setting', {keys: this.state.setup_key, value: [this.state.horizontal_limit, this.state.vertical_limit]},{
          headers: { Authorization: "Bearer " + login_token }
        })
          .then(res => {
            this.props.handleClick("tr", 1, "Settings Updated Successfully");
             axios.post(globalVariables.admin_api_path+'/setup/commission-limit', { setup_type:'commission_limit' }, {
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(response => response.data).then((data) => {
              this.setState({commissionLimitItems: data.response});
              this.setState({horizontal_limit:data.response[0].value});
              this.setState({vertical_limit:data.response[1].value});
              this.setState({setup_value: [this.state.horizontal_limit, this.state.vertical_limit]});
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
                      <ControlLabel>Horizontal Limit</ControlLabel>
                      <FormControl  onChange={this.handleChange} defaultValue={this.state.horizontal_limit} name="horizontal_limit" type="number" />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Vertical Limit</ControlLabel>
                      <FormControl  onChange={this.handleChange} type="number" defaultValue={this.state.vertical_limit} name="vertical_limit"/>
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

export default CommissionLimit;
