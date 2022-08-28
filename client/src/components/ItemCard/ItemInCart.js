import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import {
  addItemToFavourite,
  getItemInFavourite,
  deleteItemInFavourite,
} from "../Util/Requests";

export default function ItemInCart({
  isAuthenticated,
  name,
  productId,
  img,
  description,
  index,
  handleDelete,
}) {
  const [favItem, setFavItem] = useState({});
  const [isFav, setIsFav] = useState(false);
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
  const customerId = localStorage.getItem("CUSTOMER_ID");

  const getFavItem = async (customerId, productId) => {
    const data = await getItemInFavourite(customerId, productId, accessToken);
    setFavItem(data);
    if (data) setIsFav(true);
    else setIsFav(false);
  };

  const removeFavItem = async (customerId, productId) => {
    const data = await deleteItemInFavourite(
      customerId,
      productId,
      accessToken
    );
    setIsFav(false);
  };

  const addFavItem = async (customerId, productId) => {
    const data = await addItemToFavourite(
      { customerId, productId },
      accessToken
    );
    setIsFav(true);
  };

  useEffect(() => {
    if (isAuthenticated) getFavItem(customerId, productId);
  }, []);
  return (
    <Card sx={{ minWidth: 275, display: "flex", boxShadow: "none" }}>
      <CardMedia
        component="img"
        sx={{ width: 151, height: 150 }}
        image={img}
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent
          sx={{ textAlign: "left", margin: "auto", padding: "10px" }}
        >
          <Link to={`/item?id=${productId}`}>
            <Typography variant="h6" component="div">
              {name}
            </Typography>
          </Link>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
        <CardActions>
          <Tooltip title="Remove from Cart">
            <IconButton
              sx={{ p: "10px" }}
              variant="outlined"
              onClick={(event) => handleDelete(index)}
            >
              <DeleteOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={
              isAuthenticated
                ? isFav
                  ? "Remove from Favourite"
                  : "Save to Favourite"
                : "Please sign in to save item"
            }
          >
            <IconButton
              sx={{ p: "10px" }}
              variant="outlined"
              onClick={(event) => {
                if (isAuthenticated) {
                  if (!isFav) addFavItem(customerId, productId);
                  else removeFavItem(customerId, productId);
                }
              }}
            >
              {isFav ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
            </IconButton>
          </Tooltip>
        </CardActions>
      </Box>
    </Card>
  );
}
