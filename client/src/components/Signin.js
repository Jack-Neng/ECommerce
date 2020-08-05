import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

import axios from "axios";

import { API_BASE_URL } from "../constants";

export class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

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
    window.location.replace("/index");
  };

  render() {
    return (
      <div
        style={{
          width: "40%",
          margin: "auto",
          marginTop: "100px",
          marginBottom: "100px",
        }}
      >
        <Form onSubmit={this.login}>
          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={this.state.email}
              onChange={(event) => {
                this.setState({ email: event.target.value });
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={(event) => {
                this.setState({ password: event.target.value });
              }}
            />
          </Form.Group>
          <Button type="submit">Sign In</Button>
        </Form>
        <span>
          <br />
          Don't have an account?{" "}
        </span>
        <a href="/join">Join Now</a>
      </div>
    );
  }
}

export default Signin;
