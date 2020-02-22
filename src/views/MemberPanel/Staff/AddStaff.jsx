/*!
Transaction
Developed by Amit Kumar
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
import Radio from "components/CustomRadio/CustomRadio.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import avatar from "assets/img/default-avatar.png";
var globalVariables = require('../../services/globalVariables.jsx');
class AddStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            contentList: [],
            selectedItem: null,
            setup_value: '',
            setup_key: '',
            no_of_epin: '',
            amount: '',
            expiry_date: '',
            packageList: '',
            TotalRecords: 0,
            ActivePage: 1,
            first_name: '',
            last_name: '',
            email: '',
            dob: '',
            phone_number: '',
            gender: '',
            profile_pic: '',
            status: '',
            band_id:'',
            band_title: '',
            bandlist: '',
            id: '',
            bands: [],
            full_url: ''

        };
        this.handleClick = this.handleClick.bind(this);
        }

        handleClick(event) {
          this.setState({
            ActivePage: Number(event.target.id)
          });

          let login_token = sessionStorage.getItem('login_token');
          axios.post(globalVariables.admin_api_path+'/staff/list', {offset: this.state.ActivePage,roles_key: 'STAFF'}, {
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
              console.log(data);
              this.setState({TotalRecords: parseInt(data.total)});
              this.setState({id: data.response.id,first_name: data.response.first_name,last_name: data.response.last_name,dob: data.response.dob,email: data.response.email,phone_number: data.response.phone_number,gender: data.response.gender.value,status: data.response.status,band_id: data.response.band_id,band_title:data.response.band_title,username: data.response.username, profile_pic: data.response.profile_pic});
              console.log(this.state.contentList);
            });
        }
      
        componentDidMount() {
            console.log(this.props.match.params);
          let login_token = sessionStorage.getItem('login_token');
         
          console.log(this.props.match.params.userId);
          if((this.props.match.params.userId !== '') && (typeof this.props.match.params.userId !== 'undefined'))
          {
            let id = this.props.match.params.userId;
                axios.get(globalVariables.admin_api_path+'/staff/profile/'+id, {
                    headers: { Authorization: "Bearer " + login_token }
                }).then(res => res.data).then((data) => {
                  console.log(data);
                    this.setState({
                        band_title: data.response.band_title,
                        id: data.response.id,
                        first_name: data.response.first_name,
                        last_name: data.response.last_name,
                        dob: data.response.dob,
                        email: data.response.email,
                        phone_number: data.response.phone_number,
                        gender: data.response.gender,
                        status: data.response.status,
                        band_id: data.response.band_id,
                        username: data.response.username,
                        profile_pic: data.response.profile_pic
                    });
                    console.log(data.response.band_title);
                });
          }

          axios.post(globalVariables.admin_api_path+'/band/list',  {status: 1},{
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
              let bands = [];
              console.log(data.response.length);
              for(var i = 0; i < data.response.length; i++)
              {
                console.log(data.response[i].id);
                bands.push({value: data.response[i].id, label: data.response[i].band});
              }
              this.setState({bands: bands});
              console.log(bands);
            });

        }

        handleDateChange = date => {
          this.setState({
            dob: date
          });
        }


        handleSubmit = event => {
          event.preventDefault();
          let login_token = sessionStorage.getItem('login_token');
          axios.post(globalVariables.admin_api_path+'/staff/update-profile-api', {id: this.state.id, first_name: this.state.first_name, last_name: this.state.last_name, username: this.state.username, email: this.state.email, dob: this.state.dob, phone_number: this.state.phone_number, status: this.state.status, band_id: this.state.band_id, band_title: this.state.band_title, gender: this.state.gender, profile_pic:this.state.profile_pic},{
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => {
              this.props.handleClick("tr", 1, "Staff Detailed Updated Successfully");
             
            }).catch(error => {
              this.props.handleClick("tr", 3, error.response.data.msg);
            });
        }
  
        handleChange = event => {
          console.log(event.target);
          this.setState({ [event.target.name]: event.target.value });
          console.log(event.target.value);
        }

        handleBandSelectBox = event => {
          console.log(event.target);
          this.setState({ band_id: event.value });
          this.setState({band_title: event.label});
        }

        handleGenderSelectBox = event => {
          console.log(event.target);
          this.setState({ gender: event.value });
        }
        
        
        handleImageChange = event => {
            let image_file = event.target.files[0];
          const formData = new FormData();
          formData.append('avatar',image_file);
          formData.append('avatar_prefix','profile_');
          let login_token = sessionStorage.getItem('login_token');
          axios.post(globalVariables.api_url+"/upload-image",formData,{
              headers: { Authorization: "Bearer " + login_token, 'content-type': 'multipart/form-data' }
            })
              .then((res) => {
                this.setState({ profile_pic : res.data.response });
                  this.setState({full_url: res.data.full_url});
                 // this.setState({flag: res.data.response});
              }).catch((error) => {
                  this.props.handleClick("tr", 3, "Image not uploaded");
          });
        }
     
  render() {
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card title={<span>Add/Updte Staff</span>}
                tableFullWidth
                content={
                    <Row>
                    <Col md={12}>
                    <form onSubmit={this.handleSubmit}>
                    <Col md={6}>
                    <FormGroup>
                        <ControlLabel>User ID</ControlLabel>
                        <FormControl name="username"  type="text" defaultValue={this.state.username} onChange={this.handleChange} disabled/>
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>First Name</ControlLabel>
                          <FormControl name="first_name"  type="text" defaultValue={this.state.first_name} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Phone Number</ControlLabel>
                          <FormControl name="phone_number"  type="text" defaultValue={this.state.phone_number} onChange={this.handleChange}/>
                            {this.state.transactionTypeError}
                        </FormGroup> 
                        <FormGroup>
                          <ControlLabel>Gender</ControlLabel>
                          <Select
                            name="gender"  value={[{value: this.state.gender, label: this.state.gender}]}    onChange={this.handleGenderSelectBox}
                            options={[{value: 'Male', label: 'Male'},
                                {value: 'Female', label: 'Female'},
                                {value: 'Other', label: 'Other'}]} 
                        />
                        </FormGroup>  
                        <FormGroup>
                      <ControlLabel>Status</ControlLabel>
                      <Radio
                            number="5"
                            option="1"
                            name="status"
                            onChange={this.handleChange}
                            checked={this.state.status === '1'}
                            label="Active"
                          />
                          <Radio
                            number="6"
                            option="0"
                            name="status"
                            onChange={this.handleChange}
                            checked={this.state.status === '0'}
                            label="Not Active"
                          />
                    </FormGroup> 
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                          <ControlLabel>Last Name</ControlLabel>
                          <FormControl name="last_name"  type="text" defaultValue={this.state.last_name} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Email</ControlLabel>
                          <FormControl name="email"  type="email" value={this.state.email} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Band</ControlLabel>
                          {console.log(this.state.bands)}
                          <Select
                            name="assign_user_id"  value={[{value: this.state.band_id, label: this.state.band_title}]}    onChange={this.handleBandSelectBox}
                            options={this.state.bands} 
                        />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Profile Picture</ControlLabel>
                          <br/>
                          <img height="100px" src={(this.state.full_url) ? this.state.full_url : ((this.state.profile_pic) ? globalVariables.img_upload_path+this.state.profile_pic : avatar)}/>
                          <FormControl name="profile_pic" id="profile_pic"  type="file" defaultValue={this.state.profile_pic} onChange={this.handleImageChange}/>
                        </FormGroup>   
                    </Col>
                    <Col md={12}>
                    <div className="text-center">
                    <Button bsStyle="info" fill type="submit">
                      Submit
                    </Button>
                    </div>
                    </Col>
                    </form>
                  </Col>
                  </Row>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default AddStaff;
