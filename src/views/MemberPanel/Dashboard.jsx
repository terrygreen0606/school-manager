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
// react components used to create a SVG / Vector map

import Card from "components/Card/Card.jsx";
import StatsCard from "components/Card/StatsCard.jsx";


var dataPie = {
  labels: ["50%", "50%"],
  series: [50, 50],
};

// Data for Line Chart
var dataSales = {
  labels: [
    "9:00AM",
    "12:00AM",
    "3:00PM",
    "6:00PM",
    "9:00PM",
    "12:00PM",
    "3:00AM",
    "6:00AM"
  ],
  series: [
    [287, 385, 490, 492, 554, 586, 698, 695],
    [67, 152, 143, 240, 287, 335, 435, 437],
    [23, 113, 67, 108, 190, 239, 307, 308]
  ]
};
var optionsSales = {
  low: 0,
  high: 800,
  showArea: false,
  height: "245px",
  axisX: {
    showGrid: false
  },
  lineSmooth: true,
  showLine: true,
  showPoint: true,
  fullWidth: true,
  chartPadding: {
    right: 50
  }
};
var responsiveSales = [
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
];

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
        TotalDownlines: 0,
        WalletBalance: 0,
        TotalEarnings: 0,
        AvailableEPins: 0,
        LastMemberRegisterDate: '',
        LastTransactionDate: '',
        assign_team: '',
        assign_user_id: '',
        assign_staff_id: '',
        Members: [],
        Staff: [],
        Teams: []
    };
    }

  render() {
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-warning" />}
                statsText="Total Downline"
                statsValue={this.state.TotalDownlines}
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText={"Last Registered at "+ this.state.LastMemberRegisterDate}
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Wallet Balance"
                statsValue={"$"+this.state.WalletBalance}
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText={"Last Transaction at "+ this.state.LastTransactionDate}
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph1 text-info" />}
                statsText="Total Earning"
                statsValue={this.state.TotalEarnings}
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-map-pin text-primary" />}
                statsText="Available EPIN"
                statsValue={this.state.AvailableEPins}
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Card
                title="Support Requests"
                category="Statuswise support requests"
                content={<ChartistGraph data={dataPie} type="Pie" />}
                legend={
                  <div>
                    <i className="fa fa-circle text-success" /> Closed
                    <i className="fa fa-circle text-danger" /> Open
                  </div>
                }
                stats={
                  <div>
                    <i className="fa fa-clock-o" /> Campaign sent 2 days ago
                  </div>
                }
              />
            </Col>
            <Col md={8}>
              <Card
                title="Credit/Debit Transactions"
                category="Last 10 days Record"
                content={
                  <ChartistGraph
                    data={dataSales}
                    type="Line"
                    options={optionsSales}
                    responsiveOptions={responsiveSales}
                  />
                }
                legend={
                  <div>
                    <i className="fa fa-circle text-info" /> Open
                    <i className="fa fa-circle text-danger" /> Click
                    <i className="fa fa-circle text-warning" /> Click Second
                    Time
                  </div>
                }
                stats={
                  <div>
                    <i className="fa fa-history" /> Updated 3 minutes ago
                  </div>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Card
                title="Last 12 Months Transactions"
                category="All products including Taxes"
                content={
                  <ChartistGraph
                    data={dataBar}
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
                    <i className="fa fa-check" /> Data updated last 1 hour
                  </div>
                }
              />
            </Col>
            <Col md={6}>
              <Card
                title="Commerce Orders"
                category="Last 5 Orders"
                content={
                  <table className="table">
                    <tbody>
                    <tr>
                      <td> Sign contract for "What are conference organizers afraid of?"</td>
                    </tr>
                    </tbody>
                  </table>
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
