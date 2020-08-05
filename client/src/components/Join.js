import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Modal } from "react-bootstrap";

import { API_BASE_URL } from "../constants";

export class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      passwordC: "",
      checked: false,
      modalShow: false,
    };
  }

  register = async (event) => {
    event.preventDefault();
    if (
      this.state.email === "" ||
      this.state.firstName === "" ||
      this.state.lastName === "" ||
      this.state.password === "" ||
      this.state.passwordC === "" ||
      (this.state.checked === false &&
        (this.state.address === "" ||
          this.state.city === "" ||
          this.state.state === "" ||
          this.state.postalCode === "" ||
          this.state.country === ""))
    ) {
      alert("Field(s) is missing! Please Double Check.");
    } else if (this.state.password !== this.state.passwordC) {
      alert("Passwords Don't Match!");
    } else {
      const customer = {};
      customer.email = this.state.email;
      customer.firstName = this.state.firstName;
      customer.lastName = this.state.lastName;
      customer.address = this.state.address;
      customer.city = this.state.city;
      customer.state = this.state.state;
      customer.postalCode = this.state.postalCode;
      customer.country = this.state.country;
      customer.phone = this.state.phone;
      customer.password = this.state.password;
      await axios
        .post(`${API_BASE_URL}/auth/register`, customer)
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
          this.setState({ modalShow: true });
        })
        .catch((error) =>
          alert("Email address is used! Please use another or Sign in")
        );
    }
  };

  render() {
    console.log(this.state);
    return (
      <div
        style={{
          width: "40%",
          margin: "auto",
          marginTop: "100px",
          paddingBottom: "100px",
        }}
      >
        <Form onSubmit={this.register}>
          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="hello@email.com"
              value={this.state.email}
              onChange={(event) => this.setState({ email: event.target.value })}
            />
          </Form.Group>
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
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={this.state.password}
              onChange={(event) =>
                this.setState({ password: event.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={this.state.passwordC}
              onChange={(event) =>
                this.setState({ passwordC: event.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Complete Billing Address Later"
              onClick={(event) => {
                this.setState({ checked: event.target.checked });
              }}
            />
          </Form.Group>

          {this.state.checked === false ? (
            <div>
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
            </div>
          ) : null}

          <Button type="submit">Join Now</Button>
        </Form>
        <span>
          <br />
          Already have an account?{" "}
        </span>
        <a href="/signin">Login</a>

        <Modal show={this.state.modalShow}>
          <Modal.Body>
            Welcome {this.state.firstName}!<br /> Thanks for Joining, Please
            Sign In and Continue!
          </Modal.Body>
          <Modal.Footer>
            <Button href="/signin" className="button">
              Sign In
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Join;
