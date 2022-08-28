import * as React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../Util/Theme";

export default function Logout({ open, setOpen, performLogout }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogContent>
          <div className="StepContent" style={{ textAlign: "center" }}>
            <Typography sx={{ fontSize: 20 }}>Are you sure,</Typography>
            <Typography sx={{ fontSize: 20 }}>you want to sign out?</Typography>
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
            <Button variant="outlined" color="neutral" onClick={handleClose}>
              Cancel
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Link to={`/history`} style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="neutral"
                onClick={() => {
                  performLogout();
                  handleClose();
                  performLogout();
                  window.location.reload(false);
                }}
                autoFocus
              >
                Log out
              </Button>
            </Link>
          </Box>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
