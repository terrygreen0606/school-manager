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
                for (let i = 1; i < horizontal_limit; i++) {
                    TreeData[i] = [];
                    TreeData[i]['joining_date'] = "....";
                    TreeData[i]['username'] = "....";
                    TreeData[i]['user_id'] = id;
                    TreeData[i]['full_name'] = "....";
                    TreeData[i]['profile_image_url'] = "https://pbs.twimg.com/profile_images/762654833455366144/QqQhkuK5.jpg";
                    for (let j = 1; j < horizontal_limit; j++) {
                        TreeData[i][j] = [];
                        TreeData[i][j]['joining_date'] = "....";
                        TreeData[i][j]['username'] = "....";
                        TreeData[i][j]['user_id'] = id;
                        TreeData[i][j]['full_name'] = "....";
                        TreeData[i][j]['profile_image_url'] = "https://pbs.twimg.com/profile_images/762654833455366144/QqQhkuK5.jpg";
                      }
                  }
              this.setState({horizontal_limit:data.response[0].value});
              this.setState({vertical_limit:data.response[1].value});
              this.setState({TreeData:TreeData});
            });

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
                                        {}
                                        <div className="hv-item-child">
                                            <div className="hv-item">

                                                <div className="hv-item-parent"  data-tip="React-tooltip">
                                                    <div className="person">
                                                        <img src="https://randomuser.me/api/portraits/women/50.jpg" alt=""/>
                                                        <p className="name">
                                                            Annie Wilner <b>/ Creative Director</b>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="hv-item-children">

                                                    <div className="hv-item-child">
                                                        <div className="person">
                                                            <img src="https://randomuser.me/api/portraits/women/68.jpg" alt=""/>
                                                            <p className="name">
                                                                Anne Potts <b>/ UI Designer</b>
                                                            </p>
                                                        </div>
                                                    </div>


                                                    <div className="hv-item-child">
                                                        <div className="person">
                                                            <img src="https://randomuser.me/api/portraits/men/81.jpg" alt=""/>
                                                            <p className="name">
                                                                Dan Butler <b>/ UI Designer</b>
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="hv-item-child">
                                                        <div className="person">
                                                            <img src="https://randomuser.me/api/portraits/women/18.jpg" alt=""/>
                                                            <p className="name">
                                                                Mary Bower <b>/ UX Designer</b>
                                                            </p>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>


                                        <div className="hv-item-child">
                                            <div className="hv-item">

                                                <div className="hv-item-parent">
                                                    <div className="person">
                                                        <img src="https://randomuser.me/api/portraits/men/3.jpg" alt=""/>
                                                        <p className="name">
                                                            Gordon Clark <b>/ Senior Developer</b>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="hv-item-children">

                                                    <div className="hv-item-child">
                                                        <div className="person">
                                                            <img src="https://randomuser.me/api/portraits/men/41.jpg" alt=""/>
                                                            <p className="name">
                                                                Harry Bell <b>/ Front-end</b>
                                                            </p>
                                                        </div>
                                                    </div>


                                                    <div className="hv-item-child">
                                                        <div className="person">
                                                            <img src="https://randomuser.me/api/portraits/men/90.jpg" alt=""/>
                                                            <p className="name">
                                                                Matt Davies <b>/ Back-end</b>
                                                            </p>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>

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
