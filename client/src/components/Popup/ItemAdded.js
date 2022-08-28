import React, { useCallback } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../Util/Theme";
import { useNavigate } from "react-router-dom";

export default function ItemAdded({ modalShow, setModalShow, item, qty }) {
  const navigate = useNavigate();

  const handleOnClick = useCallback(
    (link) => navigate(link, { replace: true }),
    [navigate]
  );

  const closeModal = (event) => {
    event.preventDefault();
    setModalShow(false);
  };

  return (
    <Modal show={modalShow}>
      <Modal.Header>Your Item(s) has been added to cart!</Modal.Header>
      <Modal.Body>
        <div className="row mt-4 ">
          <div
            className="col"
            style={{
              height: "10em",
              textAlign: "center",
              verticalAlign: "middle",
            }}
          >
            <img src={item.img} style={{ maxHeight: "100%" }} />
          </div>
          <div
            className="col"
            style={{
              height: "10em",
              verticalAlign: "middle",
            }}
          >
            <h3>{item.name}</h3>
            <span>Quantity: {qty}</span>
            <br />
            <span>Estimated Price: ${qty * item.unitPrice}</span>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <ThemeProvider theme={theme}>
          <Button
            variant="outlined"
            color="neutral"
            onClick={(event) => closeModal(event)}
          >
            Continue Shopping
          </Button>
          <Button
            variant="contained"
            color="neutral"
            sx={{ margin: "0 15px" }}
            onClick={() => handleOnClick("/cart")}
          >
            Go To Cart
          </Button>
        </ThemeProvider>
      </Modal.Footer>
    </Modal>
  );
}
