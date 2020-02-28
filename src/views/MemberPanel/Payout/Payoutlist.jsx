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
  FormControl,
  Pagination
  
} from "react-bootstrap";
// react component that creates a switch button that changes from on to off mode
// import Switch from "react-bootstrap-switch";
import Datetime from "react-datetime";
import axios from 'axios';
import Select from "react-select";
import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";
var globalVariables = require('../../../services/globalVariables.jsx');
class PayoutList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            contentList: [],
            selectedItem: null,
            setup_value: '',
            setup_key: '',
            no_of_epin: '',
            amount: '',
            expiry_date: '',
            packageList: '',
            TotalRecords: 0,
            ActivePage: 1
        };
        this.handleClick = this.handleClick.bind(this);
        }

        handleClick(event) {
          this.setState({
            ActivePage: Number(event.target.id)
          });

          let login_token = sessionStorage.getItem('login_token');
          axios.post(globalVariables.user_api_path+'/member/list', {offset: this.state.ActivePage}, {
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
              console.log(data);
              this.setState({TotalRecords: parseInt(data.total)});
              this.setState({contentList: data.response});
              console.log(this.state.contentList);
            });
        }
      
        componentDidMount() {
          let login_token = sessionStorage.getItem('login_token');
          let user_id = sessionStorage.getItem('user_id');
          axios.post(globalVariables.user_api_path+'/payout/list',  {model_call: 'Payout_data', search_f:'id', user_id: user_id}, {
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
              console.log(data);
              this.setState({TotalRecords: parseInt(data.total)});
              this.setState({contentList: data.response});
              console.log(this.state.contentList);
            });

        }

        handleDateChange = date => {
          this.setState({
            expiry_date: date
          });
        }

        renderModal = () => {
           // const SetupItem = this.state.SetupItems[this.state.selectedItem];
            //console.log(SetupItem);
            return (
              <Row>
                <Col md={12}>
                    <FormGroup>
                      <ControlLabel>No of E-Pin</ControlLabel>
                      <FormControl name="no_of_epin"  type="text" defaultValue={this.state.no_of_epin} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Amount</ControlLabel>
                      <Select
                            name="amount"  onChange={value => this.setState({ amount: value, transactionTypeError: null })}
                            options={this.state.packageList} 
                        />
                        {this.state.transactionTypeError}
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Expiry Date</ControlLabel>
                      <Datetime name="expiry_date"
                        timeFormat={false}
                        inputProps={{ placeholder: "Expiry Date" }}
                        defaultValue={this.state.expiry_date}  onChange={this.handleDateChange}
                      />
                    </FormGroup>    
                </Col>
              </Row>
            );
        }

        handleSubmit = event => {
          event.preventDefault();
          let login_token = sessionStorage.getItem('login_token');
          let AllSetupItems = this.state.SetupItems;
          axios.post(globalVariables.admin_api_path+'/epin/generate', {no_of_epin: this.state.no_of_epin, amount: this.state.amount, expiry_date: this.state.expiry_date},{
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => {
              this.props.handleClick("tr", 1, "Epin Generated Successfully");
              axios.post(globalVariables.admin_api_path+'/member/list',{
                  headers: { Authorization: "Bearer " + login_token }
                })
                  .then(res => res.data).then((data) => {
                    this.setState({contentList: data.response});
                    this.setState({TotalRecords: parseInt(data.total)});
                  })
              this.setState({ showModal: false });
             
            }).catch(error => {
              this.props.handleClick("tr", 3, error.response.data.msg);
            });
        }
  
        handleChange = event => {
          console.log(event.target);
          this.setState({ [event.target.name]: event.target.value });
          console.log(event.target.value);
        }
  
      onOpenModal = (i, key) => {
              this.setState({
                showModal: true
              })
       
      };        

     
  render() {
    const view_payout = <Tooltip id="view">View Payout Date</Tooltip>;
    const pageNumbers = [];
    console.log(this.state.TotalRecords);
    let activePage = this.state.ActivePage;
    let TotalPaginationNumber = 10;
    let PaginationStartNumber = 1;
    let TotalPagesAvailable = Math.ceil(this.state.TotalRecords / 10);
    switch(activePage)
    {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        if(TotalPagesAvailable < 10)
        {
          TotalPaginationNumber = TotalPagesAvailable;
        }
        else
        {
          TotalPaginationNumber = 10;
        }
        PaginationStartNumber = 1;
        break;
      default:
        TotalPaginationNumber = activePage+5;
        PaginationStartNumber = activePage-4;
        if(TotalPaginationNumber > Math.ceil(this.state.TotalRecords / 10))
        {
          TotalPaginationNumber = Math.ceil(this.state.TotalRecords / 10);
        }
    }
    if(TotalPagesAvailable > 1 )
    {
      for (let i = PaginationStartNumber; i <= TotalPaginationNumber; i++) {
        pageNumbers.push(i);
      }
    }
    
    console.log(this.state.TotalRecords);

    const renderPageNumbers = pageNumbers.map(number => {
      
        if(number == this.state.ActivePage)
        {
          return (<Pagination.Item key={number} 
          id={number}
          onClick={this.handleClick} active>{number}</Pagination.Item>
          );
        }
        else
        {
          return (<Pagination.Item key={number} 
            id={number}
            onClick={this.handleClick}>{number}</Pagination.Item>
            );
        }
       
    });
    
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card title={<span>List of All Payouts </span>}
                tableFullWidth
                content={
                  <div>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Payout</th>
                        <th>Generate Date/Time</th>
                        <th>Status</th>
                        <th>Payout Date</th>
                        <th>Amount</th>
                        {/* <th>Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                    { this.state.contentList.map((cotnentSingle, index_key) => (
                      <tr key={index_key}>
                        <td>{(this.state.ActivePage-1)*10+index_key+1}</td>
                        <td>{cotnentSingle.title} </td>
                        <td>{cotnentSingle.created_at}</td>
                       { <td>
                            {(() => {
                                switch(cotnentSingle.status)
                                {
                                    case 1:
                                        return  <Button simple bsStyle="success" bsSize="xs"  fill> Paid </Button>;
                                    case 0:
                                        return  <Button simple bsStyle="warning" bsSize="xs"  fill> Pending </Button>;
                                }
                            })()}
                        </td>
                          }
                        <td>{cotnentSingle.payout_date}</td>
                        <td>{cotnentSingle.amount}</td>
                        {/* <td className="td-actions">
                            <OverlayTrigger placement="top" overlay={view_payout}>
                            <Button simple bsStyle="primary" bsSize="xs"  fill
                      onClick={() => this.onOpenModal()}>
                                <i className="fa fa-eye" />
                            </Button>
                            </OverlayTrigger>

                          { /*
                              &nbsp;&nbsp;
                              <OverlayTrigger placement="top" overlay={(cotnentSingle.status == 0) ? block_user : unblock_user}>
                              <Button simple bsStyle="warning" bsSize="xs"  fill
                        onClick={() => this.onOpenModal()}>
                                  {(cotnentSingle.status == 0) ? <i className="fa fa-check" /> : <i className="fa fa-ban" />}
                              </Button>
                              </OverlayTrigger>
  
                            

                            
                        </td> */ }
                      </tr>
                    )) }
                    </tbody>
                  </Table>
                  <div className="text-center">
                    <Pagination>
                      {renderPageNumbers}
                    </Pagination>
                  </div>
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
                        <Modal.Title>Generate E-Pin</Modal.Title>
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
                          Proceed
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

export default PayoutList;
