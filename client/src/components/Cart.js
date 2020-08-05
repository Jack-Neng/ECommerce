import React, { Component } from "react";
import axios from "axios";

import { InputGroup, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import { API_BASE_URL } from "../constants";

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      price: [],
      subtotal: 0,
      tax: 0.12,
      cartId: localStorage.getItem("CART_ID"),
    };
  }

  componentDidMount() {
    axios
      .get(`${API_BASE_URL}/cart/${this.state.cartId}`)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ item: data });
      });
  }

  decreaseQty = (index) => {
    const item = this.state.item;
    item[index].qty -= 1;
    const price = this.state.price;
    price[index] =
      Math.floor(item[index].qty * item[index].unitPrice * 100) / 100;
    this.setState({ item, price });
    this.updateRequest(item[index]);
  };

  increaseQty = (index) => {
    const item = this.state.item;
    item[index].qty += 1;
    const price = this.state.price;
    price[index] =
      Math.floor(item[index].qty * item[index].unitPrice * 100) / 100;
    this.setState({ item, price });
    this.updateRequest(item[index]);
  };

  typeQty = (event, index) => {
    const item = this.state.item;
    item[index].qty = parseInt(event.target.value);
    const price = this.state.price;
    price[index] =
      Math.floor(item[index].qty * item[index].unitPrice * 100) / 100;
    this.setState({ item, price });
    this.updateRequest(item[index]);
  };

  updateRequest = (item) => {
    const cartItem = {
      cartId: this.state.cartId,
      customerId: 1,
      productId: item.productId,
      qty: item.qty,
    };
    axios
      .put(`${API_BASE_URL}/cart/${this.state.cartId}`, cartItem)
      .then((response) => response.data)
      .then((data) => console.log(data));
  };

  calPrice = (index) => {
    const item = this.state.item;
    const price = this.state.price;
    price[index] =
      Math.floor(item[index].qty * item[index].unitPrice * 100) / 100;
    this.setState({ price });
  };

  deleteItem = (index) => {
    const item = this.state.item;
    axios
      .delete(`${API_BASE_URL}/cart/${this.state.item[index].productId}`)
      .then((response) => response.data)
      .then((data) => console.log(data));
    item.splice(index, 1);
    this.setState({ item });
  };

  emptyCart = () => {
    axios
      .delete(`${API_BASE_URL}/cart/cart/${this.state.cartId}`)
      .then((response) => response.data)
      .then((data) => console.log(data));
    this.setState({ item: [] });
  };

  render() {
    return (
      <div
        className="m-auto"
        style={{ paddingBottom: "400px", maxWidth: "80%" }}
      >
        {this.state.item.length === 0 ? (
          <h1 style={{ textAlign: "center" }}>Your Cart Is Empty</h1>
        ) : (
          <div>
            <Form>
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }} scope="col">
                      ITEMS
                    </th>
                    <th style={{ textAlign: "center" }} scope="col">
                      NAME
                    </th>
                    <th style={{ textAlign: "center" }} scope="col">
                      PRICE
                    </th>
                    <th style={{ textAlign: "center" }} scope="col">
                      QUANTITY
                    </th>
                    <th style={{ textAlign: "center" }} scope="col">
                      REMOVE
                    </th>
                    <th style={{ textAlign: "center" }} scope="col">
                      TOTAL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.item.map((item, index) => (
                    <tr key={index}>
                      <td style={{ width: "20%", textAlign: "center" }}>
                        <img src={item.img} style={{ maxWidth: "50%" }} />
                      </td>
                      <td
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        <a href={`/item?id=${item.productId}`}>
                          {item.productName}
                        </a>
                      </td>
                      <td
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        ${item.unitPrice}
                      </td>
                      <td
                        style={{
                          width: "120px",
                          verticalAlign: "middle",
                        }}
                      >
                        <InputGroup style={{ width: "120px" }}>
                          <InputGroup.Prepend>
                            <Button
                              variant="outline-primary"
                              onClick={(event) =>
                                item.qty <= 1 ? null : this.decreaseQty(index)
                              }
                            >
                              -
                            </Button>
                          </InputGroup.Prepend>
                          <Form.Control
                            className="text-center"
                            name="qty"
                            value={item.qty}
                            onChange={(event) =>
                              event.target.value.isNaN
                                ? null
                                : this.typeQty(event, index)
                            }
                          />
                          <InputGroup.Append>
                            <Button
                              variant="outline-primary"
                              onClick={(event) => this.increaseQty(index)}
                            >
                              +
                            </Button>
                          </InputGroup.Append>
                        </InputGroup>
                      </td>
                      <td
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        <Button
                          variant="outline-danger"
                          onClick={(event) => this.deleteItem(index)}
                        >
                          Remove
                        </Button>
                      </td>
                      <td
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        $
                        {this.state.price[index]
                          ? this.state.price[index]
                          : this.calPrice(index)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ul className="list-group float-right ">
                <li
                  className="list-group-item text-right border-0"
                  aria-disabled="true"
                >
                  <Button variant="outline-danger" onClick={this.emptyCart}>
                    Empty Cart
                  </Button>
                </li>
                <li className="list-group-item text-right border-0">
                  Subtotal: ${this.state.price.reduce((a, b) => a + b, 0)}
                </li>
                <li className="list-group-item text-right border-0">
                  Tax({this.state.tax * 100}%): $
                  {Math.floor(
                    this.state.tax *
                      this.state.price.reduce((a, b) => a + b, 0) *
                      100
                  ) / 100}
                </li>
                <li className="list-group-item text-right border-0">
                  Total: $
                  {Math.floor(
                    (this.state.tax *
                      this.state.price.reduce((a, b) => a + b, 0) +
                      this.state.price.reduce((a, b) => a + b, 0)) *
                      100
                  ) / 100}
                </li>
                <li className="list-group-item text-right border-0">
                  <Link to="/checkout">
                    <Button variant="outline-info">Checkout</Button>
                  </Link>
                </li>
              </ul>
            </Form>
          </div>
        )}
      </div>
    );
  }
}

export default Cart;
