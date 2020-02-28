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
import Select from "react-select";
import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";
import Radio from "components/CustomRadio/CustomRadio.jsx";
import {Link} from "react-router-dom";
var globalVariables = require('../../../services/globalVariables.jsx');
class TicketList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            SetupItems: [],
            selectedItem: null,
            setup_key: '',
            ticket: '',
            description: '',
            status: '',
            assign_team: '',
            assign_user_id: '',
            assign_staff_id: '',
            Members: [],
            Staff: [],
            Teams: []
        };
        }
      
        componentDidMount() {
          let login_token = sessionStorage.getItem('login_token');
          let user_id = sessionStorage.getItem('user_id');
          axios.post(globalVariables.user_api_path+'/support-system/ticket-search',  {model_call: 'Ticket', search_f: 'ticket', user_id: user_id},{
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
              this.setState({SetupItems: data.response})
            });

            // axios.post(globalVariables.user_api_path+'/member/list',  {status: 1},{
            //   headers: { Authorization: "Bearer " + login_token }
            // })
            //   .then(res => res.data).then((data) => {
            //     let memmbers = [];
            //     console.log(data.response.length);
            //     for(var i = 0; i < data.response.length; i++)
            //     {
            //       console.log(data.response[i].id);
            //       memmbers.push({value: data.response[i].id, label: data.response[i].username});
            //     }
            //     this.setState({Members: memmbers});
            //     console.log(memmbers);
            //   });

            //   axios.post(globalVariables.admin_api_path+'/staff/list',  {roles_key: 'STAFF', status: 1},{
            //     headers: { Authorization: "Bearer " + login_token }
            //   })
            //     .then(res => res.data).then((data) => { 
            //       let staff = [];
            //     console.log(data.response.length);
            //     for(var i = 0; i < data.response.length; i++)
            //     {
            //       console.log(data.response[i].id);
            //       staff.push({value: data.response[i].id, label: data.response[i].username});
            //     }
            //     this.setState({Staff: staff});
            //     });

                axios.post(globalVariables.user_api_path+'/team/search',  {model_call: 'Team', search_f: 'status', 'search_text' : '1'},{
                  headers: { Authorization: "Bearer " + login_token }
                }).then(res => res.data).then((data) => { 
                    let Team = [];
                  console.log(data.response.length);
                  for(var i = 0; i < data.response.length; i++)
                  {
                    console.log(data.response[i].id);
                    Team.push({value: data.response[i].id, label: data.response[i].team_name});
                  }
                  this.setState({Teams: Team});
                  });
        }

        renderModal = () => {
          if (this.state.selectedItem !== null) {
           // const SetupItem = this.state.SetupItems[this.state.selectedItem];
            //console.log(SetupItem);
            return (
              <Row>
                <Col md={12}>
                    <FormGroup>
                      <ControlLabel>Ticket</ControlLabel>
                      <FormControl name="ticket"  type="text" defaultValue={this.state.ticket} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                    <ControlLabel>Description</ControlLabel>
                    <FormControl
                            name="description"
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Ticket Description"
                            defaultValue={this.state.description}
                            onChange={this.handleChange}
                          />
                    </FormGroup>

                    {/* <FormGroup>
                      <ControlLabel>User/Member</ControlLabel>
                      <Select
                            name="assign_user_id"  defaultValue={[{value: this.state.assign_user_id, label: this.state.assign_user_id_value}]}    onChange={value => this.setState({ assign_user_id: value, MemberError: null })}
                            options={this.state.Members} 
                        />
                        {this.state.userError}
                    </FormGroup> */}

                    <FormGroup>
                      <ControlLabel>Team</ControlLabel>
                      <Select
                            name="assign_team" defaultValue={[{value: this.state.assign_team, label: this.state.assign_team_value}]}  onChange={value => this.setState({ assign_team: value, TeamError: null })}
                            options={this.state.Teams} 
                        />
                        {this.state.TeamError}
                    </FormGroup>

                    {/* <FormGroup>
                      <ControlLabel>User/Staff</ControlLabel>
                      <Select
                            name="assign_staff_id"  defaultValue={[{value: this.state.assign_staff_id, label: this.state.assign_staff_id_value}]}    onChange={value => this.setState({ assign_staff_id: value, staffError: null })}
                            options={this.state.Staff} 
                        />
                        {this.state.staffError}
                    </FormGroup> */}

                    {/* <FormGroup>
                      <ControlLabel>Status</ControlLabel>
                      <Radio
                            number="5"
                            option="1"
                            name="status"
                            onChange={this.handleChange}
                            checked={this.state.status === '1'}
                            label="Close"
                          />
                          <Radio
                            number="6"
                            option="0"
                            name="status"
                            onChange={this.handleChange}
                            checked={this.state.status === '0'}
                            label="Open"
                          />
                    </FormGroup> */}
            </Col>
              </Row>
            );
          }
        }

      handleSubmit = event => {
        event.preventDefault();
        let login_token = sessionStorage.getItem('login_token');
        let user_id = sessionStorage.getItem('user_id');
        let AllSetupItems = this.state.SetupItems;
        console.log(this.state.description);
        axios.post(globalVariables.user_api_path+'/support-system/add-ticket', {model_call: 'Ticket', fillable_value:'id', fieldset:'id,ticket,description,status,assign_team,assign_user_id,assign_staff_id,', required_fields:'ticket,assign_team,assign_user_id', id: this.state.setup_key, ticket: this.state.ticket, description:this.state.description,assign_team:this.state.assign_team, assign_user_id:user_id, status: 0},{
          headers: { Authorization: "Bearer " + login_token }
        })
          .then(res => {
            this.props.handleClick("tr", 1, "Ticket Updated Successfully");
            axios.post(globalVariables.user_api_path+'/support-system/ticket-search',  {model_call: 'Ticket', search_f: 'ticket', user_id: user_id},{
              headers: { Authorization: "Bearer " + login_token }
            })
              .then(res => res.data).then((data) => {
                this.setState({SetupItems: data.response})
              });
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
              ticket: SetupItem.ticket,
              status: SetupItem.status,
              description: SetupItem.description,
              assign_staff_id: SetupItem.assign_staff_id,
              assign_team: SetupItem.assign_team,
              assign_user_id: SetupItem.assign_user_id,
              assign_team_value: SetupItem.assign_team_value,
              assign_staff_id_value: SetupItem.assign_staff_id_value,
              assign_user_id_value: SetupItem.assign_user_id_value
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
    const edit = <Tooltip id="edit">Add a reply</Tooltip>;
    
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card title={<span>Ticket List <Button simple bsStyle='primary' bsSize='small'  fill
                      onClick={() => this.onOpenModal(-1,-1)}>
                        <span className="btn-label">
                          <i className="fa fa-plus" />
                        </span>
                                Create New Ticket
                            </Button></span>}
                tableFullWidth
                content={
                    <div>   
                  <Table responsive>
                    <thead>
                      <tr>
                      <th>Ticket</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Assign to Team</th>
                        <th>User ID</th>
                        <th>Assign Staff Member</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.SetupItems.map((SetupItem, index_key) => (
                      <tr key={index_key}>
                    <td>{SetupItem.ticket}</td>
                    <th>{SetupItem.description}</th>
                   <td>{(() => {
                                switch(SetupItem.status)
                                {
                                    case '1':
                                        return  <Button simple bsStyle="success" bsSize="xs"  fill> Closed </Button>;
                                    case '0':
                                        return  <Button simple bsStyle="danger" bsSize="xs"  fill> Open </Button>;
                                }
                            })()} </td>
                <td>{SetupItem.assign_team_value}</td>
                <td>{SetupItem.assign_user_id_value}</td>
                <td>{SetupItem.assign_staff_id_value}</td>
                        <td className="td-actions">
                        <Link to={{pathname: `/member/ticket-reply/${SetupItem.id}`}}>
                            <OverlayTrigger placement="top" overlay={edit}>
                            <Button simple bsStyle="primary" bsSize="xs"  fill>
                                <i className="fa fa-eye" />
                            </Button>
                            </OverlayTrigger>
                            </Link>
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
                        <Modal.Title>{(this.state.ticket) ? 'Update' : 'Add'} Ticket</Modal.Title>
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

export default TicketList;
