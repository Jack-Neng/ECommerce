import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

import axios from "axios";

import { API_BASE_URL } from "../constants";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: localStorage.getItem("CUSTOMER_ID"),
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
      changeProfile: false,
    };
  }

  componentDidMount() {
    this.loadProfile();
  }

  loadProfile = () => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    axios
      .get(`${API_BASE_URL}/customer/${this.state.customerId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response.data)
      .then((data) =>
        this.setState({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          country: data.country,
          phone: data.phone,
        })
      );
  };

  render() {
    return (
      <div style={{ width: "50%", margin: "auto", marginBottom: "200px" }}>
        {!this.state.changeProfile ? (
          <div>
            <h3>Customer Profile</h3>
            <div style={{ float: "left" }}>
              <h5>Personal Information</h5>
              <div>
                <p>
                  {this.state.firstName} {this.state.lastName}
                </p>
                <p>{this.state.email}</p>
                <p>{this.state.phone}</p>
              </div>
              <h5>Address</h5>
              <div>
                <p>{this.state.address}</p>
                <p>
                  {this.state.city} {this.state.state}
                </p>
                <p>{this.state.postalCode}</p>
                <p>{this.state.country}</p>
              </div>
            </div>
            <Button
              style={{ float: "right" }}
              onClick={(event) => {
                event.preventDefault();
                this.setState({ changeProfile: true });
              }}
            >
              Change Profile
            </Button>
          </div>
        ) : (
          <div>
            <h3>Change Profile</h3>
            <Form>
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
              <div>
                <Button
                  style={{ float: "left" }}
                  variant="danger"
                  onClick={(event) => {
                    event.preventDefault();
                    this.setState({ changeProfile: false });
                  }}
                >
                  Cancel
                </Button>
                <Button style={{ float: "right" }} type="submit">
                  Save
                </Button>
              </div>
            </Form>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
