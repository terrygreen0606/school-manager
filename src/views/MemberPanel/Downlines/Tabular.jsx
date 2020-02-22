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
import TreeMenu from 'react-simple-tree-menu';

class Tabular extends Component {
  render() {
    return (
      <div className="main-content buttons-with-margin">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <div className="card">
                <Row>
                  <Col md={12}>
                  <TreeMenu
  data={[
    {
      key: 'mammal',
      label: 'Mammal',
      nodes: [
        {
          key: 'canidae',
          label: 'Canidae',
          nodes: [
            {
              key: 'dog',
              label: 'Dog',
              nodes: [],
              url: 'https://www.google.com/search?q=dog'
            },
            {
              key: 'fox',
              label: 'Fox',
              nodes: [],
              url: 'https://www.google.com/search?q=fox'
            },
            {
              key: 'wolf',
              label: 'Wolf',
              nodes: [],
              url: 'https://www.google.com/search?q=wolf'
            }
          ],
          url: 'https://www.google.com/search?q=canidae'
        }
      ],
      url: 'https://www.google.com/search?q=mammal'
    },
    {
      key: 'reptile',
      label: 'Reptile',
      nodes: [
        {
          key: 'squamata',
          label: 'Squamata',
          nodes: [
            {
              key: 'lizard',
              label: 'Lizard',
              url: 'https://www.google.com/search?q=lizard'
            },
            {
              key: 'snake',
              label: 'Snake',
              url: 'https://www.google.com/search?q=snake'
            },
            {
              key: 'gekko',
              label: 'Gekko',
              url: 'https://www.google.com/search?q=gekko'
            }
          ],
          url: 'https://www.google.com/search?q=squamata'
        }
      ],
      url: 'https://www.google.com/search?q=reptile'
    }
  ]}
  debounceTime={125}
  disableKeyboard={false}
  hasSearch={false}
  onClickItem={function noRefCheck(){}}
  resetOpenNodesOnDataUpdate={false}
/>
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

export default Tabular;
