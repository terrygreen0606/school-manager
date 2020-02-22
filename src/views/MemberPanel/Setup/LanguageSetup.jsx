/*!
Language Settings
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
  FormControl,
  ControlLabel
} from "react-bootstrap";
import Switch from "react-bootstrap-switch";
// react component that creates a switch button that changes from on to off mode
// import Switch from "react-bootstrap-switch";
import axios from 'axios';

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";
var globalVariables = require('../../services/globalVariables.jsx');
class LanguageSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SetupItems: [],
            selectedItem: null,
            setup_value: '',
            setup_key: '',
            language: '',
            code: '',
            full_url: '',
            flag: ''
        };
        }
      
        componentDidMount() {
          let login_token = sessionStorage.getItem('login_token');
          axios.get(globalVariables.admin_api_path+'/setup/language-list', {
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
              this.setState({SetupItems: data.response})
            })
        }


      handleSubmit = event => {
        event.preventDefault();
        let login_token = sessionStorage.getItem('login_token');
        let AllSetupItems = this.state.SetupItems;
        axios.post(globalVariables.admin_api_path+'/setup/add-new-language', {language: this.state.language, code: this.state.code, flag: this.state.flag},{
          headers: { Authorization: "Bearer " + login_token }
        })
          .then(res => {
            AllSetupItems.push(res.data.response);
            this.setState({SetupItems: AllSetupItems});
            this.setState({language: ''});
            this.setState({flag: ''});
            this.setState({code: ''});
            this.setState({full_url: ''});
            document.getElementById('add_new_language_form').reset();
            this.props.handleClick("tr", 1, "Settings Updated Successfully");
          }).catch(error => {
            this.props.handleClick("tr", 3, error.response.data.msg);
          });
      }

      handleChange = event => {
        this.setState({ [event.target.name] : event.target.value });
      }

      handleSwitch = code => () => {
        let login_token = sessionStorage.getItem('login_token');
        axios.post(globalVariables.admin_api_path+'/setup/update-language-status', {lang: code},{
          headers: { Authorization: "Bearer " + login_token }
        })
          .then(res => {
            axios.get(globalVariables.admin_api_path+'/setup/language-list', {
              headers: { Authorization: "Bearer " + login_token }
            })
              .then(res => res.data).then((data) => {
                this.setState({SetupItems: data.response})
              })
            this.props.handleClick("tr", 1, "Settings Updated Successfully");
          }).catch(error => {
            this.props.handleClick("tr", 3, error.response.data.msg);
          });
       // this.setState({ [event.target.name] : event.target.value });
      // console.log(event.target.value);
       console.log(code);
      }

      handleImageChange = event => {
        let image_file = event.target.files[0];
      const formData = new FormData();
      formData.append('avatar',image_file);
      formData.append('avatar_prefix','lang_flag_');
      let login_token = sessionStorage.getItem('login_token');
      axios.post(globalVariables.api_url+"/upload-image",formData,{
          headers: { Authorization: "Bearer " + login_token, 'content-type': 'multipart/form-data' }
        })
          .then((res) => {
              this.setState({full_url: res.data.full_url});
              this.setState({flag: res.data.response});
          }).catch((error) => {
              this.props.handleClick("tr", 3, "Image not uploaded");
      });
    }

        
  render() {
    const edit = <Tooltip id="edit">Edit</Tooltip>;
    
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={6}>
              <Card
                tableFullWidth
                content={
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Flag</th>
                        <th>Lang Code</th>
                        <th>Language Name</th>
                        <th className="text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                    { this.state.SetupItems.map((SetupItem, index_key) => (
                      <tr key={index_key}>
                        <td>{(SetupItem.flag) ? <img src={globalVariables.img_upload_path+SetupItem.flag} height="20px"/> : ''} </td>
                        <td>{SetupItem.code}</td>
                    <td>{SetupItem.language}</td>
                        <td className="td-actions text-right">
                            <Switch
                        onText="✔"
                        offText="✘"
                        value={(SetupItem.status == 1) ? true : false}
                       code={SetupItem.code} onChange={this.handleSwitch(SetupItem.code)}/>
                        </td>
                      </tr>
                    )) }
                    </tbody>
                  </Table>
                }
              />
            </Col>

            <Col md={6}>
                <Card title="Add New Language" content={
                <form onSubmit={this.handleSubmit} id="add_new_language_form">
                    <FormGroup>
                        <ControlLabel>Language Code</ControlLabel>
                        <FormControl name="code"  type="text" defaultValue={this.state.code}  onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Language Name</ControlLabel>
                        <FormControl name="language" type="text" defaultValue={this.state.language}  onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Language Flag</ControlLabel>
                        {(this.state.full_url) ? <img src={this.state.full_url} height="100px" />: ''}
                        <FormControl name="flag" type="file"  onChange={this.handleImageChange}/>
                    </FormGroup>
                    <Button type="submit"
                    bsStyle="success"
                    fill>
                    Add Language
                    </Button>
                </form>
            }/>
                    </Col>
                    
          </Row>
        </Grid>
      </div>
    );
  }
}

export default LanguageSettings;
