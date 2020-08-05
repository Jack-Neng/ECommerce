import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ItemList from "./components/ItemList";
import Item from "./components/Item";
import Cart from "./components/Cart";
import Signin from "./components/Signin";
import Join from "./components/Join";
import Checkout from "./components/Checkout";
import Profile from "./components/Profile";
import OrderHistory from "./components/OrderHistory";

import { API_BASE_URL } from "./constants";

import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      isAuthenticated: false,
      customerId: localStorage.getItem("CUSTOMER_ID"),
      cartId: localStorage.getItem("CART_ID"),
    };
  }

  componentDidMount() {
    console.log("cart id: ", localStorage.getItem("CART_ID"));
    console.log("customer id: ", localStorage.getItem("CUSTOMER_ID"));
    console.log("token: ", localStorage.getItem("ACCESS_TOKEN"));
    this.loadUser();
    this.assignCart();
  }

  assignCart = () => {
    if (this.state.cartId === null) {
      axios
        .get(`${API_BASE_URL}/cart/getId`)
        .then((response) => response.data)
        .then((data) => {
          this.setState({ cartId: Math.max(...data) + 1 });
          localStorage.setItem("CART_ID", Math.max(...data) + 1);
        });
    }
  };

  loadUser = () => {
    axios
      .get(`${API_BASE_URL}/customer/${this.state.customerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        this.setState({ currentUser: data, isAuthenticated: true });
      })
      .catch((error) => console.log("Not logged in"));
  };

  render() {
    return (
      <Router>
        <Header
          isAuthenticated={this.state.isAuthenticated}
          currentUser={this.state.currentUser}
        />

        <Switch>
          <Route exact path="/" exact component={ItemList} />
          <Route
            exact
            path="/department/:department"
            exact
            component={ItemList}
          />
          <Route exact path="/search/:search" exact component={ItemList} />
          <Route path="/item" exact component={Item} />
          <Route path="/cart" exact component={Cart} />
          <Route
            path="/signin"
            exact
            component={this.state.isAuthenticated ? ItemList : Signin}
          />
          <Route
            path="/join"
            exact
            component={this.state.isAuthenticated ? ItemList : Join}
          />
          <Route
            path="/checkout"
            render={(props) => (
              <Checkout
                isAuthenticated={this.state.isAuthenticated}
                currentUser={this.state.currentUser}
                {...props}
              />
            )}
          />
          <Route
            path="/profile"
            render={(props) => (
              <Profile
                isAuthenticated={this.state.isAuthenticated}
                currentUser={this.state.currentUser}
                {...props}
              />
            )}
          />
          <Route path="/history" exact component={OrderHistory} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
