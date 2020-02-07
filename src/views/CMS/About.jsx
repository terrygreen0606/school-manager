/*!
CMS About Us
*/
import React, { Component } from "react";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import FormInputs from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import CKEditor from "react-ckeditor-component";
import avatar from "assets/img/default-avatar.png";
var globalVariables = require('../../services/globalVariables.jsx');

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PageData: '',
            TempPageData: {},
            FImage: ''
        };
        }

    componentDidMount()
    {
        let login_token = sessionStorage.getItem('login_token');
            axios.post(globalVariables.admin_api_path+'/setup/search-cms-page', {search_f: 'page_key', model_call: 'Setup_cms', search_text: 'about_us'}, {
            headers: { Authorization: "Bearer " + login_token }
            })
            .then(res => res.data).then((data) => {
                console.log(data);
                this.setState({PageData: data.response[0]});
                this.setState({FImage: globalVariables.img_upload_path+'/'+data.response[0].featured_image})
                this.setState({TempPageData: data.response[0]});
            })
    }

    handleSubmit = event => {
        event.preventDefault();
        let login_token = sessionStorage.getItem('login_token');
        let TempPageData = this.state.TempPageData;
        console.log(TempPageData);
        TempPageData.fillable_value = 'about_us';
        TempPageData.model_call = 'Setup_cms';
        console.log(TempPageData);

        axios.post(globalVariables.admin_api_path+'/setup/update-cms-page', TempPageData,{
          headers: { Authorization: "Bearer " + login_token }
        })
          .then(res => {
            this.setState({PageData: res.data.response});
            this.setState({TempPageData: res.data.response});
            this.props.handleClick("tr", 1, "Content Updated Successfully");
          }).catch(error => {
            this.props.handleClick("tr", 3, error.response.data.msg);
          });
      }

      handleChange = event => {
        const TempPageData = this.state.TempPageData;
        TempPageData[event.target.name] = event.target.value;
        this.setState({ TempPageData : TempPageData });
      }

      onChangeCK = event => {
        const TempPageData = this.state.TempPageData;
        TempPageData['description'] = event.editor.getData();
        this.setState({
            TempPageData : TempPageData
        })
      }


      handleImageChange = event => {
        let image_file = event.target.files[0];
      const formData = new FormData();
      formData.append('avatar',image_file);
      formData.append('avatar_prefix','about_');
      let login_token = sessionStorage.getItem('login_token');
      axios.post(globalVariables.api_url+"/upload-image",formData,{
          headers: { Authorization: "Bearer " + login_token, 'content-type': 'multipart/form-data' }
        })
          .then((res) => {
            const TempPageData = this.state.TempPageData;
            TempPageData['page_title'] = this.state.PageData.page_title;
            TempPageData['description'] = this.state.PageData.description;
            TempPageData['featured_image'] = res.data.response;
            this.setState({ TempPageData : TempPageData });
            this.setState({FImage: res.data.full_url});
             // this.setState({full_url: res.data.full_url});
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
              <Card
                title="Edit About Us Data"
                content={
                  <form  onSubmit={this.handleSubmit}>
                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: "Title",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Title",
                          defaultValue: this.state.PageData.page_title,
                          name: "page_title",
                          onChange: this.handleChange
                        }
                      ]}
                    />

                     {'Description'}
                    <CKEditor  ncols={["col-md-12"]}
                                activeClass="editor" 
                                content={this.state.PageData.description} 
                                events={{
                                    "change": this.onChangeCK
                                }}
                                name="description"
                                /> 

                    <img alt="About Us" height="150px" src = {this.state.FImage ? this.state.FImage : avatar}/>
                    <FormInputs  ncols={["col-md-6"]}
                      proprieties={[
                        {
                            label: "Upload Featured Image",
                            type: "file",
                            bsClass: "form-control",
                            name: 'featured_image',
                            onChange: this.handleImageChange
                        }
                      ]}/>
                                
                    <div className="clearfix" />
                    <Button bsStyle="info" pullRight fill type="submit">
                      Update
                    </Button> 
                    <div className="clearfix" />
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

export default About;
