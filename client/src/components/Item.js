import React, { Component } from "react";

import axios from "axios";
import { Button, FormControl, InputGroup, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import queryString from "query-string";

import { API_BASE_URL } from "../constants";

export class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      qty: 1,
      inCart: false,
      cartItem: {
        cartId: localStorage.getItem("CART_ID"),
        productId: 0,
        customerId: 0,
        qty: 0,
      },
      modalShow: false,
      addedToCart: "",
    };
  }

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search);
    axios
      .get(`${API_BASE_URL}/product/${id}`)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ item: data });
      });
    axios
      .get(`${API_BASE_URL}/cart/${this.state.cartItem.cartId}/${id}`)
      .then((response) => response.data)
      .then((data) => {
        data === 0
          ? this.setState({ inCart: false })
          : this.setState({ inCart: true, qty: data });
      });
  }

  closeModal = (event) => {
    event.preventDefault();
    this.setState({ modalShow: false });
  };

  addToCart = async (event) => {
    event.preventDefault();
    const cartItem = this.state.cartItem;
    cartItem.cartId = localStorage.getItem("CART_ID");
    cartItem.customerId = 1;
    cartItem.qty = this.state.qty;
    cartItem.productId = this.state.item.productId;
    this.setState({ cartItem });
    if (this.state.inCart === false) {
      await axios
        .post(`${API_BASE_URL}/cart/add`, cartItem)
        .then((response) => response.data)
        .then((data) => {
          this.setState({ addedToCart: data, inCart: true });
        });
    } else {
      await axios
        .put(`${API_BASE_URL}/cart/${cartItem.cartId}`, cartItem)
        .then((response) => response.data)
        .then((data) => {
          this.setState({ addedToCart: data });
        });
    }
    if (
      this.state.addedToCart === "saved" ||
      this.state.addedToCart === "updated"
    ) {
      this.setState({ modalShow: true });
    }
  };

  render() {
    return (
      <div className="m-auto" style={{ width: "70%" }}>
        <a href="/index">All</a>
        <span>{">"}</span>
        <Link to={`/department/${this.state.item.department}`}>
          {this.state.item.department}
        </Link>
        <span>
          {">"}
          {this.state.item.productName}
        </span>
        <div className="row mt-4 ">
          <div className="col" style={{ textAlign: "center" }}>
            <img
              src={this.state.item.img}
              style={{ maxWidth: "100%", maxHeight: "500px" }}
            />
          </div>
          <div className="col align-self-center">
            <h3>{this.state.item.productName}</h3>
            <p>{this.state.item.productDescription}</p>
            <p>${this.state.item.unitPrice}</p>
            <Form onSubmit={this.addToCart}>
              <Form.Group>
                <div style={{ width: "150px" }}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <Button
                        variant="outline-primary"
                        onClick={(event) =>
                          this.state.qty <= 1
                            ? null
                            : this.setState({ qty: (this.state.qty -= 1) })
                        }
                      >
                        -
                      </Button>
                    </InputGroup.Prepend>
                    <FormControl
                      className="text-center"
                      name="qty"
                      value={this.state.qty}
                      onChange={(event) =>
                        event.target.value.isNaN
                          ? null
                          : this.setState({
                              [event.target.name]: parseInt(event.target.value),
                            })
                      }
                    />
                    <InputGroup.Append>
                      <Button
                        variant="outline-primary"
                        onClick={(event) => {
                          this.setState({ qty: (this.state.qty += 1) });
                        }}
                      >
                        +
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </Form.Group>
              <Button type="submit" variant="outline-primary">
                Add to Cart
              </Button>

              <Modal show={this.state.modalShow}>
                <Modal.Header>
                  Your Item(s) has been added to cart!
                </Modal.Header>
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
                      <img
                        src={this.state.item.img}
                        style={{ maxHeight: "100%" }}
                      />
                    </div>
                    <div
                      className="col"
                      style={{
                        height: "10em",
                        verticalAlign: "middle",
                      }}
                    >
                      <h3>{this.state.item.productName}</h3>
                      <span>Quantity: {this.state.qty}</span>
                      <br />
                      <span>
                        Estimated Price: $
                        {this.state.qty * this.state.item.unitPrice}
                      </span>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="outline-primary"
                    onClick={(event) => this.closeModal(event)}
                  >
                    Continue Shopping
                  </Button>
                  <Link className="btn btn-primary" to="/cart">
                    Go To Cart
                  </Link>
                </Modal.Footer>
              </Modal>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
