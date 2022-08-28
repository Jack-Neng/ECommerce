import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function ItemInFavourite({ name, productId, img, description }) {
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
      </Box>
    </Card>
  );
}
