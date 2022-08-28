import * as React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Order.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../Util/Theme";

export default function Order({ order }) {
  const { items, createDate, shipment, totalPrice, ...rest } = order;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleOver = (open) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(open);
  };

  return (
    <Card className="OrderCart">
      <Popper open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              style={{
                minWidth: 250,
                padding: "10px 20px",
                border: "1px lightgray solid",
              }}
            >
              <p>
                <b>
                  {shipment.firstName} {shipment.lastName}
                </b>
              </p>
              <div>
                {shipment.address}
                <br />
                {shipment.city} {shipment.state}
                <br />
                {shipment.postalCode}
                <br />
                {shipment.country}
              </div>
            </Paper>
          </Fade>
        )}
      </Popper>
      <ThemeProvider theme={theme}>
        <CardContent className="OrderHeader">
          <div style={{ marginRight: "20px" }}>
            <Typography variant="h6">Order Placed</Typography>
            {moment(createDate).format("MMM DD, YYYY")}
          </div>
          <div
            style={{ marginRight: "auto" }}
            onMouseEnter={handleOver(true)}
            onMouseLeave={handleOver(false)}
          >
            <Typography variant="h6">Shipment</Typography>
            {shipment.firstName} {shipment.lastName}
          </div>
          <div style={{ textAlign: "right", marginRight: "20px" }}>
            <Typography variant="h6">Total</Typography>${totalPrice}
          </div>
        </CardContent>
        {items.map((item, i) => (
          <Card
            sx={{
              minWidth: 275,
              display: "flex",
              boxShadow: "none",
              borderRadius: 0,
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 151, height: 150 }}
              image={item.img}
              alt="Live from space album cover"
            />
            <CardContent className="OrderItem">
              <Link to={`/item?id=${item.productId}`}>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
              </Link>
              <Typography variant="body2" color="text.secondary">
                Quantity: {item.qty}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(item.shippedDate) < new Date()
                  ? "Delivered: "
                  : "Expected Delivery: "}
                {moment(item.shippedDate).format("MMM DD, YYYY")}
              </Typography>
            </CardContent>
            <CardContent className="OrderAction">
              <Button
                sx={{ width: "100%" }}
                variant="outlined"
                color="neutral"
                size="small"
              >
                Buy Again
              </Button>
              <Button
                sx={{ width: "100%" }}
                variant="outlined"
                color="neutral"
                size="small"
              >
                Return
              </Button>
              <Button
                sx={{ width: "100%" }}
                variant="outlined"
                color="neutral"
                size="small"
              >
                Write review
              </Button>
            </CardContent>
          </Card>
        ))}
      </ThemeProvider>
    </Card>
  );
}
