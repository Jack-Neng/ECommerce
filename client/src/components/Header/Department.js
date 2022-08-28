import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link, Outlet } from "react-router-dom";

export default function Department() {
  const pages = ["Clothes", "Electronics", "Grocery", "Home", "Sports"];

  return (
    <div style={{ background: "#343a40" }}>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
        }}
      >
        {pages.map((page) => (
          <Link
            key={page}
            to={`/browse/${page}`}
            style={{ textDecoration: "none" }}
          >
            <Button key={page} sx={{ my: 2, color: "white", display: "block" }}>
              {page}
            </Button>
          </Link>
        ))}
      </Box>
    </div>
  );
}
