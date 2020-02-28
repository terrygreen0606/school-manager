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
var globalVariables = require('../../../services/globalVariables.jsx');
class TicketReply extends Component {
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
            Teams: [],
            reply: '',
            ticket_title: '',
            ticket_description: ''
        };
        }
      
        componentDidMount() {
          let login_token = sessionStorage.getItem('login_token');
          let user_id = sessionStorage.getItem('user_id');
         // let user_id = sessionStorage.getItem('user_id');
         let ticketID = this.props.match.params.ticketID;
         axios.post(globalVariables.user_api_path+'/support-system/ticket-search',  {model_call: 'Ticket', search_f: 'id', search_text: ticketID},{
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
                if(data.response[0])
                {
                    this.setState({ticket_title: data.response[0].ticket, ticket_description: data.response[0].description})
                }
            //   this.setState({: })
            });
          axios.post(globalVariables.user_api_path+'/support-system/reply-search',  {model_call: 'Ticket_reply', search_f: 'reply', ticket_id: ticketID},{
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
              this.setState({SetupItems: data.response})
            });
        }


      handleSubmit = event => {
        event.preventDefault();
        let login_token = sessionStorage.getItem('login_token');
        let user_id = sessionStorage.getItem('user_id');
        let AllSetupItems = this.state.SetupItems;
        let ticketID = this.props.match.params.ticketID;
        console.log(this.state.description);
        axios.post(globalVariables.user_api_path+'/support-system/update-reply', {model_call: 'Ticket_reply', fillable_value:'id', fieldset:'id,ticket_id,user_id,reply,', required_fields:'ticket_id,user_id,reply', id: this.state.setup_key, ticket_id: ticketID, reply:this.state.reply,user_id:user_id},{
          headers: { Authorization: "Bearer " + login_token }
        })
          .then(res => {
            document.getElementById('reply_form').reset();
            this.props.handleClick("tr", 1, "Ticket Updated Successfully");
            axios.post(globalVariables.user_api_path+'/support-system/reply-search',  {model_call: 'Ticket_reply', search_f: 'reply', ticket_id: ticketID},{
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
        
  render() {
    const edit = <Tooltip id="edit">Add a reply</Tooltip>;
    
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card title={this.state.ticket_title} category={this.state.ticket_description}
                tableFullWidth
                content={
                    <div>   
                  <Table responsive>
                    <tbody>
                    {this.state.SetupItems.map((SetupItem, index_key) => (
                      <tr key={index_key}>
                    <td width="150px">
                    <div className="user">
                        <div className="photo text-center">
                    <img className="img-circle" height="70px" width="70px" src={(SetupItem.profile_pic !== null) && (SetupItem.profile_pic !== 'null') && (SetupItem.profile_pic !== '' ) ? globalVariables.img_upload_path+SetupItem.profile_pic : ''} alt={SetupItem.first_name} /><br/><span className="text-center"><strong>{SetupItem.first_name}{' '}{SetupItem.last_name}</strong></span>
                    </div></div>
                    </td>
                    <td>{SetupItem.reply}</td>
                      </tr>
                    )) }
                    </tbody>
                  </Table>
                  </div>
                }
              />
            </Col>
            <Col md={12}>
            <form onSubmit={this.handleSubmit} id="reply_form">
                <FormGroup>
                <ControlLabel>Add Your Reply</ControlLabel>
                <FormControl
                        name="reply"
                        rows="5"
                        componentClass="textarea"
                        bsClass="form-control"
                        placeholder="Reply"
                        onChange={this.handleChange}
                        />
                </FormGroup>

                <Button type="submit"
                        bsStyle="success"
                        fill
                        /* onClick={() => this.setState({ showModal: false })} */
                    >
                        Send
                    </Button>
                </form>
                    </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TicketReply;
