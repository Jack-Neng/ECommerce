import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";

import Department from "../Header/Department.js";
import {
  getAllItems,
  getItemByDepartment,
  getItemBySearch,
} from "../Util/Requests.js";

import "./ItemList.css";

export default function ItemList() {
  const sortOptions = ["aname", "dname", "aprice", "dprice"];
  let { department } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  let search = searchParams.get("search");
  const [item, setItem] = useState([]);
  const [value, setValue] = useState();
  const [sort, setSort] = useState(sortOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    if (department) {
      findItemByDepartment();
    } else if (search) {
      findItemBySearch();
    } else {
      findAllItems();
    }
  }, [department, search]);

  const findAllItems = async () => {
    const data = await getAllItems();
    setItem(data);
  };

  const findItemByDepartment = async () => {
    const data = await getItemByDepartment(department);
    setItem(data);
  };

  const findItemBySearch = async () => {
    const data = await getItemBySearch(search);
    setItem(data);
  };

  const aname = (a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  };

  const aprice = (a, b) => {
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

  const sortItem = (event) => {
    setSort(event.target.value);
    switch (event.target.value) {
      case "aname":
        item.sort(aname);
        break;
      case "dname":
        item.reverse(aname);
        break;
      case "aprice":
        item.sort(aprice);
        break;
      case "dprice":
        item.reverse(aprice);
        break;
      default:
        item.sort(aname);
    }
    setItem(item);
    setCurrentPage(1);
  };

  const firstPage = () => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(item.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const lastPage = () => {
    if (currentPage < Math.ceil(item.length / itemsPerPage)) {
      setCurrentPage(Math.ceil(item.length / itemsPerPage));
    }
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = item.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(item.length / itemsPerPage);

  return (
    <div style={{ paddingBottom: "100px" }}>
      <Department />
      <div className="GridControl">
        <div className="GridInfo">
          <Typography
            style={{ margin: "auto 30px" }}
            key="3"
            color="text.primary"
          >
            {item.length <= 1000 ? item.length : "1000+"} results
          </Typography>
          {department ? (
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<NavigateNextIcon fontSize="small" />}
            >
              <Link style={{ color: "inherit" }} to="/browse">
                All
              </Link>
              <Typography key="3" color="text.primary">
                {department}
              </Typography>
            </Breadcrumbs>
          ) : null}
          {search ? (
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<NavigateNextIcon fontSize="small" />}
            >
              <Link style={{ color: "inherit" }} to="/browse">
                All
              </Link>
              <Typography key="3" color="text.primary">
                <span>Search: </span>
                <span>{search}</span>
              </Typography>
            </Breadcrumbs>
          ) : null}
        </div>

        <div className="Sorting">
          <Typography>Sort By</Typography>
          <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
            <Select
              className="SortSelect"
              value={sort}
              onChange={sortItem}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={"aname"}>Name Ascending</MenuItem>
              <MenuItem value={"dname"}>Name Descending</MenuItem>
              <MenuItem value={"aprice"}>Price Ascending</MenuItem>
              <MenuItem value={"dprice"}>Price Descending</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div style={{ padding: "0 10%" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 12, md: 12 }}
        >
          {currentItems.map((item, index) => (
            <Grid item xs={2} sm={3} md={3} key={index}>
              <Card
                className="col-lg-4 m-3"
                key={item.productId}
                style={{ maxWidth: "15rem", height: "18rem", border: 0 }}
              >
                <Card.Img
                  variant="top"
                  src={item.img}
                  style={{ maxHeight: "70%", maxWidth: "15rem" }}
                />
                <Card.Body>
                  <Card.Title>
                    <Link to={`/item?id=${item.productId}`}>{item.name}</Link>
                  </Card.Title>
                  <Card.Text>${item.unitPrice}</Card.Text>
                </Card.Body>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <div className="GridControl">
        <div>{/* Showing Page {currentPage} of {totalPages} */}</div>
        <div>
          <Pagination
            count={totalPages}
            shape="rounded"
            showFirstButton
            showLastButton
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
          />
        </div>
      </div>
    </div>
  );
}
