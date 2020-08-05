import React, { Component } from "react";

import axios from "axios";
import { Card, Form, InputGroup, Button, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

import { API_BASE_URL } from "../constants";

export class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      currentPage: 1,
      itemsPerPage: 8,
    };
  }

  componentDidMount() {
    if (this.props.match.params.department) {
      this.findItemByDepartment();
    } else if (this.props.match.params.search) {
      this.findItemBySearch();
    } else {
      this.findAllItems();
    }
  }

  findAllItems() {
    axios
      .get(`${API_BASE_URL}/product`)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ item: data });
      });
  }

  findItemByDepartment() {
    axios
      .get(
        `${API_BASE_URL}/product/department=${this.props.match.params.department}`
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({ item: data });
      });
  }

  findItemBySearch() {
    axios
      .get(`${API_BASE_URL}/product/search=${this.props.match.params.search}`)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ item: data });
      });
  }

  aname = (a, b) => {
    const nameA = a.productName.toUpperCase();
    const nameB = b.productName.toUpperCase();

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  };

  aprice = (a, b) => {
    const nameA = a.unitPrice;
    const nameB = b.unitPrice;

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  };

  sortItem = (event) => {
    switch (event.target.value) {
      case "aname":
        this.state.item.sort(this.aname);
        break;
      case "dname":
        this.state.item.reverse(this.aname);
        break;
      case "aprice":
        this.state.item.sort(this.aprice);
        break;
      case "dprice":
        this.state.item.reverse(this.acate);
        break;
      default:
        this.state.item.sort(this.aname);
    }
    this.setState({ currentPage: 1 });
  };

  firstPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({ currentPage: 1 });
    }
  };

  prevPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  };

  nextPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.item.length / this.state.itemsPerPage)
    ) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
    }
  };

  lastPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.item.length / this.state.itemsPerPage)
    ) {
      this.setState({
        currentPage: Math.ceil(
          this.state.item.length / this.state.itemsPerPage
        ),
      });
    }
  };

  render() {
    const { item, currentPage, itemsPerPage } = this.state;
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = item.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(item.length / itemsPerPage);

    return (
      <div style={{ paddingBottom: "100px" }}>
        {this.props.match.params.department ? (
          <div className="m-auto" style={{ width: "70%" }}>
            <a href="/index">All</a>
            <span>{">"}</span>
            <span>{this.props.match.params.department}</span>
          </div>
        ) : null}
        {this.props.match.params.search ? (
          <div className="m-auto" style={{ width: "70%" }}>
            <a href="/index">All</a>
            <span>{">"}</span>
            <span>Search: </span>
            <span>{this.props.match.params.search}</span>
          </div>
        ) : null}

        <Form inline className="float-right">
          <div className="form-group ">
            <label>Sort By</label>
            <select
              className="form-control"
              id="Sorting"
              value={this.state.value}
              onChange={this.sortItem}
            >
              <option value="aname">Name Ascending</option>
              <option value="dname">Name Descending</option>
              <option value="aprice">Price Ascending</option>
              <option value="dprice">Price Descending</option>
            </select>
          </div>
        </Form>
        <br />
        <br />
        <div
          className="row text-center d-flex justify-content-around m-auto"
          style={{ width: "90%" }}
        >
          {currentItems.map((item) => (
            <Card
              className="col-lg-4 m-3"
              key={item.productId}
              style={{ maxWidth: "15rem", height: "18rem" }}
            >
              <Card.Img
                variant="top"
                src={item.img}
                style={{ maxHeight: "70%", maxWidth: "15rem" }}
              />
              <Card.Body>
                <Card.Title>
                  <Link to={`/item?id=${item.productId}`}>
                    {item.productName}
                  </Link>
                </Card.Title>
                <Card.Text>${item.unitPrice}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
        <div style={{ float: "left" }}>
          Showing Page {currentPage} of {totalPages}
        </div>
        <div style={{ float: "right" }}>
          <InputGroup size="sm">
            <InputGroup.Prepend>
              <Button
                type="button"
                variant="outline-info"
                disable={currentPage === 1 ? true : false}
                onClick={this.firstPage}
              >
                First
              </Button>
              <Button
                type="button"
                variant="outline-info"
                disable={currentPage === 1 ? true : false}
                onClick={this.prevPage}
              >
                Prev
              </Button>
            </InputGroup.Prepend>
            <FormControl
              className="text-center"
              style={{ width: "50px" }}
              name="currentPage"
              value={currentPage}
              onChange={(event) =>
                this.setState({
                  [event.target.name]: parseInt(event.target.value),
                })
              }
            />
            <InputGroup.Append>
              <Button
                type="button"
                variant="outline-info"
                disable={currentPage === totalPages ? true : false}
                onClick={this.nextPage}
              >
                Next
              </Button>
              <Button
                type="button"
                variant="outline-info"
                disable={currentPage === totalPages ? true : false}
                onClick={this.lastPage}
              >
                Last
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </div>
    );
  }
}

export default ItemList;
