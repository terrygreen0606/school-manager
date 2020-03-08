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
var globalVariables = require('../../services/globalVariables.jsx');
class PayoutData extends Component {
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
        //this.handleClick = this.handleClick.bind(this);
        }

      
        componentDidMount() {
          let login_token = sessionStorage.getItem('login_token');
          let id = this.props.match.params.payoutID;
          axios.post(globalVariables.admin_api_path+'/payout/list',  {model_call: 'Payout_data', search_f:'payout_id', search_text:id}, {
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
              console.log(data);
              this.setState({TotalRecords: parseInt(data.total)});
              this.setState({contentList: data.response});
              console.log(this.state.contentList);
            });

        }

       

     
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
              <Card title={<span>Payout Datas </span>}
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
          </Row>
        </Grid>
      </div>
    );
  }
}

export default PayoutData;
