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
import ReactTooltip from 'react-tooltip'
import '../../../assets/css/geneology/tree/main.css';
import '../../../assets/css/geneology/tree/custom.css';
import 'tooltipster/dist/css/tooltipster.bundle.css';

class Genealogy extends Component {
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
