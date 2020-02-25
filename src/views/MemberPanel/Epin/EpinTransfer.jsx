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
var globalVariables = require('../../../services/globalVariables.jsx');
class EpinTransfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Errors
            epin_id: '',
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
            transaction: null,
            EpinList: []
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
        else
        {
            let login_token = sessionStorage.getItem('login_token');
            let username = sessionStorage.getItem('user_username');
            let user_id = sessionStorage.getItem('user_id');
            axios.post(globalVariables.user_api_path+'/epin/transfer', {username: username, transfer_to_username: this.state.username, epin_id: this.state.epin_id, transaction_note:this.state.transaction_note},{
            headers: { Authorization: "Bearer " + login_token }
            }).then(res => {
              axios.post(globalVariables.user_api_path+'/epin/search', {model_call: 'Epin', search_f:'epin_id', user_id: user_id, status: 1}, {
                headers: { Authorization: "Bearer " + login_token }
              })
                .then(res => res.data).then((data) => {
                  let EpinList = [];
                  let response = data.response;
                  console.log(EpinList);
                  //console.log(response);
                  for(let i=0; i< response.length; i++)
                  {
                    EpinList.push({'label' : response[i].epin_id, 'value': response[i].id});
                  }
                  //const packageList = data.map(mappingFunction);
                 // console.log(EpinList);
                  this.setState({EpinList: EpinList});
                //  console.log(this.state.EpinList);
                });
                this.props.handleClick("tr", 1, "Epin transfer Successfully");
                document.getElementById('creditdebitform').reset();
               // window.location.reload(false);
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
          axios.post(globalVariables.user_api_path+'/check-user-validity', {'username' : target.value}, {
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
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
              }
            })
      }

      componentDidMount() {
        let login_token = sessionStorage.getItem('login_token');
        let user_id = sessionStorage.getItem('user_id');
        axios.post(globalVariables.user_api_path+'/epin/search', {model_call: 'Epin', search_f:'epin_id', user_id: user_id, status: 1}, {
          headers: { Authorization: "Bearer " + login_token }
        })
          .then(res => res.data).then((data) => {
            let EpinList = [];
            let response = data.response;
            console.log(EpinList);
            //console.log(response);
            for(let i=0; i< response.length; i++)
            {
              EpinList.push({'label' : response[i].epin_id, 'value': response[i].id});
            }
            //const packageList = data.map(mappingFunction);
           // console.log(EpinList);
            this.setState({EpinList: EpinList});
          //  console.log(this.state.EpinList);
          });
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
                    <Col md={6}>
                      <FormGroup>
                        <ControlLabel>Username</ControlLabel>
                        <FormControl  onChange={this.handleUsername} name="username" type="text" />
                        {this.state.usernameError}
                      </FormGroup>
                      </Col>
                      <Col md={6}>
                      <FormGroup>
                        <ControlLabel>Epin</ControlLabel>
                        <Select id="epin_id_select"
                              name="epin_id"  onChange={value => this.setState({ epin_id: value, transactionTypeError: null })}
                              options={this.state.EpinList} 
                          />
                          {this.state.transactionTypeError}
                      </FormGroup>
                    </Col>
                    <div className="clearfix"></div>
                    <Col md={6}>
                      <FormGroup>
                        <ControlLabel>Transaction Note</ControlLabel>
                        <FormControl  onChange={this.handleChange} type="text" name="transaction_note"/>
                      </FormGroup>
                    </Col>
                    <div className="clearfix"></div>
                   
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
