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
  Tooltip
} from "react-bootstrap";
// react component that creates a switch button that changes from on to off mode
import Switch from "react-bootstrap-switch";
import Axios from axios;

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";

class BasicSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            basicSetupItems: [],
            basicSetupItem: {}
        };
        }
  render() {
    const edit = <Tooltip id="edit">Edit</Tooltip>;
    const actions = (
      <td className="td-actions text-right">
        <OverlayTrigger placement="top" overlay={edit}>
          <Button simple bsStyle="success" bsSize="xs">
            <i className="fa fa-edit" />
          </Button>
        </OverlayTrigger>
      </td>
    );
    
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
                      <tr>
                        <td>Andrew </td>
                        <td>Develop</td>
                        <td className="td-actions text-right">
                            <OverlayTrigger placement="top" overlay={edit}>
                            <Button simple bsStyle="success" bsSize="xs"  fill
                      onClick={() => this.setState({ showModal: true })}>
                                <i className="fa fa-edit" />
                            </Button>
                            </OverlayTrigger>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                }
              />
            </Col>
            <Modal
                      show={this.state.showModal}
                      onHide={() => this.setState({ showModal: false })}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>

                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          simple
                          onClick={() => this.setState({ showModal: false })}
                        >
                          Close
                        </Button>
                        <Button
                          bsStyle="success"
                          fill
                          onClick={() => this.setState({ showModal: false })}
                        >
                          Save changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default BasicSettings;
