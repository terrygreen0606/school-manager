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
class BasicSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            basicSetupItems: [],
            selectedItem: null,
            setup_type: 'basic',
            setup_value: '',
            setup_key: ''
        };
        }
      
        componentDidMount() {
          let login_token = sessionStorage.getItem('login_token');
          axios.post(globalVariables.admin_api_path+'/setup/basic-settings', { setup_type:'basic' }, {
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
              this.setState({basicSetupItems: data.response})
            })
        }

        renderModal = () => {
          if (this.state.selectedItem !== null) {
            const SetupItem = this.state.basicSetupItems[this.state.selectedItem];
            return (
              <Row>
                <Col md={12}>
                    <FormGroup>
                      <ControlLabel>{SetupItem.description}</ControlLabel>
                      <FormControl  type="text" defaultValue={SetupItem.value} onChange={this.handleChange}/>
                    </FormGroup>
            </Col>
              </Row>
            );
          }
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

    onOpenModal = (i, key) => {
      const SetupItem = this.state.basicSetupItems[i];
      this.setState({
        showModal: true,
        selectedItem: i,
        setup_key: key,
        setup_value: SetupItem.value,
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
                        <th>Setup</th>
                        <th>Value</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    { this.state.basicSetupItems.map((basicSetupItem, index_key) => (
                      <tr key={index_key}>
                        <td>{basicSetupItem.description} </td>
                        <td>{basicSetupItem.value}</td>
                        <td className="td-actions text-right">
                            <OverlayTrigger placement="top" overlay={edit}>
                            <Button simple bsStyle="success" bsSize="xs"  fill
                      onClick={() => this.onOpenModal(index_key, basicSetupItem.key)}>
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
                        <Modal.Title>Edit Settings</Modal.Title>
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

export default BasicSettings;
