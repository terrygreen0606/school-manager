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
            showModal: false,
            SetupItems: [],
            selectedItem: null,
            setup_value: '',
            setup_key: ''
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
        let AllSetupItems = this.state.basicSetupItems;
        axios.post(globalVariables.admin_api_path+'/setup/update-setting', {key: this.state.setup_key, value: this.state.setup_value},{
          headers: { Authorization: "Bearer " + login_token }
        })
          .then(res => {
            this.props.handleClick("tr", 1, "Settings Updated Successfully");
            AllSetupItems[this.state.selectedItem] = res.data.response;
            this.setState({basicSetupItems: AllSetupItems});
            this.setState({ showModal: false });
           
          }).catch(error => {
            this.props.handleClick("tr", 3, error.response.data.msg);
          });
      }

      handleChange = event => {
        this.setState({ setup_value: event.target.value });
      }

      handleImageChange = event => {
        let image_file = event.target.files[0];
      const formData = new FormData();
      formData.append('avatar',image_file);
      let login_token = sessionStorage.getItem('login_token');
      axios.post(globalVariables.api_url+"/upload-image",formData,{
          headers: { Authorization: "Bearer " + login_token, 'content-type': 'multipart/form-data' }
        })
          .then((res) => {
              this.setState({full_url: res.data.full_url});
              this.setState({reward_image: res.data.response});
          }).catch((error) => {
              this.props.handleClick("tr", 3, "Image not uploaded");
      });
    }

    onOpenModal = (i, key) => {
        const SetupItem = this.state.SetupItems[i];
        this.setState({
          showModal: true,
          selectedItem: i,
          setup_key: key,
          level: SetupItem.level,
          description: SetupItem.description,
          reward: SetupItem.reward,
          reward_image: SetupItem.reward_image
        })
      };

        
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
                        <td>{(SetupItem.flag) ? <img src={SetupItem.flag} height="20px"/> : ''} </td>
                        <td>{SetupItem.code}</td>
                    <td>{SetupItem.language}</td>
                        <td className="td-actions text-right">
                            <Switch
                        onText="✔"
                        offText="✘"
                        defaultValue={(SetupItem.status == 1) ? true : false}
                      />
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
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <ControlLabel>Language Code</ControlLabel>
                        <FormControl name="code"  type="text"  onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Language Name</ControlLabel>
                        <FormControl name="language" type="text"  onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Language Flag</ControlLabel>
                        {(this.state.full_url) ? <img src={this.state.full_url} height="100px" />: ''}
                        <FormControl name="reward_image" type="file"  onChange={this.handleImageChange}/>
                    </FormGroup>
                    <Button type="submit"
                    bsStyle="success"
                    fill>
                    Save changes
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
