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
class LevelCommissionSetup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            SetupItems: [],
            selectedItem: null,
            setup_key: '',
            commission: '',
            level: '',
            description: ''
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
                      <ControlLabel>Commission</ControlLabel>
                      <FormControl name="commission" type="number" defaultValue={SetupItem.commission} onChange={this.handleChange}/>
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
        axios.post(globalVariables.admin_api_path+'/setup/update-level-commission', {id: this.state.setup_key, level: this.state.level, commission: this.state.commission, description: this.state.description},{
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

    onOpenModal = (i, key) => {
      const SetupItem = this.state.SetupItems[i];
      this.setState({
        showModal: true,
        selectedItem: i,
        setup_key: key,
        level: SetupItem.level,
        description: SetupItem.description,
        commission: SetupItem.commission
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
                        <th>Commission</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.SetupItems.map((SetupItem, index_key) => (
                      <tr key={index_key}>
                    <td>Level {index_key+1}</td>
                    <td>{SetupItem.level}</td>
                    <td>{SetupItem.description}</td>
                        <td>{SetupItem.commission}</td>
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
                        <Modal.Title>Update Level Commission</Modal.Title>
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

export default LevelCommissionSetup;
