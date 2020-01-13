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
class TicketCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            SetupItems: [],
            selectedItem: null,
            setup_key: '',
            ticket_category: '',
            status: ''
        };
        }
      
        componentDidMount() {
          let login_token = sessionStorage.getItem('login_token');
          axios.post(globalVariables.admin_api_path+'/support-system/category-search',  {model_call: 'Ticket_category', search_f: 'ticket_category'},{
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
                      <ControlLabel>Ticket Category</ControlLabel>
                      <FormControl name="ticket_category"  type="text" defaultValue={this.state.ticket_category} onChange={this.handleChange}/>
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
        axios.post(globalVariables.admin_api_path+'/support-system/add-category', {model_call: 'Ticket_category', fillable_value:'id', fieldset:'id,ticket_category,status', required_fields:'ticket_category,status', id: this.state.setup_key, ticket_category: this.state.ticket_category, status: this.state.status},{
          headers: { Authorization: "Bearer " + login_token }
        })
          .then(res => {
            this.props.handleClick("tr", 1, "Category Updated Successfully");
            axios.post(globalVariables.admin_api_path+'/support-system/category-search',  {model_call: 'Ticket_category', search_f: 'ticket_category'},{
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
              ticket_category: SetupItem.ticket_category,
              status: SetupItem.status
            })
        }
        else
        {
            this.setState({
              showModal: true,
              selectedItem: '',
              setup_key: '',
              ticket_category: '',
              status: ''
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
              <Card title={<span>Ticket Category List <Button simple bsStyle='primary' bsSize='small'  fill
                      onClick={() => this.onOpenModal(-1,-1)}>
                        <span className="btn-label">
                          <i className="fa fa-plus" />
                        </span>
                                Add New Ticket Category
                            </Button></span>}
                tableFullWidth
                content={
                    <div>   
                  <Table responsive>
                    <thead>
                      <tr>
                      <th>Ticket Category</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.SetupItems.map((SetupItem, index_key) => (
                      <tr key={index_key}>
                    <td>{SetupItem.ticket_category}</td>
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
                        <Modal.Title>{(this.state.team_name) ? 'Update' : 'Add'} Ticket Category</Modal.Title>
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

export default TicketCategories;
