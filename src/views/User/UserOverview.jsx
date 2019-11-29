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
  Grid,
  Row,
  Col,
  PanelGroup,
  Panel,
  Nav,
  NavItem,
  Tab
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";

import FormInputs from "components/FormInputs/FormInputs.jsx";
import UserCard from "components/Card/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import avatar from "assets/img/default-avatar.png";
import { Link } from "react-router-dom";
var globalVariables = require('../../services/globalVariables.jsx');

class UserOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ProfileData: '',
            TempProfileData: {}
        };
        }
 /* componentDidUpdate(e) {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      this._reactInternalInstance._currentElement._owner._instance._reactInternalInstance._currentElement._owner._instance.componentDidUpdate(
        e
      );
    }
  }
  */
  isMac() {
    let bool = false;
    if (
      navigator.platform.toUpperCase().indexOf("MAC") >= 0 ||
      navigator.platform.toUpperCase().indexOf("IPAD") >= 0
    ) {
      bool = true;
    }
    return bool;
  }

  componentDidMount()
  {
      let login_token = sessionStorage.getItem('login_token');
          axios.get(globalVariables.admin_api_path+'/profile-api', {
          headers: { Authorization: "Bearer " + login_token }
          })
          .then(res => res.data).then((data) => {
              this.setState({ProfileData: data.response});
            //  this.setState({TempProfileData: data.response});
          })
  }

  handleSubmit = event => {
      event.preventDefault();
      let login_token = sessionStorage.getItem('login_token');
      let TempProfileData = this.state.TempProfileData;

      axios.post(globalVariables.admin_api_path+'/update-profile', TempProfileData,{
        headers: { Authorization: "Bearer " + login_token }
      })
        .then(res => {
          this.setState({ProfileData: res.data.response});
          this.setState({TempProfileData: res.data.response});
          this.sessionStorage.setItem('user_profile',res.data.response.profile_pic);
          sessionStorage.setItem('first_name', res.data.response.first_name);
          sessionStorage.setItem('last_name', res.data.response.last_name);
          sessionStorage.setItem('user_id', res.data.response.id);
          sessionStorage.setItem('user_username', res.data.response.username);
          sessionStorage.setItem('user_email', res.data.response.email);
          this.props.handleClick("tr", 1, "Settings Updated Successfully");
        }).catch(error => {
          this.props.handleClick("tr", 3, error.response.data.msg);
        });
    }

    handleChange = event => {
      const TempProfileData = this.state.TempProfileData;
      TempProfileData['username'] = this.state.ProfileData.username
      TempProfileData['email'] = this.state.ProfileData.email;
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
           // this.setState({full_url: res.data.full_url});
           // this.setState({flag: res.data.response});
        }).catch((error) => {
            this.props.handleClick("tr", 3, "Image not uploaded");
    });
  }


  render() {
    const defaultPanel = (
      <PanelGroup id="panels" ref="panels" onClick={() => this.forceUpdate()}>
        <Panel eventKey="1">
          <Panel.Heading>
            <Panel.Title toggle>
              User Earnings
              <b className="caret" />
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
            skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
            Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
            single-origin coffee nulla assumenda shoreditch et. Nihil anim
            keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
            sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
            occaecat craft beer farm-to-table, raw denim aesthetic synth
            nesciunt you probably haven't heard of them accusamus labore
            sustainable VHS.
          </Panel.Body>
        </Panel>
        <Panel eventKey="2">
          <Panel.Heading>
            <Panel.Title toggle>
              Referrals
              <b className="caret" />
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
            skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
            Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
            single-origin coffee nulla assumenda shoreditch et. Nihil anim
            keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
            sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
            occaecat craft beer farm-to-table, raw denim aesthetic synth
            nesciunt you probably haven't heard of them accusamus labore
            sustainable VHS.
          </Panel.Body>
        </Panel>
        <Panel eventKey="3">
          <Panel.Heading>
            <Panel.Title toggle>
              Binary Details
              <b className="caret" />
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
            skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
            Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
            single-origin coffee nulla assumenda shoreditch et. Nihil anim
            keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
            sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
            occaecat craft beer farm-to-table, raw denim aesthetic synth
            nesciunt you probably haven't heard of them accusamus labore
            sustainable VHS.
          </Panel.Body>
        </Panel>
        <Panel eventKey="4">
          <Panel.Heading>
            <Panel.Title toggle>
                Ewallet
              <b className="caret" />
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
            skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
            Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
            single-origin coffee nulla assumenda shoreditch et. Nihil anim
            keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
            sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
            occaecat craft beer farm-to-table, raw denim aesthetic synth
            nesciunt you probably haven't heard of them accusamus labore
            sustainable VHS.
          </Panel.Body>
        </Panel>
        <Panel eventKey="5">
          <Panel.Heading>
            <Panel.Title toggle>
              User E-Pin
              <b className="caret" />
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
            skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
            Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
            single-origin coffee nulla assumenda shoreditch et. Nihil anim
            keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
            sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
            occaecat craft beer farm-to-table, raw denim aesthetic synth
            nesciunt you probably haven't heard of them accusamus labore
            sustainable VHS.
          </Panel.Body>
        </Panel>
        <Panel eventKey="6">
          <Panel.Heading>
            <Panel.Title toggle>
                Released Income
              <b className="caret" />
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
            skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
            Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
            single-origin coffee nulla assumenda shoreditch et. Nihil anim
            keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
            sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
            occaecat craft beer farm-to-table, raw denim aesthetic synth
            nesciunt you probably haven't heard of them accusamus labore
            sustainable VHS.
          </Panel.Body>
        </Panel>
        <Panel eventKey="7">
          <Panel.Heading>
            <Panel.Title toggle>
              Business Volume
              <b className="caret" />
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
            skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
            Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
            single-origin coffee nulla assumenda shoreditch et. Nihil anim
            keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
            sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
            occaecat craft beer farm-to-table, raw denim aesthetic synth
            nesciunt you probably haven't heard of them accusamus labore
            sustainable VHS.
          </Panel.Body>
        </Panel>
      </PanelGroup>
    );

    
    
    return (
      <div className="main-content">
        <Grid fluid>
        <Row>
            <Col md={8}>
              <Card
                title="Profile Details"
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
                avatar={(this.state.ProfileData.profile_pic) ? globalVariables.img_upload_path+this.state.ProfileData.profile_pic : avatar}
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
          <Row>
            <Col md={12}>
              <Card
                title=""
                category=""
                content={defaultPanel}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserOverview;
