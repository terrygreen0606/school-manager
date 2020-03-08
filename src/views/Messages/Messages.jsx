/*!

=========================================================
* Light Bootstrap Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

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
import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";
import axios from 'axios';
var globalVariables = require('../../services/globalVariables.jsx');
class Messages extends Component {
constructor(props) {
    super(props);
    this.state = {
            InboxCount: 0,
            DraftCount: 0,
            SentCount: 0,
            TrashCount: 0,
            MessageLabel: 'Inbox',
            contentList: [],
            TotalRecords: 0,
            ActivePage: 1,
            showModal: false,
            selectedItem: null,
            message_key: '',
            subject: '',
            message: '',
            status: '',
            from_name: '',
            to_name: '',
            valid_usename: false,
            usernameError: null,
            user_name: '', 
            rendermodal: ''
        };
    }

    componentDidMount() {
        let login_token = sessionStorage.getItem('login_token');
        let user_id = sessionStorage.getItem('user_id');
        axios.post(globalVariables.user_api_path+'/conversations/message-count', {user_id: user_id, status:'Inbox'}, {
          headers: { Authorization: "Bearer " + login_token }
        })
          .then(res => res.data).then((data) => {
            this.setState({InboxCount: data.response});
            console.log(this.state.InboxCount);
          });

        axios.post(globalVariables.user_api_path+'/conversations/message-count', {user_id: user_id, status:'Draft'}, {
        headers: { Authorization: "Bearer " + login_token }
        })
        .then(res => res.data).then((data) => {
            this.setState({DraftCount: data.response});
            console.log(this.state.DraftCount);
        });

        axios.post(globalVariables.user_api_path+'/conversations/message-count', {user_id: user_id, status:'Sent'}, {
            headers: { Authorization: "Bearer " + login_token }
            })
            .then(res => res.data).then((data) => {
                this.setState({SentCount: data.response});
                console.log(this.state.SentCount);
        });

        axios.post(globalVariables.user_api_path+'/conversations/message-count', {user_id: user_id, status:'Trash'}, {
            headers: { Authorization: "Bearer " + login_token }
            })
            .then(res => res.data).then((data) => {
                this.setState({TrashCount: data.response});
                console.log(this.state.TrashCount);
        });

        axios.post(globalVariables.user_api_path+'/conversations/messages-api', {user_id: user_id, status:this.state.MessageLabel}, {
            headers: { Authorization: "Bearer " + login_token }
            })
            .then(res => res.data).then((data) => {
                this.setState({TotalRecords: parseInt(data.total)});
                this.setState({contentList: data.response});
            });
      }

      handleUsername = event => {
        const target = event.target;
        let login_token = sessionStorage.getItem('login_token');
        axios.post(globalVariables.user_api_path+'/check-user-validity', {'username' : target.value}, {
          headers: { Authorization: "Bearer " + login_token }
        })
          .then(res => res.data).then((data) => {
            if(data.response === false)
            {
              this.setState({
                  usernameError: (
                    <small className="text-danger">
                      Please enter a valid username.
                    </small>
                  )
                });
            }
            else{
              this.setState({
                  usernameError: null
                });
                this.setState({valid_usename: true});
                this.setState({username: target.value})
            }
          })
    }

    handleListChange (status, event) {
        let login_token = sessionStorage.getItem('login_token');
        let user_id = sessionStorage.getItem('user_id');
        console.log(status);
        console.log(user_id);
        axios.post(globalVariables.user_api_path+'/conversations/messages-api', {user_id: user_id, status:status}, {
            headers: { Authorization: "Bearer " + login_token }
            })
            .then(res => res.data).then((data) => {
                this.setState({TotalRecords: parseInt(data.total)});
                this.setState({contentList: data.response});
                this.setState({MessageLabel: status});
                console.log(status);
            });
    }

      renderComposeModal = () => {
         // const SetupItem = this.state.SetupItems[this.state.selectedItem];
          //console.log(SetupItem);
          return (
            <Row>
              <Col md={12}>
                    <FormGroup>
                      <ControlLabel>Username</ControlLabel>
                      <FormControl  onChange={this.handleUsername} name="username" type="text" />
                      {this.state.usernameError}
                    </FormGroup>
                  <FormGroup>
                    <ControlLabel>Subject</ControlLabel>
                    <FormControl name="subject"  type="text" onChange={this.handleChange}/>
                    {this.state.subjectError}
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Message</ControlLabel>
                    <FormControl name="message" rows="5" componentClass="textarea"  type="textarea"  onChange={this.handleChange}/>
                    {this.state.MessageError}
                  </FormGroup>
          </Col>
            </Row>
          );
      }

      renderViewModal = () => {
        if (this.state.selectedItem !== null) {
         // const SetupItem = this.state.SetupItems[this.state.selectedItem];
          //console.log(SetupItem);
          return (
            <Row>
              <Col md={12}>
              <Card
                title="Table with Links"
                category="Here is a subtitle for this table"
                tableFullWidth
                content={
                  <Table responsive>
                    <tbody>
                      <tr>
                        <td>From</td>
                <td>{(this.state.MessageLabel === 'Inbox') ? this.state.from_name :  this.state.to_name}</td>
                      </tr>
                      <tr>
                        <td>Subject</td>
                        <td>{this.state.subject}</td>
                      </tr>
                      <tr>
                        <td>Message</td>
                        <td>{this.state.message}</td>
                      </tr>
                    </tbody>
                  </Table>
                }
              />
          </Col>
            </Row>
          );
        }
      }

      onComposeModal = () => {
            this.setState({
              showModal: true,
              rendermodal: 'compose'
            })
    };

    onViewModal = (i, key) => {
        const SetupItem = this.state.contentList[i];

        this.setState({
            showModal: true,
            selectedItem: i,
            message_key: key,
            subject: SetupItem.subject,
            message: SetupItem.message,
            to_name: SetupItem.to_name,
            from_name: SetupItem.from_name,
            rendermodal: 'view'
        });
        
        let login_token = sessionStorage.getItem('login_token');
        axios.post(globalVariables.user_api_path+'/conversations/read-message', {id: key}, {
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
                const SetupItems = this.state.contentList;
                SetupItems[i] = data.response;
              this.setState({contentList: SetupItems});
            });
    };

    handleSubmit = event => {
      event.preventDefault();
      if(this.state.username === null || this.state.valid_usename === false)
      {
          this.setState({
              usernameError: (
                <small className="text-danger">
                  Please enter a valid username.
                </small>
              )
            });
      }
      else if(this.state.subject === null || this.state.subject === '')
      {
          this.setState({
              subjectError: (
                <small className="text-danger">
                  Please enter a valid subject.
                </small>
              )
            });
      }
      else if(this.state.message === null || this.state.message === '')
      {
          this.setState({
              MessageError: (
                <small className="text-danger">
                  Message can not be empty.
                </small>
              )
            });
      }
      else
      {
          let login_token = sessionStorage.getItem('login_token');
          let user_id = sessionStorage.getItem('user_id');
          axios.post(globalVariables.user_api_path+'/conversations/send-message', {user_id: user_id, subject: this.state.subject, message:this.state.message, username: this.state.username},{
          headers: { Authorization: "Bearer " + login_token }
          }).then(res => {
              this.props.handleClick("tr", 1, "Message Send Successfully");
              document.getElementById('compose_form').reset();
              this.setState({ showModal: false })
             }).catch(error => {
          if(error.length)
          {
              this.props.handleClick("tr", 3, error.response.data.msg);
          }
          else
          {
              this.props.handleClick("tr", 3, "Technical Error! Please try again");
          }
          
          });
      }
    }

    MovetoTrash (message_id, event) {
      let login_token = sessionStorage.getItem('login_token');
      let user_id = sessionStorage.getItem('user_id');
      axios.post(globalVariables.user_api_path+'/conversations/move-to-trash', {user_id: user_id, message_id:message_id}, {
          headers: { Authorization: "Bearer " + login_token }
          })
          .then(res => res.data).then((data) => {
              axios.post(globalVariables.user_api_path+'/conversations/messages-api', {user_id: user_id, status:this.state.MessageLabel}, {
                headers: { Authorization: "Bearer " + login_token }
              }).then(res => res.data).then((data) => {
                this.setState({TotalRecords: parseInt(data.total)});
                this.setState({contentList: data.response});
              });
          });
    }

    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
     this.setState({subjectError: null });
     this.setState({MessageError: null });
    }

  render() {
    const view = <Tooltip id="view">Read Message</Tooltip>;
    const edit = <Tooltip id="edit">Edit Profile</Tooltip>;
    const remove = <Tooltip id="remove">Move to Trash</Tooltip>;
    const viewPost = <Tooltip id="view">View Post</Tooltip>;
    const editPost = <Tooltip id="edit">Edit Post</Tooltip>;
    const removePost = <Tooltip id="remove">Remove Post</Tooltip>;
    const actions = (
      <td className="td-actions text-right">
        <OverlayTrigger placement="top" overlay={view}>
          <Button simple bsStyle="info" bsSize="xs">
            <i className="fa fa-eye" />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={remove}>
          <Button simple bsStyle="danger" bsSize="xs">
            <i className="fa fa-trash" />
          </Button>
        </OverlayTrigger>
      </td>
    );
    const actionsPost = (
      <td className="td-actions">
        <OverlayTrigger placement="left" overlay={viewPost}>
          <Button simple icon bsStyle="info">
            <i className="fa fa-image" />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="left" overlay={editPost}>
          <Button simple icon bsStyle="success">
            <i className="fa fa-edit" />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="left" overlay={removePost}>
          <Button simple icon bsStyle="danger">
            <i className="fa fa-times" />
          </Button>
        </OverlayTrigger>
      </td>
    );
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={2}>
              <Card
                title={<span><Button simple bsStyle='primary' bsSize='small'  fill round
                onClick={() => this.onComposeModal()}> 
                  <span className="btn-label">
                    <i className="fa fa-plus" />
                  </span>
                           &nbsp; Compose
                      </Button> </span>}
                tableFullWidth
                content={
                  <Table responsive>
                    <tbody>
                      <tr  className={(this.state.MessageLabel === 'Inbox') ? 'info' : ''}>
                        <td className="text-left"><strong><a href="#/admin/messages" onClick={(e) => this.handleListChange('Inbox', e)}>Inbox ({this.state.InboxCount})</a></strong></td>
                      </tr>
                      <tr  className={(this.state.MessageLabel === 'Draft') ? 'info' : ''}>
                        <td className="text-left"><strong><a href="#/admin/messages" onClick={(e) => this.handleListChange('Draft', e) }>Draft ({this.state.DraftCount})</a></strong></td>
                      </tr>
                      <tr  className={(this.state.MessageLabel === 'Sent') ? 'info' : ''}>
                        <td className="text-left"><strong><a href="#/admin/messages"  onClick={(e) => this.handleListChange('Sent', e) }>Sent ({this.state.SentCount})</a></strong></td>
                      </tr>
                      <tr  className={(this.state.MessageLabel === 'Trash') ? 'info' : ''}>
                        <td className="text-left"><strong><a href="#/admin/messages"  onClick={(e) => this.handleListChange('Trash', e)}>Trash ({this.state.TrashCount})</a></strong></td>
                      </tr>
                    </tbody>
                  </Table>
                }
              />
            </Col>
            <Col md={10}>
              <Card
              title={this.state.MessageLabel+' ('+((this.state.MessageLabel === 'Inbox') ? this.state.InboxCount : ((this.state.MessageLabel == 'Draft') ? this.state.DraftCount : ((this.state.MessageLabel == 'Sent') ? this.state.SentCount : ((this.state.MessageLabel == 'Trash') ? this.state.TrashCount : 0))))+')'}
                tableFullWidth
                content={
                  <Table striped responsive>
                    <thead>
                      <tr>
                          <th>#</th>
                        <th>Message From</th>
                        <th>Subject</th>
                        <th>Date/Time</th>
                        <th className="">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    { this.state.contentList.map((cotnentSingle, index_key) => (
                      <tr key={index_key} className={(cotnentSingle.read === 0 && this.state.MessageLabel == 'Inbox') ? 'info' : ''}>
                        <td>{(this.state.ActivePage-1)*10+index_key+1}</td>
                        <td>{(this.state.MessageLabel === 'Inbox') ? cotnentSingle.from_name : cotnentSingle.to_name} </td>
                        <td>{cotnentSingle.subject} </td>
                        <td>{cotnentSingle.created_at} </td>
                        <td className="td-actions text-right">
                                <OverlayTrigger placement="top" overlay={view}>
                                <Button simple bsStyle="info" bsSize="xs"  onClick={() => this.onViewModal(index_key, cotnentSingle.id)}>
                                    <i className="fa fa-eye" />
                                </Button>
                                </OverlayTrigger>
                                {
                                  (this.state.MessageLabel != 'Trash') ? <OverlayTrigger placement="top" overlay={remove}>
                                  <Button simple bsStyle="danger" bsSize="xs" onClick={(e) => this.MovetoTrash(cotnentSingle.id, e) }>
                                      <i className="fa fa-trash" />
                                  </Button>
                                  </OverlayTrigger>
                                  : ''
                                }
                                
                        </td>
                      </tr>
                    )) }
                    </tbody>
                  </Table>
                }
              />
            </Col>
            <Modal show={this.state.showModal}
                onHide={() => this.setState({ showModal: false })}>
                <form onSubmit={this.handleSubmit} id="compose_form">
                <Modal.Header closeButton>
                <Modal.Title>{(this.state.rendermodal === 'compose') ? 'Compose Message' : 'Message Details'} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {(this.state.rendermodal === 'compose') ? this.renderComposeModal() : this.renderViewModal()}
                </Modal.Body>
                <Modal.Footer>
                <Button bsStyle="danger"
                    simple
                    onClick={() => this.setState({ showModal: false })} fill
                >
                    Close
                </Button>
                {(this.state.rendermodal === 'compose') ? <Button type="submit"
                    bsStyle="success"
                    fill
                    /* onClick={() => this.setState({ showModal: false })} */
                >
                    Send
                </Button> : ''}
                </Modal.Footer>
                </form>
            </Modal>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Messages;
