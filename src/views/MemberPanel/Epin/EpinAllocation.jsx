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
import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
var globalVariables = require('../../../services/globalVariables.jsx');
class EpinAllocation extends Component {
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
            packageList: [],
            TotalRecords: 0,
            ActivePage: 1
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        }

        handleAllChecked = (event) => {
          let contentList = this.state.contentList
          console.log(event.target.checked);
          contentList.forEach(CheckedItem => CheckedItem['isChecked'] = event.target.checked); 
          contentList.forEach(CheckedItem => CheckedItem['requested_count'] = CheckedItem.remain_count);
          this.setState({contentList: contentList});
          console.log(contentList);
        }
      
        handleCheckChieldElement = (event) => {
          let contentList = this.state.contentList
          contentList.forEach(CheckedItem => {
             if (CheckedItem.value === event.target.value)
             CheckedItem['isChecked'] =  event.target.checked
          })
          this.setState({contentList: contentList})
        }

        handleSingleClick = (event) => {
          let contentList = this.state.contentList;
          let content_index = event.target.content_index;
          console.log(event.target.name);
          console.log(contentList);
          contentList[event.target.name]['isChecked'] = event.target.checked;
            //contentList[event.target.content_index]['isChecked'] = event.target.checked;
         /* contentList.forEach(CheckedItem => {
             if (CheckedItem['value'] === event.target.value)
             CheckedItem['isChecked'] =  event.target.checked
          }) */
          this.setState({contentList: contentList})
        }


        handleClick(event) {
          this.setState({
            ActivePage: Number(event.target.id)
          });

          let login_token = sessionStorage.getItem('login_token');
          axios.post(globalVariables.admin_api_path+'/epin/requests', {model_call: 'Epin_request', search_f:'amount', offset: (event.target.id-1)*10}, {
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
          axios.post(globalVariables.admin_api_path+'/epin/requests', {model_call: 'Epin_request', search_f:'amount'}, {
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
              console.log(data);
              this.setState({TotalRecords: parseInt(data.total)});
              data.response.forEach(CheckedItem => CheckedItem['requested_count'] = CheckedItem.remain_count);
              this.setState({contentList: data.response});
              console.log(this.state.contentList);
              axios.post(globalVariables.admin_api_path+'/epin/search-packages', {model_call: 'Epin_package', search_f:'package_name'}, {
                headers: { Authorization: "Bearer " + login_token }
              })
                .then(res => res.data).then((data) => {
                  let packageList = [];
                  let response = data.response;
                  for(let i=0; i< response.length; i++)
                  {
                    packageList.push({'label' : response[i].package_name, 'value': response[i].id});
                  }
                  //const packageList = data.map(mappingFunction);
                  console.log(packageList);
                  this.setState({packageList: packageList});
                  console.log(this.state.packageList);
                });
            });
        }

        handleDateChange = date => {
          this.setState({
            expiry_date: date
          });
        }

       
        

        AllocatePin = event => {
          event.preventDefault();
          let login_token = sessionStorage.getItem('login_token');
          let AllSetupItems = this.state.SetupItems;
          axios.post(globalVariables.admin_api_path+'/epin/allocate', {request_data: this.state.contentList},{
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => {
              this.props.handleClick("tr", 1, "Epin Allocated Successfully");
              axios.post(globalVariables.admin_api_path+'/epin/requests', {model_call: 'Epin_request', search_f:'amount'},{
                  headers: { Authorization: "Bearer " + login_token }
                })
                  .then(res => res.data).then((data) => {
                    data.response.forEach(CheckedItem => CheckedItem['requested_count'] = CheckedItem.remain_count);
                    this.setState({contentList: data.response});
                    console.log(this.state.contentList);
                    this.setState({TotalRecords: parseInt(data.total)});
                  })
              this.setState({ showModal: false });
             
            }).catch(error => {
              this.props.handleClick("tr", 3, error.response.data.msg);
            });
        }

        DeletePinRequest = event => {
          event.preventDefault();
          let login_token = sessionStorage.getItem('login_token');
          axios.post(globalVariables.admin_api_path+'/epin/delete-pin-request', {request_data: this.state.contentList},{
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => {
              this.props.handleClick("tr", 1, "Request Deleted Successfully");
              axios.post(globalVariables.admin_api_path+'/epin/requests', {model_call: 'Epin_request', search_f:'amount'},{
                  headers: { Authorization: "Bearer " + login_token }
                })
                  .then(res => res.data).then((data) => {
                    data.response.forEach(CheckedItem => CheckedItem['requested_count'] = CheckedItem.remain_count);
                    this.setState({contentList: data.response});
                    console.log(this.state.contentList);
                    this.setState({TotalRecords: parseInt(data.total)});
                  })
              this.setState({ showModal: false });
             
            }).catch(error => {
              this.props.handleClick("tr", 3, error.response.data.msg);
            });
        }
  
        handleChange = event => {
          console.log(event.target);
          const contentList = this.state.contentList;
          console.log(contentList[event.target.name]);
          contentList[event.target.name]['requested_count'] = event.target.value;
          this.setState({ contentList: contentList });
          console.log(contentList);
        }
  
      onOpenModal = (i, key) => {
              this.setState({
                showModal: true
              })
       
      };        

     
  render() {
    const edit = <Tooltip id="edit">View User Details</Tooltip>;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.TotalRecords / 10); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
        if(pageNumbers.length == 1)
        {
          return;
        }
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

  /*  handleUsername = event => {
      const target = event.target;
      console.log(target.name);
      let login_token = sessionStorage.getItem('login_token');
      axios.post(globalVariables.admin_api_path+'/check-user-validity', {'username' : target.value}, {
        headers: { Authorization: "Bearer " + login_token }
      })
        .then(res => res.data).then((data) => {
          if(target.name == 'username'){
            if(data.response === true)
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
          }
          else{
            if(data.response === true)
            {
              this.setState({
                  transfer_to_usernameError: (
                    <small className="text-danger">
                      Please enter a valid username.
                    </small>
                  )
                });
            }
            else{
              this.setState({
                transfer_to_usernameError: null
                });
                this.setState({valid_receiver_usename: true});
                this.setState({transfer_to_username: target.value})
            }
          }
        })
  }
  */
    
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card title={"E-Pin Allocation"}
                
                content={
                  <div>
                    <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <ControlLabel>Username</ControlLabel>
                      <FormControl name="user_id"  type="text" defaultValue={this.state.user_id} />
                      {this.state.usernameError}
                    </FormGroup>
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
                    <Button type="submit"
                          bsStyle="success"
                          fill
                         /* onClick={() => this.setState({ showModal: false })} */
                        >
                          Proceed
                        </Button>
                    </form>
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

export default EpinAllocation;
