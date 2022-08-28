import React from "react";

import { Navbar } from "react-bootstrap";

export default function Footer() {
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
