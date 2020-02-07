/*!
Privileges Settings
Developed by Amit Kumar
*/
import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import Switch from "react-bootstrap-switch";
// react component that creates a switch button that changes from on to off mode
// import Switch from "react-bootstrap-switch";
import axios from 'axios';

import Card from "components/Card/Card.jsx";
import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import SyntaxHighlighter from "react-syntax-highlighter";
import { xcode } from "react-syntax-highlighter/dist/styles/hljs";
var globalVariables = require('../../services/globalVariables.jsx');
class AddUpdatePrivileges extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SetupItems: [],
            selectedItem: null,
            setup_value: '',
            setup_key: '',
            language: '',
            code: '',
            full_url: '',
            BandPrivileges: []
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
            //  console.log(data);
              this.setState({TotalRecords: parseInt(data.total)});
              this.setState({SetupItems: data.response});
            //  console.log(this.state.SetupItems);
            });
        }

        handleAllChecked = (event) => {
          let SetupItems = this.state.SetupItems
       //   console.log(event.target.checked);
          SetupItems.forEach(CheckedItem => CheckedItem['isChecked'] = event.target.checked); 
          SetupItems.forEach(CheckedItem => CheckedItem['requested_count'] = CheckedItem.remain_count);
          this.setState({SetupItems: SetupItems});
        //  console.log(SetupItems);
        }

        handleSingleClick = (event) => {
          let target_var = event.target;
          console.log(target_var);
          console.log(target_var.getAttribute('request_id'));
          let SetupItems = this.state.SetupItems;
          let content_index = event.target.getAttribute('content_index');
          console.log(content_index);
          console.log(SetupItems[content_index]);
          if(event.target.getAttribute('parent_key'))
          {
            let content_child_index = event.target.getAttribute('content_child_index');
            SetupItems[content_index]['children'][content_child_index]['isChecked'] = event.target.checked;
          }
          else
          {
            SetupItems[content_index]['isChecked'] = event.target.checked;
          }
          console.log(SetupItems);
            //contentList[event.target.content_index]['isChecked'] = event.target.checked;
         /* contentList.forEach(CheckedItem => {
             if (CheckedItem['value'] === event.target.value)
             CheckedItem['isChecked'] =  event.target.checked
          }) */
          this.setState({SetupItems: SetupItems})
        }
      
        componentDidMount() {
          let login_token = sessionStorage.getItem('login_token');
          axios.post(globalVariables.admin_api_path+'/band/privileges-api', {model_call: 'Privilege', search_f:'id'}, {
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
              console.log(data.response);
              this.setState({SetupItems: data.response})
            });

          if((this.props.match.params.userId !== '') && (typeof this.props.match.params.userId !== 'undefined'))
          {
            let id = this.props.match.params.userId;
            axios.get(globalVariables.admin_api_path+'/band/band-privileges-api/'+id, {
              headers: { Authorization: "Bearer " + login_token }
            })
              .then(res => res.data).then((data) => {
                 this.setState({BandPrivileges: data.response});
                // console.log(data);
              });
          } 
        }


      handleSubmit = event => {
        event.preventDefault();
        let login_token = sessionStorage.getItem('login_token');
        let AllSetupItems = this.state.SetupItems;
        axios.post(globalVariables.admin_api_path+'/setup/add-new-language', {language: this.state.language, code: this.state.code, flag: this.state.flag},{
          headers: { Authorization: "Bearer " + login_token }
        })
          .then(res => {
            AllSetupItems.push(res.data.response);
            this.setState({SetupItems: AllSetupItems});
            this.setState({language: ''});
            this.setState({flag: ''});
            this.setState({code: ''});
            this.setState({full_url: ''});
            document.getElementById('add_new_language_form').reset();
            this.props.handleClick("tr", 1, "Settings Updated Successfully");
          }).catch(error => {
            this.props.handleClick("tr", 3, error.response.data.msg);
          });
      }

      handleChange = event => {
        this.setState({ [event.target.name] : event.target.value });
      }

      handleSwitch = privilege_id => (event) => {
        let login_token = sessionStorage.getItem('login_token');
       // console.log(event);
        let id = this.props.match.params.userId;
        let status = event.props.value;
        if(status == true)
        {
          status = 0;
        }
        else
        {
          status = 1;
        }
        axios.post(globalVariables.admin_api_path+'/band/update-band-privileges-api', {privilege_id: privilege_id, band_id: id, status:status},{
          headers: { Authorization: "Bearer " + login_token }
        })
          .then(res => {
            axios.get(globalVariables.admin_api_path+'/band/band-privileges-api/'+id, {
              headers: { Authorization: "Bearer " + login_token }
            })
              .then(res => res.data).then((data) => {
                 this.setState({BandPrivileges: data.response});
               //  console.log(data);
              });
            this.props.handleClick("tr", 1, "Band Privileges Updated Successfully");
          }).catch(error => {
            this.props.handleClick("tr", 3, error.response.data.msg);
          });
       // this.setState({ [event.target.name] : event.target.value });
      // console.log(event.target.value);
      // console.log(code);
      }
    
    handleCheck = val => {
      let BandPrivileges = this.state.BandPrivileges;
      let is_allow = 0;
      BandPrivileges.forEach(function(item){
        if(item.privilege_id == val.id)
        {
          is_allow = 1;
        }
      });
     // console.log(is_allow);
      return is_allow;
  }

  UpdatePrivileges = event => {
    event.preventDefault();
    let login_token = sessionStorage.getItem('login_token');
    let id = this.props.match.params.userId;
    axios.post(globalVariables.admin_api_path+'/band/update-privileges-to-band-api', {privileges: this.state.SetupItems, band_id: id},{
      headers: { Authorization: "Bearer " + login_token }
    })
      .then(res => {
        this.props.handleClick("tr", 1, "Privileges Successfully");
      /*  axios.post(globalVariables.admin_api_path+'/epin/requests', {model_call: 'Epin_request', search_f:'amount'},{
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
              data.response.forEach(CheckedItem => CheckedItem['requested_count'] = CheckedItem.remain_count);
              this.setState({SetupItems: data.response});
            //  console.log(this.state.SetupItems);
              this.setState({TotalRecords: parseInt(data.total)});
            }) */
        this.setState({ showModal: false });
       
      }).catch(error => {
        this.props.handleClick("tr", 3, error.response.data.msg);
      });
  }

        
  render() {
    return (
      <div className="main-content">
        <Grid fluid>
        { this.state.SetupItems.map((SetupItem, index_key) => (SetupItem.children) ? (
          <Row key={index_key}>
            <h6 className="title">
            {SetupItem.title}
          </h6>
             {SetupItem.children.map((Setup_child, Setup_child_key) => (
            <Col xs={3} key={'child_'+Setup_child_key}>
              <div className="content text-center">
               <Checkbox label={Setup_child.title} content_index={index_key}  content_child_index={Setup_child_key}  number={Setup_child.id}  checked = {Setup_child.isChecked} parent_key={index_key} name={Setup_child_key} request_id={Setup_child.id}  onClick={this.handleSingleClick}/>
              </div>
            </Col>
            ))}
            </Row>
             ) :
             (<Row><h6 className="title">
            
            <Checkbox  label={SetupItem.title} content_index={index_key}  number={SetupItem.id}  checked = {SetupItem.isChecked} name={index_key} request_id={SetupItem.id}  onClick={this.handleSingleClick}/>
          </h6></Row>)
            )}
          <div  className="text-center">
          <Button simple bsStyle="primary" fill
                onClick={this.UpdatePrivileges}>
                          Update
          </Button>
          </div>
        </Grid>
      </div>
    );
  }
}

export default AddUpdatePrivileges;
