import React, { Component } from "react";

import { Accordion, Card, Form, Button } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";

import axios from "axios";
import { API_BASE_URL } from "../constants";

export class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guestCheck: true,
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      phone: "",
      password: "",
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.isAuthenticated !== prevProps.isAuthenticated) {
      this.loadUser();
    }
  }
  componentDidMount() {
    this.loadUser();
  }

  perform_logout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("CUSTOMER_ID");
  };

  loadUser = () => {
    console.log("Loading User");
    if (this.props.isAuthenticated) {
      const currentUser = this.props.currentUser;
      this.setState({
        email: currentUser.email,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        address: currentUser.address,
        city: currentUser.city,
        state: currentUser.state,
        postalCode: currentUser.postalCode,
        country: currentUser.country,
        phone: currentUser.phone,
      });
    }
  };

  login = async (event) => {
    event.preventDefault();
    const user = { email: this.state.email, password: this.state.password };
    await axios
      .post(`${API_BASE_URL}/auth/signin`, user)
      .then((response) => response.data)
      .then((data) => {
        localStorage.setItem("ACCESS_TOKEN", data.accessToken);
      })
      .catch((error) => alert("Invalid email or password, Please try again!"));
    await axios
      .get(`${API_BASE_URL}/customer/current_user/${user.email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        localStorage.setItem("CUSTOMER_ID", data);
      });
    window.location.reload();
  };

  render() {
    return (
      <div style={{ paddingBottom: "200px" }}>
        <Form>
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                1 of 3 Welcome
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body style={{ width: "50%", margin: "auto" }}>
                  {!this.props.isAuthenticated ? (
                    <div>
                      <div>
                        <Form.Group>
                          <Form.Group>
                            <Form.Check
                              inline
                              type="radio"
                              label="Check out as Guest"
                              checked={this.state.guestCheck}
                              onChange={(event) => {
                                this.setState({
                                  guestCheck: event.target.value,
                                });
                                console.log(this.state.guestCheck);
                              }}
                            />
                            <Form.Check
                              inline
                              type="radio"
                              label="Sign In"
                              checked={!this.state.guestCheck}
                              onChange={(event) => {
                                this.setState({
                                  guestCheck: !event.target.value,
                                });
                                console.log(this.state.guestCheck);
                              }}
                            />
                          </Form.Group>
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={(event) =>
                              this.setState({ email: event.target.value })
                            }
                          />
                        </Form.Group>
                      </div>
                      {this.state.guestCheck ? null : (
                        <div>
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            value={this.state.password}
                            onChange={(event) =>
                              this.setState({ password: event.target.value })
                            }
                          />
                          <br />
                          <Button onClick={this.login}>Sign In</Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p>Check out as {this.props.currentUser.firstName}</p>
                      <Button
                        onClick={(event) => {
                          event.preventDefault();
                          this.perform_logout();
                          window.location.reload(false);
                        }}
                      >
                        Log Out
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                2 of 3 Shipping
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body style={{ width: "50%", margin: "auto" }}>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.firstName}
                      onChange={(event) =>
                        this.setState({ firstName: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.lastName}
                      onChange={(event) =>
                        this.setState({ lastName: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.address}
                      onChange={(event) =>
                        this.setState({ address: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.city}
                      onChange={(event) =>
                        this.setState({ city: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.state}
                      onChange={(event) =>
                        this.setState({ state: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.postalCode}
                      onChange={(event) =>
                        this.setState({ postalCode: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.country}
                      onChange={(event) =>
                        this.setState({ country: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Optional"
                      value={this.state.phone}
                      onChange={(event) =>
                        this.setState({ phone: event.target.value })
                      }
                    />
                  </Form.Group>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="2">
                3 of 3 Payment
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body style={{ width: "50%", margin: "auto" }}>
                  <br />
                  <span>For Demo Purpose, No Transaction Will Be Made</span>
                  <PayPalButton
                    amount="0.01"
                    onSuccess={(details, data) => {
                      alert("Transaction completed");
                    }}
                  />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Form>
      </div>
    );
  }
}

export default Checkout;
