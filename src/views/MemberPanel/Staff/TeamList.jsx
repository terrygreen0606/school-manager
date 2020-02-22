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
import Datetime from "react-datetime";
import axios from 'axios';

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";
import Radio from "components/CustomRadio/CustomRadio.jsx";
var globalVariables = require('../../services/globalVariables.jsx');
class TeamList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            SetupItems: [],
            selectedItem: null,
            setup_key: '',
            team_name: '',
            description: '',
            status: '',
            from_date: '',
            to_date: ''
        };
        }
      
        componentDidMount() {
          let login_token = sessionStorage.getItem('login_token');
          axios.post(globalVariables.admin_api_path+'/team/search',  {model_call: 'Team', search_f: 'team_name'},{
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
              this.setState({SetupItems: data.response})
            })
        }

        renderModal = () => {
          if (this.state.selectedItem !== null) {
           // const SetupItem = this.state.SetupItems[this.state.selectedItem];
            //console.log(SetupItem);
            return (
              <Row>
                <Col md={12}>
                    <FormGroup>
                      <ControlLabel>Team Name</ControlLabel>
                      <FormControl name="team_name"  type="text" defaultValue={this.state.team_name} onChange={this.handleChange}/>
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
              </Row>
            );
          }
        }

      handleSubmit = event => {
        event.preventDefault();
        let login_token = sessionStorage.getItem('login_token');
        let AllSetupItems = this.state.SetupItems;
        axios.post(globalVariables.admin_api_path+'/team/add', {model_call: 'Team', fillable_value:'id', fieldset:'id,team_name,status', required_fields:'team_name,status', id: this.state.setup_key, team_name: this.state.team_name, status: this.state.status},{
          headers: { Authorization: "Bearer " + login_token }
        })
          .then(res => {
            this.props.handleClick("tr", 1, "Team Updated Successfully");
            axios.post(globalVariables.admin_api_path+'/team/search',  {model_call: 'Team', search_f: 'team_name'},{
                headers: { Authorization: "Bearer " + login_token }
              })
                .then(res => res.data).then((data) => {
                  this.setState({SetupItems: data.response})
                })
            this.setState({ showModal: false });
           
          }).catch(error => {
            this.props.handleClick("tr", 3, error.response.data.msg);
          });
      }

      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(event.target.value);
      }

    onOpenModal = (i, key) => {
        if(i >= 0 && key >= 0)
        {
            const SetupItem = this.state.SetupItems[i];
            this.setState({
              showModal: true,
              selectedItem: i,
              setup_key: key,
              team_name: SetupItem.team_name,
              status: SetupItem.status
            })
        }
        else
        {
            this.setState({
              showModal: true,
              selectedItem: '',
              setup_key: '',
              team_name: '',
              description: '',
              status: '',
              to_date: '',
              from_date: ''
            })
        }
     
    };
        
  render() {
    const edit = <Tooltip id="edit">Edit</Tooltip>;
    
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card title={<span>Team List <Button simple bsStyle='primary' bsSize='small'  fill
                      onClick={() => this.onOpenModal(-1,-1)}>
                        <span className="btn-label">
                          <i className="fa fa-plus" />
                        </span>
                                Add New Team
                            </Button></span>}
                tableFullWidth
                content={
                    <div>   
                  <Table responsive>
                    <thead>
                      <tr>
                      <th>Team</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.SetupItems.map((SetupItem, index_key) => (
                      <tr key={index_key}>
                    <td>{SetupItem.team_name}</td>
                   <td>{(() => {
                                switch(SetupItem.status)
                                {
                                    case '1':
                                        return  <Button simple bsStyle="success" bsSize="xs"  fill> Active </Button>;
                                    case '0':
                                        return  <Button simple bsStyle="danger" bsSize="xs"  fill> Not Active </Button>;
                                }
                            })()} </td>
                        <td className="td-actions">
                            <OverlayTrigger placement="top" overlay={edit}>
                            <Button simple bsStyle="primary" bsSize="xs"  fill
                      onClick={() => this.onOpenModal(index_key, SetupItem.id)}>
                                <i className="fa fa-edit" />
                            </Button>
                            </OverlayTrigger>
                        </td>
                      </tr>
                    )) }
                    </tbody>
                  </Table>
                  </div>
                }
              />
            </Col>
            <Modal
                      show={this.state.showModal}
                      onHide={() => this.setState({ showModal: false })}
                    >
                      <form onSubmit={this.handleSubmit}>
                      <Modal.Header closeButton>
                        <Modal.Title>{(this.state.team_name) ? 'Update' : 'Add'} Team</Modal.Title>
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

export default TeamList;
