import React, { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { InputGroup, Form } from "react-bootstrap";
import { Button, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { ThemeProvider } from "@mui/material/styles";

import Department from "../Header/Department";
import ItemInFavourite from "../ItemCard/ItemInFavourite";
import ItemAdded from "../Popup/ItemAdded";
import {
  getAllItemsInFavourite,
  deleteItemInFavourite,
  updateItemInCart,
  addItemToCart,
} from "../Util/Requests";
import { theme } from "../Util/Theme";

export default function Favourite({
  isAuthenticated,
  cartId,
  itemsInCart,
  setItemsInCart,
}) {
  const [items, setItems] = useState([]);
  const [addedItem, setAddedItem] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
  const customerId = localStorage.getItem("CUSTOMER_ID");

  const decreaseQty = (index) => {
    const newItems = [...items];
    newItems[index].qty -= 1;
    setItems(newItems);
  };

  const increaseQty = (index) => {
    const newItems = [...items];
    newItems[index].qty += 1;
    setItems(newItems);
  };

  const typeQty = (event, index) => {
    const newItems = [...items];
    newItems[index].qty = parseInt(event.target.value);
    setItems(newItems);
  };

  const getAllFav = async (customerId) => {
    const data = await getAllItemsInFavourite(customerId, accessToken);
    setItems(data.map((item) => ({ ...item, qty: 0 })));
  };

  const addToCart = async (event, index) => {
    event.preventDefault();
    const { qty, productId } = items[index];
    const currentItems = [...itemsInCart];
    const itemInCart = currentItems.find((item) => item.productId == productId);
    if (itemInCart) {
      itemInCart.qty += qty;
      itemInCart.cartId = cartId;
      const data = await updateItemInCart(itemInCart);
      setItemsInCart(itemsInCart);
      setModalShow(true);
    } else {
      let newItemInCart = {
        cartId: cartId,
        qty: qty,
        productId: productId,
      };
      const data = await addItemToCart(newItemInCart);
      setItemsInCart([newItemInCart, ...itemsInCart]);
      setModalShow(true);
    }
    setAddedItem(items[index]);
  };

  const removeFavItem = async (customerId, productId) => {
    const data = await deleteItemInFavourite(
      customerId,
      productId,
      accessToken
    );
    setItems(items.filter((item) => item.productId !== productId));
  };

  useEffect(() => {
    getAllFav(customerId);
  }, []);

  return (
    <>
      <Department />
      <div
        className="m-auto"
        style={{ paddingTop: "20px", paddingBottom: "100px", maxWidth: "80%" }}
      >
        {items.length === 0 ? (
          <h1 style={{ textAlign: "center" }}>Your Favorite Is Empty</h1>
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
                    <th style={{ textAlign: "center" }} scope="col"></th>
                    <th style={{ textAlign: "center" }} scope="col">
                      REMOVE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(
                    (
                      { img, productId, name, unitPrice, qty, ...rest },
                      index
                    ) => (
                      <tr key={index}>
                        <td style={{ width: "44%", textAlign: "center" }}>
                          <ItemInFavourite
                            img={img}
                            index={index}
                            productId={productId}
                            name={name}
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
                          <ThemeProvider theme={theme}>
                            <Button
                              variant="outlined"
                              color="neutral"
                              disabled={qty < 1}
                              onClick={(e) => addToCart(e, index)}
                            >
                              Add to Cart
                            </Button>
                          </ThemeProvider>
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                        >
                          <Tooltip title="Remove from Favourite">
                            <IconButton
                              sx={{ p: "10px" }}
                              variant="outlined"
                              onClick={(event) =>
                                removeFavItem(customerId, productId)
                              }
                            >
                              <DeleteOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            <ItemAdded
              modalShow={modalShow}
              setModalShow={setModalShow}
              item={addedItem}
              qty={addedItem.qty}
            />
          </>
        )}
      </div>
    </>
  );
}
