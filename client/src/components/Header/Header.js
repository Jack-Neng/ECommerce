import React, { useState, useCallback } from "react";

import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  FormControl,
  Modal,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

import AccountMenu from "./AccountMenu";
import "./Header.css";
import Logout from "./Logout";

const CustomizedTextField = styled(TextField)`
  border: "none";
`;

export default function Header({ isAuthenticated, currentUser, itemsInCart }) {
  const navigate = useNavigate();
  const handleOnClick = useCallback(
    (link) => navigate(link, { replace: true }),
    [navigate]
  );

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [logoutAction, setLogoutAction] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Search menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const performLogout = () => {
    sessionStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("CUSTOMER_ID");
    localStorage.removeItem("CART_ID");
  };

  return (
    <div>
      <Navbar
        className="d-flex justify-content-between"
        bg="dark"
        variant="dark"
      >
        <div className="d-flex justify-content-between">
          <Navbar.Brand href="/browse">E-Commerce</Navbar.Brand>
        </div>

        <Paper
          style={{ width: "400px" }}
          className="searchBar"
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            sx={{ p: "10px" }}
            aria-label="menu"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="search-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
              },
            }}
            transformOrigin={{ horizontal: "left", vertical: "top" }}
            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          >
            <MenuItem>Clothes</MenuItem>
            <MenuItem>Electronics</MenuItem>
            <MenuItem>Grocery</MenuItem>
            <MenuItem>Home</MenuItem>
            <MenuItem>Sports</MenuItem>
          </Menu>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.keyCode == 13) {
                e.preventDefault();
                handleOnClick(`/browse?search=${search}`);
              }
            }}
            placeholder="Search"
            inputProps={{ "aria-label": "search item" }}
          />
          <Link to={`/browse?search=${search}`}>
            <IconButton sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Link>
        </Paper>

        <Nav>
          {/* <IconButton onClick={() => setShowSearch(true)}>
            <SearchIcon className="HeaderButton" />
          </IconButton> */}
          {isAuthenticated ? (
            <AccountMenu
              currentUser={currentUser}
              setLogoutAction={setLogoutAction}
            />
          ) : (
            <IconButton onClick={() => handleOnClick("/signin")}>
              <PersonIcon className="HeaderButton" />
            </IconButton>
          )}
          <IconButton onClick={() => handleOnClick("/cart")}>
            <Badge color="primary" badgeContent={itemsInCart.length}>
              <ShoppingCartIcon className="HeaderButton" />
            </Badge>
          </IconButton>
        </Nav>
      </Navbar>
      <Logout
        open={logoutAction}
        setOpen={setLogoutAction}
        performLogout={performLogout}
      />
    </div>
  );
}
