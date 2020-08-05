import React, { Component } from "react";

import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  FormControl,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      isLoading: true,
      logout_action: false,
    };
  }

  perform_logout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("CUSTOMER_ID");
  };

  render() {
    const { search } = this.state;

    return (
      <div>
        <Navbar
          className="d-flex justify-content-between"
          bg="dark"
          variant="dark"
        >
          <div className="d-flex justify-content-between">
            <Navbar.Brand href="/index">E-Commerce</Navbar.Brand>
            <Nav className="mr-auto">
              <NavDropdown title="Department" id="basic-nav-dropdown">
                <NavDropdown.Item href="/department/Clothes">
                  Clothes
                </NavDropdown.Item>
                <NavDropdown.Item href="/department/Electronics">
                  Electronics
                </NavDropdown.Item>
                <NavDropdown.Item href="/department/Grocery">
                  Grocery
                </NavDropdown.Item>
                <NavDropdown.Item href="/department/Home">
                  Home
                </NavDropdown.Item>
                <NavDropdown.Item href="/department/Sports">
                  Sports
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </div>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={search}
              onChange={(event) =>
                this.setState({ search: event.target.value })
              }
            />
            <Button
              variant="outline-info"
              href={`/search/${this.state.search}`}
            >
              Search
            </Button>
          </Form>
          <Nav>
            {this.props.isAuthenticated ? (
              <NavDropdown
                title={this.props.currentUser.firstName}
                id="basic-nav-dropdown"
                alignRight
              >
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/history">
                  Order History
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={(event) => {
                    event.preventDefault();
                    this.setState({ logout_action: true });
                    console.log(
                      "this.state.logout_action",
                      this.state.logout_action
                    );
                  }}
                >
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Sign In" id="basic-nav-dropdown">
                <NavDropdown.Item href="/signin">Sign In</NavDropdown.Item>
                <NavDropdown.Item href="/join">Join Now</NavDropdown.Item>
              </NavDropdown>
            )}

            <Link className="btn btn-primary" to="/cart">
              Cart
            </Link>
          </Nav>
        </Navbar>

        <Modal show={this.state.logout_action}>
          <Modal.Body>Do you want to log out?</Modal.Body>
          <Modal.Footer>
            <Button
              onClick={(event) => {
                event.preventDefault();
                this.setState({ logout_action: false });
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={(event) => {
                event.preventDefault();
                this.perform_logout();
                window.location.reload(false);
              }}
            >
              Log Out
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Header;
