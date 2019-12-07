/*!
Transaction
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
class Epins extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            contentList: [],
            selectedItem: null,
            setup_value: '',
            setup_key: ''
        };
        }
      
        componentDidMount() {
          let login_token = sessionStorage.getItem('login_token');
          axios.post(globalVariables.admin_api_path+'/epin/search', {model_call: 'Epin', search_f:'epin_id'}, {
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
              this.setState({contentList: data.response});
              console.log(this.state.contentList);
            })
        }

        renderModal = () => {
           // const SetupItem = this.state.SetupItems[this.state.selectedItem];
            //console.log(SetupItem);
            return (
              <Row>
                <Col md={12}>
                    <FormGroup>
                      <ControlLabel>Question</ControlLabel>
                      <FormControl name="question"  type="text" defaultValue={this.state.question} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Answer</ControlLabel>
                      <FormControl name="answer"  type="textarea" defaultValue={this.state.answer} onChange={this.handleChange}/>
                    </FormGroup>    
                </Col>
              </Row>
            );
        }

        handleSubmit = event => {
          event.preventDefault();
          let login_token = sessionStorage.getItem('login_token');
          let AllSetupItems = this.state.SetupItems;
          axios.post(globalVariables.admin_api_path+'/setup/add-update-faq', {id: this.state.setup_key, question: this.state.question, answer: this.state.answer, status: this.state.status},{
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => {
              this.props.handleClick("tr", 1, "FAQ Updated Successfully");
              axios.post(globalVariables.admin_api_path+'/setup/search-faq',  {search_f: 'question', model_call: 'Faq'},{
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
              this.setState({
                showModal: true
              })
       
      };        

     
  render() {
    const edit = <Tooltip id="edit">View User Details</Tooltip>;
    
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card title={<span>E-Pin List <Button simple bsStyle="primary" bsSize="xs"  fill
                      onClick={() => this.onOpenModal(-1,-1)}>
                                 <span className="btn-label">
                          <i className="fa fa-plus" />
                        </span>
                        Generate New E-Pin
                            </Button></span>}
                tableFullWidth
                content={
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>E-Pin</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Allocated User</th>
                        <th>Updated Date</th>
                        <th>Expiry Date</th>
                      </tr>
                    </thead>
                    <tbody>
                    { this.state.contentList.map((cotnentSingle, index_key) => (
                      <tr key={index_key}>
                        <td>{index_key+1}</td>
                        <td>{cotnentSingle.epin_id} </td>
                        <td>
                            {(() => {
                                switch(cotnentSingle.status)
                                {
                                    case 1:
                                        return  <Button simple bsStyle="success" bsSize="xs"  fill> Active </Button>;
                                    case 0:
                                        return  <Button simple bsStyle="danger" bsSize="xs"  fill> Expired </Button>;
                                    case 2:
                                        return  <Button simple bsStyle="primary" bsSize="xs"  fill> Used </Button>;
                                }
                            })()}
                        </td>
                        <td>{cotnentSingle.amount}</td>
                        <td> {cotnentSingle.used_by}</td>
                        <td>{cotnentSingle.updated_at}</td>
                        <td>{cotnentSingle.expiry_date}</td>
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
                        <Modal.Title>Update Frequently asked question</Modal.Title>
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

export default Epins;
