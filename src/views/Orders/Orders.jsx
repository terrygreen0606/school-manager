/*!
Orders
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
  FormControl
} from "react-bootstrap";
// react component that creates a switch button that changes from on to off mode
// import Switch from "react-bootstrap-switch";
import axios from 'axios';

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";
var globalVariables = require('../../services/globalVariables.jsx');
class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            Orders: [],
            selectedItem: null,
            setup_value: '',
            setup_key: ''
        };
        }
      
        componentDidMount() {
          let login_token = sessionStorage.getItem('login_token');
          axios.post(globalVariables.admin_api_path+'/catalog/search-order', {}, {
            headers: { Authorization: "Bearer " + login_token }
          })
            .then(res => res.data).then((data) => {
              this.setState({Orders: data.response})
            })
        }

        renderModal = () => {
          if (this.state.selectedItem !== null) {
            const SetupItem = this.state.basicSetupItems[this.state.selectedItem];
            return (
              <Row>
                <Col md={12}>
                    <FormGroup>
                      <ControlLabel>{SetupItem.description}</ControlLabel>
                      <FormControl  type="text" defaultValue={SetupItem.value} onChange={this.handleChange}/>
                    </FormGroup>
            </Col>
              </Row>
            );
          }
        }

      handleSubmit = event => {
        event.preventDefault();
        let login_token = sessionStorage.getItem('login_token');
        let AllSetupItems = this.state.basicSetupItems;
        axios.post(globalVariables.admin_api_path+'/setup/update-setting', {key: this.state.setup_key, value: this.state.setup_value},{
          headers: { Authorization: "Bearer " + login_token }
        })
          .then(res => {
            this.props.handleClick("tr", 1, "Settings Updated Successfully");
            AllSetupItems[this.state.selectedItem] = res.data.response;
            this.setState({basicSetupItems: AllSetupItems});
            this.setState({ showModal: false });
           
          }).catch(error => {
            this.props.handleClick("tr", 3, error.response.data.msg);
          });
      }

      handleChange = event => {
        this.setState({ setup_value: event.target.value });
      }

    onOpenModal = (i, key) => {
      const SetupItem = this.state.basicSetupItems[i];
      this.setState({
        showModal: true,
        selectedItem: i,
        setup_key: key,
        setup_value: SetupItem.value,
      })
    };
        
  render() {
    const edit = <Tooltip id="edit">View Order Details</Tooltip>;
    
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                tableFullWidth
                content={
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Woocommerce Link ID</th>
                        <th>Buyer Name</th>
                        <th>Order Status</th>
                        <th>Remark</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    { this.state.Orders.map((Order, index_key) => (
                      <tr key={index_key}>
                        <td>#{Order.id}</td>
                        <td>#{Order.woo_order_id} </td>
                        <td>{Order.buyer_first_name} {Order.buyer_last_name}</td>
                        <td>
                            {(() => {
                                switch(Order.status)
                                {
                                    case 1:
                                        return  <Button simple bsStyle="success" bsSize="xs"  fill> Complete </Button>;
                                    case 0:
                                        return  <Button simple bsStyle="primary" bsSize="xs"  fill> Processing </Button>;
                                    case 2:
                                        return  <Button simple bsStyle="danger" bsSize="xs"  fill> Cancelled </Button>;   
                                }
                            })()}
                        </td>
                    <td>{Order.remark}</td>
                        <td className="td-actions text-right">
                            <OverlayTrigger placement="top" overlay={edit}>
                            <Button simple bsStyle="primary" bsSize="xs"  fill>
                                <i className="fa fa-eye" />
                            </Button>
                            </OverlayTrigger>
                        </td>
                      </tr>
                    )) }
                    </tbody>
                  </Table>
                }
              />
            </Col>
            {/*
            <Modal
                      show={this.state.showModal}
                      onHide={() => this.setState({ showModal: false })}
                    >
                      <form onSubmit={this.handleSubmit}>
                      <Modal.Header closeButton>
                        <Modal.Title>Edit Settings</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                      {this.renderModal()}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          simple
                          onClick={() => this.setState({ showModal: false })}
                        >
                          Close
                        </Button>
                        <Button type="submit"
                          bsStyle="success"
                          fill
                          onClick={() => this.setState({ showModal: false })} 
                        >
                          Save changes
                        </Button>
                      </Modal.Footer>
                      </form>
                    </Modal>
                    */}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Orders;
