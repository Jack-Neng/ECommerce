import React, { useEffect, useState, useCallback } from "react";

import { InputGroup, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import Department from "../Header/Department";
import ItemInCart from "../ItemCard/ItemInCart";
import { ThemeProvider } from "@mui/material/styles";
import {
  updateItemInCart,
  deleteItemInCart,
  deleteAllItemsInCart,
} from "../Util/Requests";
import { theme } from "../Util/Theme";
import "./Cart.css";

export default function Cart({ isAuthenticated, itemsInCart, setItemsInCart }) {
  const [prices, setPrices] = useState([]);
  const [cartId, setCartId] = useState(localStorage.getItem("CART_ID"));
  const navigate = useNavigate();

  const handleOnClick = useCallback(
    (link) => navigate(link, { replace: true }),
    [navigate]
  );

  const calPrice = (index) => {
    const newPrices = [...prices];
    newPrices[index] =
      Math.floor(itemsInCart[index].qty * itemsInCart[index].unitPrice * 100) /
      100;
    setPrices(newPrices);
  };

  const decreaseQty = (index) => {
    const newItems = [...itemsInCart];
    const newPrices = [...prices];
    newItems[index].qty -= 1;
    newPrices[index] =
      Math.floor(newItems[index].qty * newItems[index].unitPrice * 100) / 100;
    setPrices(newPrices);
    setItemsInCart(newItems);
    updateRequest(newItems[index]);
  };

  const increaseQty = (index) => {
    const newItems = [...itemsInCart];
    const newPrices = [...prices];
    newItems[index].qty += 1;
    newPrices[index] =
      Math.floor(newItems[index].qty * newItems[index].unitPrice * 100) / 100;
    setPrices(newPrices);
    setItemsInCart(newItems);
    updateRequest(newItems[index]);
  };

  const typeQty = (event, index) => {
    const newItems = [...itemsInCart];
    const newPrices = [...prices];
    newItems[index].qty = parseInt(event.target.value);
    newPrices[index] =
      Math.floor(newItems[index].qty * newItems[index].unitPrice * 100) / 100;
    setPrices(newPrices);
    setItemsInCart(newItems);
    updateRequest(newItems[index]);
  };

  const updateRequest = async (item) => {
    const cartItem = {
      cartId: cartId,
      productId: item.productId,
      qty: item.qty,
    };
    const data = await updateItemInCart(cartItem);
    console.log(data);
  };

  const deleteItem = async (index) => {
    const data = await deleteItemInCart(cartId, itemsInCart[index].productId);
    console.log(data);
    const newItems = [...itemsInCart];
    newItems.splice(index, 1);
    setItemsInCart(newItems);
  };

  const emptyCart = async () => {
    const data = await deleteAllItemsInCart(cartId);
    console.log(data);
    setItemsInCart([]);
  };

  return (
    <>
      <Department />
      <div
        className="Cart m-auto"
        style={{ paddingTop: "20px", paddingBottom: "100px", maxWidth: "80%" }}
      >
        {itemsInCart.length === 0 ? (
          <h1 style={{ textAlign: "center" }}>Your Cart Is Empty</h1>
        ) : (
          <>
            <div>
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }} scope="col">
                      PRODUCT DETAILS
                    </th>
                    <th style={{ textAlign: "center" }} scope="col">
                      PRICE
                    </th>
                    <th style={{ textAlign: "center" }} scope="col">
                      QUANTITY
                    </th>
                    <th style={{ textAlign: "center" }} scope="col">
                      TOTAL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {itemsInCart.map(
                    (
                      { img, productId, name, unitPrice, qty, ...rest },
                      index
                    ) => (
                      <tr key={index}>
                        <td style={{ width: "44%", textAlign: "center" }}>
                          <ItemInCart
                            isAuthenticated={isAuthenticated}
                            img={img}
                            index={index}
                            productId={productId}
                            name={name}
                            handleDelete={deleteItem}
                            description={"This is a test description."}
                          />
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                        >
                          ${unitPrice}
                        </td>
                        <td
                          style={{
                            width: "120px",
                            verticalAlign: "middle",
                          }}
                        >
                          <InputGroup style={{ width: "120px" }}>
                            <IconButton
                              size="small"
                              variant="outlined"
                              onClick={(event) =>
                                qty <= 1 ? null : decreaseQty(index)
                              }
                            >
                              <RemoveIcon />
                            </IconButton>

                            <Form.Control
                              className="text-center"
                              name="qty"
                              value={qty}
                              onChange={(event) =>
                                event.target.value.isNaN
                                  ? null
                                  : typeQty(event, index)
                              }
                            />
                            <IconButton
                              size="small"
                              variant="outlined"
                              onClick={(event) => increaseQty(index)}
                            >
                              <AddIcon />
                            </IconButton>
                          </InputGroup>
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                        >
                          ${prices[index] ? prices[index] : calPrice(index)}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
            <div>
              <ul>
                <li className="list-group-item text-right border-0">
                  Subtotal: ${prices.reduce((a, b) => a + b, 0)}
                </li>
                <li className="list-group-item text-right border-0">
                  <ThemeProvider theme={theme}>
                    <Button
                      variant="outlined"
                      color="neutral"
                      sx={{ margin: "0 15px" }}
                      onClick={() => handleOnClick("/browse")}
                    >
                      Continue Shopping
                    </Button>
                    <Button
                      variant="contained"
                      color="neutral"
                      onClick={() => handleOnClick("/checkout")}
                    >
                      Checkout
                    </Button>
                  </ThemeProvider>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
}
