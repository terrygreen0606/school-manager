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
import { Grid, Col, Row } from "react-bootstrap";
// react component used to create charts
import ChartistGraph from "react-chartist";

import Card from "components/Card/Card.jsx";
import StatsCard from "components/Card/StatsCard.jsx";
import axios from 'axios';
import {Link} from "react-router-dom";

var globalVariables = require('../services/globalVariables.jsx');

// Data for Bar Chart
var dataBar = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  series: [
    [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
    [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
  ]
};
var optionsBar = {
  seriesBarDistance: 10,
  axisX: {
    showGrid: false
  },
  height: "245px"
};
var responsiveBar = [
  [
    "screen and (max-width: 640px)",
    {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function(value) {
          return value[0];
        }
      }
    }
  ]
];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        TotalMembers: 0,
        TotalStaff: 0,
        PendingTickets: 0,
        PendingPayouts: 0,
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
  // createTableData() {
  //   var tableRows = [];
  //   for (var i = 0; i < table_data.length; i++) {
  //     tableRows.push(
  //       <tr key={i}>
  //         <td>
  //           <div className="flag">
  //             <img src={table_data[i].flag} alt="us_flag" />
  //           </div>
  //         </td>
  //         <td>{table_data[i].country}</td>
  //         <td className="text-right">{table_data[i].count}</td>
  //         <td className="text-right">{table_data[i].percentage}</td>
  //       </tr>
  //     );
  //   }
  //   return tableRows;
  // }

  componentDidMount() {
    let login_token = sessionStorage.getItem('login_token');
    axios.post(globalVariables.admin_api_path+'/member/total-members',  {status: 1},{
        headers: { Authorization: "Bearer " + login_token }
      })
        .then(res => res.data).then((data) => {
          this.setState({TotalMembers : data.response})
        });  
        
        axios.post(globalVariables.admin_api_path+'/staff/total-staff',  {status: 1},{
          headers: { Authorization: "Bearer " + login_token }
        })
          .then(res => res.data).then((data) => {
            this.setState({TotalStaff : data.response})
          });

          axios.post(globalVariables.admin_api_path+'/support-system/pending-ticket-count',  {model_call: 'Ticket', search_f:'status', search_text:'0'},{
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
              console.log(data.response);
              this.setState({PendingTickets : data.response})
            });

            axios.post(globalVariables.admin_api_path+'/payout/pending-payout-count',  {model_call: 'Payout', search_f:'status', search_text:'0'},{
              headers: { Authorization: "Bearer " + login_token }
            })
              .then(res => res.data).then((data) => {
                console.log(data.response);
                this.setState({PendingPayouts : data.response})
              });
              axios.post(globalVariables.admin_api_path+'/epin/inactive-epin-count',  {model_call: 'Epin', search_f:'status', search_text:'2'},{
                headers: { Authorization: "Bearer " + login_token }
              })
                .then(res => res.data).then((data) => {
                  console.log(data.response);
                  this.setState({UsedEpins : parseInt(data.response)})
                });
                axios.post(globalVariables.admin_api_path+'/epin/inactive-epin-count',  {model_call: 'Epin', search_f:'status', search_text:'0'},{
                  headers: { Authorization: "Bearer " + login_token }
                })
                  .then(res => res.data).then((data) => {
                    console.log(data.response);
                    this.setState({ExpiredEpins : parseInt(data.response)})
                  });
                axios.post(globalVariables.admin_api_path+'/epin/available-epin',  {model_call: 'Epin', search_f:'status', search_text:'1'},{
                  headers: { Authorization: "Bearer " + login_token }
                })
                  .then(res => res.data).then((data) => {
                    console.log(data.response);
                    this.setState({AvailableEPins : parseInt(data.response)})
                  });
                  axios.post(globalVariables.admin_api_path+'/member/this-week-registration',  {},{
                    headers: { Authorization: "Bearer " + login_token }
                  })
                    .then(res => res.data).then((data) => {
                       this.setState({WeeklyUserRegistrationLevel : data.response.labels});
                       this.setState({WeeklyUserRegistrationSeries : [data.response.series]});
                    });

                    axios.post(globalVariables.admin_api_path+'/member/this-year-registration',  {},{
                      headers: { Authorization: "Bearer " + login_token }
                    })
                      .then(res => res.data).then((data) => {
                        // this.setState({WeeklyUserRegistrationLevel : data.response.labels});
                         this.setState({YearlyUserRegistrationSeries : [data.response.series]});
                      });

                      axios.post(globalVariables.admin_api_path+'/ewallet/this-year-transaction-graph',  {},{
                        headers: { Authorization: "Bearer " + login_token }
                      })
                        .then(res => res.data).then((data) => {
                          // this.setState({WeeklyUserRegistrationLevel : data.response.labels});
                           this.setState({YearlyUserTransactions : [data.response.credit, data.response.debit]});
                        });
}

  render() {
    return (
      <div className="main-content">
        
        <style dangerouslySetInnerHTML={{__html: `
      .ct-series-a .ct-slice-pie, .ct-series-a .ct-area {
        fill: #87cb16 !important; }
        .ct-series-b .ct-slice-pie, .ct-series-b .ct-area {
          fill: #ffa534 !important; }
          .ct-series-c .ct-slice-pie, .ct-series-c .ct-area {
            fill: #fb404b !important; }
    `}} />
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
            <Link to={{pathname: `list-members`}}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-warning" />}
                statsText="Active Member"
                statsValue={this.state.TotalMembers}
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText={"Last Registered at "+ this.state.LastMemberRegisterDate}
              />
              </Link>
            </Col>
            <Col lg={3} sm={6}>
            <Link to={{pathname: `staff-members`}}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-success" />}
                statsText="Active Staff"
                statsValue={this.state.TotalStaff}
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Updated Just Now"
              />
              </Link>
            </Col>
            <Col lg={3} sm={6}>
            <Link to={{pathname: `open-tickets`}}>
              <StatsCard
                bigIcon={<i className="pe-7s-ticket text-danger" />}
                statsText="Pending Ticket"
                statsValue={this.state.PendingTickets}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated Just Now"
              />
              </Link>
            </Col>
            <Col lg={3} sm={6}>
            <Link to={{pathname: `payout`}}>
              <StatsCard
                bigIcon={<i className="fa fa-money text-info" />}
                statsText="Pending Payout"
                statsValue={this.state.PendingPayouts}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
              </Link>
            </Col>
          </Row>
          {/* <Row>
            <Col md={12}>
              <Card
                title="Global Sales by Top Locations"
                category="All products that were shipped"
                content={
                  <Row>
                    <Col md={5}>
                      <div className="table-responsive">
                        <table className="table">
                          <tbody>{this.createTableData()}</tbody>
                        </table>
                      </div>
                    </Col>
                    <Col md={6} mdOffset={1}>
                      <VectorMap
                        map={"world_mill"}
                        backgroundColor="transparent"
                        zoomOnScroll={false}
                        containerStyle={{
                          width: "100%",
                          height: "280px"
                        }}
                        containerClassName="map"
                        regionStyle={{
                          initial: {
                            fill: "#e4e4e4",
                            "fill-opacity": 0.9,
                            stroke: "none",
                            "stroke-width": 0,
                            "stroke-opacity": 0
                          }
                        }}
                        series={{
                          regions: [
                            {
                              values: mapData,
                              scale: ["#AAAAAA", "#444444"],
                              normalizeFunction: "polynomial"
                            }
                          ]
                        }}
                      />
                    </Col>
                  </Row>
                }
              />
            </Col>
          </Row> */}
          <Row>
            <Col md={4}>
              <Card
                title="EPIN Statistics"
                category="Open/Used Epins from the day one"
                content={<ChartistGraph data={{
                  labels: [
                    (this.state.AvailableEPins*100/(this.state.AvailableEPins+this.state.UsedEpins+this.state.ExpiredEpins)).toFixed(2)+'%', (this.state.UsedEpins*100/(this.state.AvailableEPins+this.state.UsedEpins+this.state.ExpiredEpins)).toFixed(2)+'%', (this.state.ExpiredEpins*100/(this.state.AvailableEPins+this.state.UsedEpins+this.state.ExpiredEpins)).toFixed(2)+'%'
                  ],
                  series: [(this.state.AvailableEPins*100/(this.state.AvailableEPins+this.state.UsedEpins+this.state.ExpiredEpins)), (this.state.UsedEpins*100/(this.state.AvailableEPins+this.state.UsedEpins+this.state.ExpiredEpins)), (this.state.ExpiredEpins*100/(this.state.AvailableEPins+this.state.UsedEpins+this.state.ExpiredEpins))]
                }} type="Pie" />}
                legend={
                  <div>
                    <i className="fa fa-circle text-success" /> Available E-Pin ({this.state.AvailableEPins})
                    <i className="fa fa-circle text-warning" /> Used E-Pin ({this.state.UsedEpins})
                    <i className="fa fa-circle text-danger" /> Expired E-Pin {this.state.ExpiredEpins}
                  </div>
                }
              />
            </Col>
            <Col md={8}>
              <Card
                title="User Registration Statistics"
                category="Last 10 days Status"
                content={
                  <ChartistGraph
                    data={{labels: this.state.WeeklyUserRegistrationLevel,
                      series: this.state.WeeklyUserRegistrationSeries
                    }}
                    type="Line"
                    options={{
                      showArea: false,
                      height: "305px",
                      axisX: {
                        showGrid: true
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50
                      }
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function(value) {
                              return value[0];
                            }
                          }
                        }
                      ]
                    ]}
                  />
                }
                legend={
                  <div> </div>
                }
                stats={
                  <div>
                    <i className="fa fa-history" /> {"Last Registered at "+ this.state.LastMemberRegisterDate}
                  </div>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Card
                title={"User Registration Status "+ new Date().getFullYear()}
                category="All members (Staff and Admin not Included)"
                content={
                  <ChartistGraph
                    data={{
                      labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "Mai",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec"
                      ],
                      series: 
                        this.state.YearlyUserRegistrationSeries
                    }}
                    type="Bar"
                    options={optionsBar}
                    responsiveOptions={responsiveBar}
                  />
                }
                legend={
                  <div>
                    <i className="fa fa-circle text-info" /> Members
                  </div>
                }
                stats={
                  <div>
                    <i className="fa fa-check" /> Data information certified
                  </div>
                }
              />
            </Col>
            <Col md={6}>
              <Card
                title={"Last 12 Month Transactions"}
                category="All Transaction Included"
                content={
                  <ChartistGraph
                    data={{
                      labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "Mai",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec"
                      ],
                      series: 
                        this.state.YearlyUserTransactions
                    }}
                    type="Bar"
                    options={optionsBar}
                    responsiveOptions={responsiveBar}
                  />
                }
                legend={
                  <div>
                    <i className="fa fa-circle text-info" /> Credit
                    <i className="fa fa-circle text-danger" /> Debit
                  </div>
                }
                stats={
                  <div>
                    <i className="fa fa-check" /> Data information certified
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

export default Dashboard;
