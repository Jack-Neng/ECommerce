import React, { Component } from "react";

import { Navbar } from "react-bootstrap";

export class Footer extends Component {
  render() {
    return (
      <div>
        <Navbar fixed="bottom" bg="dark" variant="dark">
          <div style={{ width: "100%" }}>
            <span style={{ float: "left" }}>Created By Jack</span>
            <span style={{ float: "right" }}>
              Check it out here:{" "}
              <a href="github.com/Jack-Neng">github.com/Jack-Neng</a>
            </span>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default Footer;
