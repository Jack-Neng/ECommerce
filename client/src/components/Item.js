import React, { useEffect, useState, useCallback } from "react";
import Department from "../components/Header/Department";
import ItemAdded from "./Popup/ItemAdded";

import { InputGroup, Form, Modal } from "react-bootstrap";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { ThemeProvider } from "@mui/material/styles";
import { Button, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import {
  getItemById,
  addItemToCart,
  updateItemInCart,
} from "./Util/Requests.js";
import { theme } from "./Util/Theme";

export default function Item({ cartId, itemsInCart, setItemsInCart }) {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [item, setItem] = useState([]);
  const [qty, setQty] = useState(1);
  const [modalShow, setModalShow] = useState(false);

  const findItemById = async () => {
    const data = await getItemById(id);
    setItem(data);
  };

  useEffect(() => {
    findItemById();
  }, []);

  const addToCart = async (event) => {
    event.preventDefault();
    const currentItems = [...itemsInCart];
    const itemInCart = currentItems.find((item) => item.productId == id);
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
        productId: item.productId,
      };
      const data = await addItemToCart(newItemInCart);
      setItemsInCart([newItemInCart, ...itemsInCart]);
      setModalShow(true);
    }
  };

  return (
    <>
      <Department />
      <div className="m-auto" style={{ width: "70%" }}>
        <div className="GridControl">
          <div className="GridInfo">
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<NavigateNextIcon fontSize="small" />}
            >
              <Link style={{ color: "inherit" }} to="/browse">
                All
              </Link>
              <Link
                style={{ color: "inherit" }}
                to={`/browse/${item.department}`}
              >
                {item.department}
              </Link>
              <Typography key="3" color="text.primary">
                <span>{item.name}</span>
              </Typography>
            </Breadcrumbs>
          </div>
        </div>
        <div className="row mt-4 ">
          <div className="col" style={{ textAlign: "center" }}>
            <img
              src={item.img}
              style={{ maxWidth: "100%", maxHeight: "500px" }}
            />
          </div>
          <div className="col align-self-center">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <Stack direction="row" spacing={1}>
              {item.size && (
                <Chip label={"Size: " + item.size} variant="outlined" />
              )}
              {item.colour && (
                <Chip label={"Colour: " + item.colour} variant="outlined" />
              )}
              {item.gender && (
                <Chip label={"Gender: " + item.gender} variant="outlined" />
              )}
              {item.type && <Chip label={item.type} variant="outlined" />}
              {item.brand && <Chip label={item.brand} variant="outlined" />}
              {item.location && (
                <Chip label={item.location} variant="outlined" />
              )}
            </Stack>
            <p>${item.unitPrice}</p>
            <Form onSubmit={addToCart}>
              <Form.Group>
                <div style={{ width: "150px" }}>
                  <InputGroup>
                    <IconButton
                      size="small"
                      variant="outlined"
                      onClick={(event) => (qty <= 1 ? null : setQty(qty - 1))}
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
                          : setQty(parseInt(event.target.value))
                      }
                    />
                    <IconButton
                      size="small"
                      variant="outlined"
                      onClick={(event) => {
                        setQty(qty + 1);
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </InputGroup>
                </div>
              </Form.Group>
              <ThemeProvider theme={theme}>
                <Button variant="outlined" color="neutral" onClick={addToCart}>
                  Add to Cart
                </Button>
              </ThemeProvider>

              <ItemAdded
                modalShow={modalShow}
                setModalShow={setModalShow}
                item={item}
                qty={qty}
              />
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
