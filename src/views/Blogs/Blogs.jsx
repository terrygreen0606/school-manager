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
  import Select from "react-select";
  import Card from "components/Card/Card.jsx";
// react component that creates a switch button that changes from on to off mode
import Switch from "react-bootstrap-switch";
import axios from 'axios';

import Button from "components/CustomButton/CustomButton.jsx";
import img1 from "assets/img/blog-1.jpg";
import img2 from "assets/img/blog-2.jpg";
import img3 from "assets/img/blog-3.jpg";
import img4 from "assets/img/blog-4.jpg";
import img5 from "assets/img/blog-5.jpg";
var globalVariables = require('../../services/globalVariables.jsx');

class Blogs extends Component {

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
        axios.post(globalVariables.admin_api_path+'/blog/search', {model_call: 'Blog', search_f:'title', offset: this.state.ActivePage}, {
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
        axios.post(globalVariables.admin_api_path+'/blog/search', {model_call: 'Blog', search_f:'title'}, {
          headers: { Authorization: "Bearer " + login_token }
        })
          .then(res => res.data).then((data) => {
            console.log(data);
            this.setState({TotalRecords: parseInt(data.total)});
            this.setState({contentList: data.response});
            console.log(this.state.contentList);
          });

         /* axios.post(globalVariables.admin_api_path+'/epin/search-packages', {model_call: 'Epin_package', search_f:'package_name'}, {
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
            */

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
           axios.post(globalVariables.admin_api_path+'/epin/search',  {model_call: 'Epin', search_f:'epin_id'},{
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
    const view = <Tooltip id="view">View Profile</Tooltip>;
    const edit = <Tooltip id="edit">Edit Profile</Tooltip>;
    const remove = <Tooltip id="remove">Remove</Tooltip>;
    const viewPost = <Tooltip id="view">View Post</Tooltip>;
    const editPost = <Tooltip id="edit">Edit Post</Tooltip>;
    const removePost = <Tooltip id="remove">Remove Post</Tooltip>;
    const actions = (
      <td className="td-actions text-right">
        <OverlayTrigger placement="top" overlay={view}>
          <Button simple bsStyle="info" bsSize="xs">
            <i className="fa fa-user" />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={edit}>
          <Button simple bsStyle="success" bsSize="xs">
            <i className="fa fa-edit" />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={remove}>
          <Button simple bsStyle="danger" bsSize="xs">
            <i className="fa fa-times" />
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
            <Col md={12}>
              <Card
                textCenter
                title="Blog List"
                category="All Blog posts (peding/approved) posted by Members and Staff"
                tableFullWidth
                content={
                  <Table responsive className="table-bigboy">
                    <thead>
                      <tr>
                        <th className="text-center">Thumb</th>
                        <th>Blog Title</th>
                        <th className="th-description">Description</th>
                        <th className="text-right">Date</th>
                        <th className="text-right">Status</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                    { this.state.contentList.map((cotnentSingle, index_key) => (
                      <tr key={index_key}>

                        <td>
                          <div className="img-container">
                            <img alt="..." src={img1} />
                          </div>
                        </td>
                        <td className="td-name">
                          {cotnentSingle.title}
                        </td>
                        <td>
                          {cotnentSingle.description}
                        </td>
                        <td className="td-number">{cotnentSingle.created_at}</td>
                        <td className="td-number">
                        {(() => {switch(cotnentSingle.status)
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
                        {actionsPost}
                      </tr>
                    )) }
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Blogs;
