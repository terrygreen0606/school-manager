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
import { ButtonGroup, Pagination, Grid, Row, Col } from "react-bootstrap";
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import '../../assets/css/geneology/tree/main.css';
import '../../assets/css/geneology/tree/custom.css';
import 'tooltipster/dist/css/tooltipster.bundle.css';
import treedefault from "assets/img/tree-default.png";
var globalVariables = require('../../services/globalVariables.jsx');

class Genealogy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            horizontal_limit: 0,
            vertical_limit: 0,
            TreeData: [] ,
            AvailableEPins: 0,
            UsedEpins: 0,
            ExpiredEpins: 0,
            LastMemberRegisterDate: '',
            LastTransactionDate: '',
            WeeklyUserRegistrationSeries: '',
            WeeklyUserRegistrationLevel: '',
            YearlyUserRegistrationSeries: '',
            YearlyUserTransactions: [],
            Teams: []
        };
    }

    componentDidMount() {
        let login_token = sessionStorage.getItem('login_token');
        let id = this.props.match.params.userId;
        axios.post(globalVariables.admin_api_path+'/setup/commission-limit', { setup_type:'commission_limit' }, {
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
                let horizontal_limit = data.response[0].value;
                let TreeData = [];
                for (let i = 1; i <= horizontal_limit; i++) {
                    TreeData[i] = [];
                    TreeData[i]['joining_date'] = "....";
                    TreeData[i]['username'] = "....";
                    TreeData[i]['user_id'] = id;
                    TreeData[i]['full_name'] = "....";
                    TreeData[i]['profile_image_url'] = "";
                    TreeData[i]['sub_user'] = [];
                    for (let j = 1; j <= horizontal_limit; j++) {
                        TreeData[i]['sub_user'][j] = [];
                        TreeData[i]['sub_user'][j]['joining_date'] = "....";
                        TreeData[i]['sub_user'][j]['username'] = "....";
                        TreeData[i]['sub_user'][j]['user_id'] = id;
                        TreeData[i]['sub_user'][j]['full_name'] = "....";
                        TreeData[i]['sub_user'][j]['profile_image_url'] = "";
                      }
                  }
              this.setState({horizontal_limit:data.response[0].value});
              this.setState({vertical_limit:data.response[1].value});
             // console.log(TreeData);
              this.setState({TreeData:TreeData});
            });
           // let id = this.props.match.params.userId;
            axios.post(globalVariables.admin_api_path+'/member/get-tree-data/'+id, {}, {
                headers: { Authorization: "Bearer " + login_token }
              })
                .then(res => res.data).then((data) => {
                   //  console.log(data.response);
                    let RealTreeData = data.response;
                    let RealTreeValue = Object.values(RealTreeData);
                    let RealTreeKeys = Object.keys(RealTreeData);
                   // RealTreeData = Object.values(RealTreeData);
                 //  console.log(RealTreeKeys);
                   let TreeD = this.state.TreeData;
                   let horizontal_limit = this.state.horizontal_limit;
                    for (let i = 0; i < RealTreeKeys.length; i++) {
                        if(RealTreeValue[i])
                        {
                            TreeD[RealTreeKeys[i]].joining_date = RealTreeValue[i].joining_date;
                            TreeD[RealTreeKeys[i]].profile_image_url = RealTreeValue[i].profile_image_url;
                            TreeD[RealTreeKeys[i]].username = RealTreeValue[i].username;
                            TreeD[RealTreeKeys[i]].full_name = RealTreeValue[i].full_name;
                           // console.log(RealTreeValue[i].sub_user);
                           console.log(TreeD);
                            if(RealTreeValue[i].sub_user)
                            {
                               console.log('Hello');
                                for (let j = 1; j <= horizontal_limit; j++) {
                                    console.log(RealTreeValue[i].sub_user[1].joining_date);
                                    if (typeof RealTreeValue[i].sub_user[j] !== "undefined") 
                                    {
                                        TreeD[RealTreeKeys[i]].sub_user[j]['joining_date'] = RealTreeValue[i].sub_user[j].joining_date;
                                        TreeD[RealTreeKeys[i]].sub_user[j]['username'] = RealTreeValue[i].sub_user[j].username;
                                        TreeD[RealTreeKeys[i]].sub_user[j]['user_id'] = RealTreeValue[i].sub_user[j].id;
                                        TreeD[RealTreeKeys[i]].sub_user[j]['full_name'] = RealTreeValue[i].sub_user[j].full_name;
                                        TreeD[RealTreeKeys[i]].sub_user[j]['profile_image_url'] = RealTreeValue[i].sub_user[j].profile_image_url; 
                                    }
                            //         // console.log(RealTreeValue[i]);
                            //         // TreeD[RealTreeKeys[i]].sub_user = ;
                            //        // TreeData[RealTreeKeys[i]]['sub_user'][j] = [];
                            //     //    console.log(TreeD[i].sub_user);
                            //        if( RealTreeValue[i].sub_user[j])
                            //        {
                            //         TreeD[i].sub_user[j]['joining_date'] = RealTreeValue[i].sub_user[j].joining_date;
                            //         TreeD[i].sub_user[j]['username'] = RealTreeValue[i].sub_user[j].username;
                            //         TreeD[i].sub_user[j]['user_id'] = RealTreeValue[i].sub_user[j].id;
                            //         TreeD[i].sub_user[j]['full_name'] = RealTreeValue[i].sub_user[j].full_name;
                            //         TreeD[i].sub_user[j]['profile_image_url'] = RealTreeValue[i].sub_user[j].profile_image_url;
                            //        }
                                }
                            }
                        } 
                    }
                   // console.log(TreeD);
                   // let horizontal_limit = this.state.horizontal_limit;
                  //  let TreeData = this.state.TreeData;
                   // console.log(data.response.length);
                //    for (let i = 1; i <= RealTreeData.length; i++) {
                //     if(RealTreeValue[i])
                //     {
                //         TreeData[RealTreeKeys[i]] = RealTreeValue[i];
                //     } 
                      // TreeD[RealTreeKeys[i]] = RealTreeValue[i];
                   // TreeData[i]['joining_date'] = RealTreeData[i]['joining_date'];
                   // TreeData[i]['username'] = RealTreeData[i]['username'];
                   // TreeData[i]['user_id'] = RealTreeData[i]['id'];
                   // TreeData[i]['full_name'] = RealTreeData[i]['first_name']+' '+RealTreeData[i]['last_name'];
                   // TreeData[i]['profile_image_url'] = RealTreeData[i]['profile_pic'];
                    // for (let j = 1; j <= horizontal_limit; j++) {
                    //     if( TreeData[i][j])
                    //     {
                    //         TreeData[i][j]['joining_date'] = RealTreeData[i][j]['joining_date'];
                    //         TreeData[i][j]['username'] = RealTreeData[i][j]['username'];
                    //         TreeData[i][j]['user_id'] = RealTreeData[i][j]['id'];
                    //         TreeData[i][j]['full_name'] = RealTreeData[i][j]['first_name']+' '+RealTreeData[i][j]['last_name'];
                    //         TreeData[i][j]['profile_image_url'] = RealTreeData[i][j]['profile_pic'];
                    //     }
                    //   }
                //   }
                   /* let i =1;
                    for (var RealTreeD in RealTreeData) {
                        console.log(RealTreeD);
                        TreeData[i]['joining_date'] = RealTreeD.joining_date;
                        TreeData[i]['username'] = RealTreeD.username;
                        TreeData[i]['user_id'] = RealTreeD.id;
                        TreeData[i]['full_name'] = RealTreeD.first_name+' '+RealTreeD.last_name;
                        TreeData[i]['profile_image_url'] = RealTreeD.profile_pic;
                        let j = 1;
                        if(RealTreeD.hasOwnProperty(j)){
                          for (var SubTreeData in RealTreeD[j])
                          {
                            TreeData[i][j]['joining_date'] = SubTreeData.joining_date;
                            TreeData[i][j]['username'] = SubTreeData.username;
                            TreeData[i][j]['user_id'] = SubTreeData.id;
                            TreeData[i][j]['full_name'] = SubTreeData.full_name;
                            TreeData[i][j]['profile_image_url'] = SubTreeData.profile_pic; 
                            j++;
                          }
                        }
                        i++;
                      } */
                  this.setState({TreeData:TreeD});
                });
              //  console.log(this.state.TreeData);
    }   
  render() {
    return (
      <div className="main-content buttons-with-margin">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <div className="card">
                <Row>
                  <Col md={12}>
                  <ReactTooltip effect="float" place="right" multiline="true" data-html="true">
                    <div className="tree_img_tree">
                        <div className="Demo_head_bg">
                            <img
                                src="https://backoffice.infinitemlmsoftware.com/uploads/images/profile_picture/nophoto.jpg"/>
                            <p>binaryaddonecom</p>
                        </div>
                        <div className="body_text_tree">
                            <div className="binary_bg">
                                <p className="text-center">shreeshree</p>
                            </div>
                            <ul className="list-group no-radius">
                                <li className="list-group-item">
                                    <div className="pull-right">:&nbsp;&nbsp;2018/04/11</div>
                                    <div className="pull-left">Join Date</div>
                                </li>
                                <li className="list-group-item">
                                    <div className="pull-right">:&nbsp;&nbsp;2550</div>
                                    <div className="pull-left">Left</div>
                                </li>
                                <li className="list-group-item">
                                    <div className="pull-right">:&nbsp;&nbsp;100</div>
                                    <div className="pull-left">Right</div>
                                </li>
                                <li className="list-group-item">
                                    <div className="pull-right">:&nbsp;&nbsp;2450</div>
                                    <div className="pull-left">Left Carry</div>
                                </li>
                                <li className="list-group-item">
                                    <div className="pull-right">:&nbsp;&nbsp;0</div>
                                    <div className="pull-left">Right Carry</div>
                                </li>
                                <li className="list-group-item">
                                    <div className="pull-right">:&nbsp;&nbsp;1320</div>
                                    <div className="pull-left">Personal PV</div>
                                </li>
                                <li className="list-group-item">
                                    <div className="pull-right">:&nbsp;&nbsp;21670</div>
                                    <div className="pull-left">Group PV</div>
                                </li>
                                <div className="tooltip_rank" style={{background:"#e5e4e2"}}>Platinum</div>
                            </ul>
                        </div>
                    </div>
                    </ReactTooltip>
                      <section className="management-hierarchy">
                        <div className="hv-container">
                            <div className="hv-wrapper">
                                <div className="hv-item">
                                    <div className="hv-item-parent">
                                        <div className="person"  data-tip="React-tooltip">
                                            <img src="https://pbs.twimg.com/profile_images/762654833455366144/QqQhkuK5.jpg"
                                                className="person" alt=""/>
                                            <p className="name">
                                                Ziko Sichi <b>/ CEO</b>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="hv-item-children">
                                    {this.state.TreeData.map((TreeData1, index_key1) => (
                                        <div className="hv-item-child">
                                            <div className="hv-item">

                                                <div className="hv-item-parent"  data-tip="React-tooltip">
                                                    <div className="person">
                                                        <img src={(TreeData1.profile_image_url) ? globalVariables.img_upload_path+TreeData1.profile_image_url : treedefault} alt=""/>
                                                        <p className="name">
                                    {TreeData1.full_name} <b>/ {TreeData1.username}</b>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="hv-item-children">
                                                    {this.state.TreeData[index_key1]['sub_user'].map((TreeData2, index_key2) => (
                                                        <div className="hv-item-child">
                                                            <div className="person">
                                                                <img src={(TreeData2.profile_image_url) ? globalVariables.img_upload_path+TreeData2.profile_image_url : treedefault} alt=""/>
                                                                <p className="name">
                                                                {TreeData2.full_name} <b>/ {TreeData2.username}</b>
                                                                </p>
                                                            </div>
                                                        </div>
                                                     )) }

                                                </div>

                                            </div>
                                        </div>
                                        )) }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Genealogy;
