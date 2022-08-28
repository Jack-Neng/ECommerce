import React, { useEffect, useState } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ItemList from "./components/ItemList/ItemList";
import Item from "./components/Item";
import Cart from "./components/Cart/Cart";
import Signin from "./components/Account/Signin";
import Join from "./components/Account/Join";
import Checkout from "./components/Checkout/Checkout";
import Profile from "./components/Profile";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import Favourite from "./components/Favourite/Favourite";

import {
  getAllItemsInCart,
  getCartId,
  getCurrentUser,
} from "./components/Util/Requests";

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customerId, setCustomerId] = useState(
    localStorage.getItem("CUSTOMER_ID")
  );
  const [cartId, setCartId] = useState(localStorage.getItem("CART_ID"));
  const [itemsInCart, setItemsInCart] = useState([]);

  const location = useLocation();

  console.log("pathname", location.pathname);
  console.log("search", location.search);

  const assignCart = async () => {
    if (!cartId) {
      const data = await getCartId();
      setCartId(data);
      localStorage.setItem("CART_ID", data);
    }
  };

  const findAllItemsInCart = async () => {
    const data = await getAllItemsInCart(cartId);
    setItemsInCart(data);
  };

  const loadUser = async () => {
    const data = await getCurrentUser(
      customerId,
      sessionStorage.getItem("ACCESS_TOKEN")
    );
    if (!data || !Object.keys(data).length) {
      setIsAuthenticated(false);
    } else {
      setCurrentUser(data);
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    console.log("cart id: ", localStorage.getItem("CART_ID"));
    console.log("customer id: ", localStorage.getItem("CUSTOMER_ID"));
    console.log("token: ", sessionStorage.getItem("ACCESS_TOKEN"));
    loadUser();
    assignCart();
    findAllItemsInCart();
  }, []);

  return (
    <>
      <Header
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        itemsInCart={itemsInCart}
      />
      <Routes>
        <Route path="/">
          <Route index element={<ItemList />} />
          <Route path="browse" element={<ItemList />}>
            <Route path=":department" element={<ItemList />} />
          </Route>
          <Route path="search" element={<ItemList />}>
            <Route path=":search" element={<ItemList />} />
          </Route>
          <Route
            path="item"
            element={
              <Item
                cartId={cartId}
                itemsInCart={itemsInCart}
                setItemsInCart={setItemsInCart}
              />
            }
          />

          <Route
            path="cart"
            element={
              <Cart
                isAuthenticated={isAuthenticated}
                itemsInCart={itemsInCart}
                setItemsInCart={setItemsInCart}
              />
            }
          />
          <Route
            path="checkout"
            element={
              <Checkout
                isAuthenticated={isAuthenticated}
                currentUser={currentUser}
                itemsInCart={itemsInCart}
                setItemsInCart={setItemsInCart}
              />
            }
          />
          <Route
            path="signin"
            element={
              isAuthenticated ? <ItemList /> : <Signin cartId={cartId} />
            }
          />
          <Route
            path="join"
            element={isAuthenticated ? <ItemList /> : <Join cartId={cartId} />}
          />

          <Route
            path="profile"
            element={
              <Profile
                isAuthenticated={isAuthenticated}
                currentUser={currentUser}
              />
            }
          />
          <Route path="history" exact element={<OrderHistory />} />
          <Route
            path="favourite"
            element={
              <Favourite
                cartId={cartId}
                itemsInCart={itemsInCart}
                setItemsInCart={setItemsInCart}
              />
            }
          />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}
