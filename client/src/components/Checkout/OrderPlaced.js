import * as React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../Util/Theme";
import "./Checkout.css";

export default function OrderPlaced({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={() => {
          return;
        }}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogContent>
          <div className="StepContent" style={{ textAlign: "center" }}>
            <TaskAltIcon sx={{ fontSize: 80 }} />
            <Typography sx={{ mt: 2, mb: 1, fontSize: 40 }}>
              Order Placed
            </Typography>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Thank you so much for your order.
            </Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 2,
              width: "100%",
            }}
          >
            <Link to={`/browse`} style={{ textDecoration: "none" }}>
              <Button variant="outlined" color="neutral" onClick={handleClose}>
                Continue Shopping
              </Button>
            </Link>
            <Box sx={{ flex: "1 1 auto" }} />

            <Link to={`/history`} style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="neutral"
                onClick={handleClose}
                autoFocus
              >
                View Order
              </Button>
            </Link>
          </Box>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
