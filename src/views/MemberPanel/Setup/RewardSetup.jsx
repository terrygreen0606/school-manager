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
class RewardSetup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            SetupItems: [],
            selectedItem: null,
            setup_key: '',
            reward: '',
            level: '',
            description: '',
            reward_image: '',
            full_url: ''
        };
        }
      
        componentDidMount() {
          let login_token = sessionStorage.getItem('login_token');
          axios.get(globalVariables.admin_api_path+'/setup/level-commission-settings', {
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
              this.setState({SetupItems: data.response})
            })
        }

        renderModal = () => {
          if (this.state.selectedItem !== null) {
            const SetupItem = this.state.SetupItems[this.state.selectedItem];
            return (
              <Row>
                <Col md={12}>
                    <FormGroup>
                      <ControlLabel>Level Title</ControlLabel>
                      <FormControl name="level"  type="text" defaultValue={SetupItem.level} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Level Description</ControlLabel>
                      <FormControl name="description"  type="textarea" defaultValue={SetupItem.description} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Reward</ControlLabel>
                      <FormControl name="reward" type="text" defaultValue={SetupItem.reward} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Reward Image</ControlLabel>
                      {(this.state.full_url) ? <img src={this.state.full_url} height="100px" />: ''}
                      <FormControl name="reward_image" type="file" defaultValue={SetupItem.reward_image} onChange={this.handleImageChange}/>
                    </FormGroup>
            </Col>
              </Row>
            );
          }
        }

      handleSubmit = event => {
        event.preventDefault();
        let login_token = sessionStorage.getItem('login_token');
        let AllSetupItems = this.state.SetupItems;
        axios.post(globalVariables.admin_api_path+'/setup/update-level-commission', {id: this.state.setup_key, level: this.state.level, reward: this.state.reward, description: this.state.description, reward_image: this.state.reward_image},{
          headers: { Authorization: "Bearer " + login_token }
        })
          .then(res => {
            this.props.handleClick("tr", 1, "Level Updated Successfully");
            AllSetupItems[this.state.selectedItem] = res.data.response;
            this.setState({SetupItems: AllSetupItems});
            this.setState({ showModal: false });
           
          }).catch(error => {
            this.props.handleClick("tr", 3, error.response.data.msg);
          });
      }

      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
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
            <Col md={12}>
              <Card
                tableFullWidth
                content={
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Level Title</th>
                        <th>Description</th>
                        <th>Reward</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.SetupItems.map((SetupItem, index_key) => (
                      <tr key={index_key}>
                    <td>Level {index_key+1}</td>
                    <td>{SetupItem.level}</td>
                    <td>{SetupItem.description}</td>
                    <td>{(SetupItem.reward_image) ? <img src = {globalVariables.img_upload_path+SetupItem.reward_image} height="100px"/> : ''} {SetupItem.reward}</td>
                        <td className="td-actions text-right">
                            <OverlayTrigger placement="top" overlay={edit}>
                            <Button simple bsStyle="success" bsSize="xs"  fill
                      onClick={() => this.onOpenModal(index_key, SetupItem.id)}>
                                <i className="fa fa-edit" />
                            </Button>
                            </OverlayTrigger>
                        </td>
                      </tr>
                    )) }
                    </tbody>
                  </Table>
                }
              />
            </Col>
            <Modal
                      show={this.state.showModal}
                      onHide={() => this.setState({ showModal: false })}
                    >
                      <form onSubmit={this.handleSubmit}>
                      <Modal.Header closeButton>
                        <Modal.Title>Update Reward</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                      {this.renderModal()}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          simple
                          onClick={() => this.setState({ showModal: false })}
                        >
                          Close
                        </Button>
                        <Button type="submit"
                          bsStyle="success"
                          fill
                         /* onClick={() => this.setState({ showModal: false })} */
                        >
                          Save changes
                        </Button>
                      </Modal.Footer>
                      </form>
                    </Modal>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default RewardSetup;
