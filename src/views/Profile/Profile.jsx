/*!
User Profile
*/
import React, { Component } from "react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Grid,
  Row,
  Col
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import FormInputs from "components/FormInputs/FormInputs.jsx";
import UserCard from "components/Card/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import avatar from "assets/img/default-avatar.png";
import { Link } from "react-router-dom";
var globalVariables = require('../../services/globalVariables.jsx');

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ProfileData: '',
            TempProfileData: {},
            full_url: ''
        };
        }

    componentDidMount()
    {
        let login_token = sessionStorage.getItem('login_token');
            axios.get(globalVariables.profile_api_path, {
            headers: { Authorization: "Bearer " + login_token }
            })
            .then(res => res.data).then((data) => {
                this.setState({ProfileData: data.response});
                if((data.response.profile_pic !== null && data.response.profile_pic !== 'null' && data.response.profile_pic !== '' ))
                {
                  this.setState({full_url: globalVariables.img_upload_path+data.response.profile_pic});
                }
              //  this.setState({TempProfileData: data.response});
            })
    }

    handleSubmit = event => {
        event.preventDefault();
        let login_token = sessionStorage.getItem('login_token');
        const TempProfileData = this.state.TempProfileData;
        TempProfileData['id'] = this.state.ProfileData.id;
        TempProfileData['username'] = this.state.ProfileData.username;
        TempProfileData['email'] = this.state.ProfileData.email;
        let update_url = globalVariables.admin_api_path+'/update-profile';
        switch(sessionStorage.getItem('roles_key'))
        {
          case "MEMBER":
            update_url = globalVariables.user_api_path+'/update-profile';
          break;
          default:
            update_url = globalVariables.admin_api_path+'/update-profile';
          break;
        }
        axios.post(update_url, TempProfileData,{
          headers: { Authorization: "Bearer " + login_token }
        })
          .then(res => {
            this.setState({ProfileData: res.data.response});
            this.setState({TempProfileData: res.data.response});
            sessionStorage.setItem('profile_pic',res.data.response.profile_pic);
            sessionStorage.setItem('first_name', res.data.response.first_name);
            sessionStorage.setItem('last_name', res.data.response.last_name);
            sessionStorage.setItem('user_id', res.data.response.id);
            sessionStorage.setItem('user_username', res.data.response.username);
            sessionStorage.setItem('user_email', res.data.response.email);
            this.props.handleClick("tr", 1, "Profile Updated Successfully");
          }).catch(error => {
            this.props.handleClick("tr", 3, error.response.data.msg);
          });
      }

      handleChange = event => {
        const TempProfileData = this.state.TempProfileData;
        TempProfileData['username'] = this.state.ProfileData.username
        TempProfileData['email'] = this.state.ProfileData.email;
        TempProfileData['id'] = this.state.ProfileData.id;
        console.log(this.state.ProfileData);
        console.log(this.state.TempProfileData);
        TempProfileData[event.target.name] = event.target.value;
        this.setState({ TempProfileData : TempProfileData });
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
            const TempProfileData = this.state.TempProfileData;
            TempProfileData['username'] = this.state.ProfileData.username;
            TempProfileData['email'] = this.state.ProfileData.email;
            TempProfileData['profile_pic'] = res.data.response;
            this.setState({ TempProfileData : TempProfileData });
            this.setState({full_url: res.data.full_url});
              this.setState({flag: res.data.response});
          }).catch((error) => {
              this.props.handleClick("tr", 3, "Image not uploaded");
      });
    }

    
  render() {
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Edit Profile"
                content={
                  <form  onSubmit={this.handleSubmit}>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      proprieties={[
                        {
                          label: "Username",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Username",
                          defaultValue: this.state.ProfileData.username,
                          name: "user_name",
                          disabled: true
                        },
                        {
                          label: "Email address",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Email",
                          defaultValue: this.state.ProfileData.email,
                          name: 'email',
                          disabled: true
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      proprieties={[
                        {
                          label: "First name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "First name",
                          defaultValue: this.state.ProfileData.first_name,
                          onChange: this.handleChange,
                          name: 'first_name'
                        },
                        {
                          label: "Last name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Last name",
                          defaultValue: this.state.ProfileData.last_name,
                          onChange: this.handleChange,
                          name: 'last_name'
                        }
                      ]}
                    />
                    <FormInputs  ncols={["col-md-6", "col-md-6"]}
                      proprieties={[
                        {
                            label: "Date of Birth",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Date of Birth",
                            defaultValue: this.state.ProfileData.dob,
                            onChange: this.handleChange,
                            name: 'dob'
                          },
                          {
                            label: "Phone Number",
                            type: "tel",
                            bsClass: "form-control",
                            placeholder: "Phone Number",
                            defaultValue: this.state.ProfileData.phone_number,
                            onChange: this.handleChange,
                            name: 'phone_number'
                          }
                      ]}/>

                    <FormInputs  ncols={["col-md-6"]}
                      proprieties={[
                        {
                            label: "Upload Profile Image",
                            type: "file",
                            bsClass: "form-control",
                            name: 'profile_pic',
                            onChange: this.handleImageChange
                          }
                      ]}/>
                    
                    <Button bsStyle="info" pullRight fill type="submit">
                      Update Profile
                    </Button> 
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={(this.state.full_url) ? this.state.full_url : avatar}
                name={this.state.ProfileData.first_name+ ' '+this.state.ProfileData.last_name}
                userName={this.state.ProfileData.username}
                description={
                  <span>
                    "Lamborghini Mercy
                    <br />
                    Your chick she so thirsty
                    <br />
                    I'm in that two seat Lambo"
                  </span>
                }
                socials={
                  <div>
                      {(this.state.ProfileData.facebook_url) ?
                    <Link to={this.state.ProfileData.facebook_url}>
                    <Button simple>
                      <i className="fa fa-facebook-square" />
                    </Button>
                    </Link>
                    :''}
                    {(this.state.ProfileData.twitter_url) ? 
                    <Button simple>
                      <i className="fa fa-twitter" />
                    </Button>
                    :''}
                    {(this.state.ProfileData.instagram_url) ?
                    <Button simple>
                      <i className="fa fa-google-plus-square" />
                    </Button>
                    :''}
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Profile;
