import React, { useEffect, useState } from "react";

import { Accordion, Card, Form } from "react-bootstrap";
import Divider from "@mui/material/Divider";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../Util/Theme";

import PaymentMethods from "./PaymentMethods";
import OrderPlaced from "./OrderPlaced";
import { login, addNewOrder } from "../Util/Requests";
import "./Checkout.css";

export default function Checkout({
  isAuthenticated,
  currentUser,
  itemsInCart,
  setItemsInCart,
}) {
  // steppers
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Welcome", "Shipping", "Payment"];

  // Dialog
  const [open, setOpen] = useState(false);

  // inputs
  const [guestCheck, setGuestCheck] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [missingInputs, setMissingInputs] = useState([]);
  const [loginError, setLoginError] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("Canada");
  const [phone, setPhone] = useState("");
  const [shipping, setShipping] = useState(0);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    loadUser();
  }, [isAuthenticated]);

  useEffect(() => {
    if (country == "Canada") setShipping(0);
    else if (country == "US") setShipping(10);
    else if (country == "Global") setShipping(20);
  }, [country]);

  const perform_logout = () => {
    sessionStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("CUSTOMER_ID");
  };

  const loadUser = () => {
    console.log("Loading User");
    if (isAuthenticated) {
      setEmail(currentUser.email);
      setFirstName(currentUser.firstName);
      setLastName(currentUser.lastName);
      setAddress(currentUser.address);
      setCity(currentUser.city);
      setState(currentUser.state);
      setPostalCode(currentUser.postalCode);
      setCountry(currentUser.country ? currentUser.country : "Canada");
      setPhone(currentUser.phone);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError(false);
    let missingFields = [];
    if (email === "") missingFields = [...missingFields, "Email"];
    if (password === "") missingFields = [...missingFields, "Password"];
    setMissingInputs(missingFields);
    if (missingFields.length > 0) {
      setError(true);
      return;
    }
    setError(false);
    const customer = { email: email, password: password };
    const { success, data } = await login(customer);
    if (success) {
      sessionStorage.setItem("ACCESS_TOKEN", data.accessToken);
      localStorage.setItem("CUSTOMER_ID", data.customerId);
      window.location.replace("/index");
    } else {
      setLoginError(true);
    }
  };

  // Steppers
  const handleNext = async () => {
    if (activeStep + 1 == steps.length) {
      placeOrder();
      handleClickOpen();
    } else setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Place order
  const placeOrder = async () => {
    const totalPrice = (
      shipping +
      itemsInCart
        .map((item) => item.unitPrice * item.qty)
        .reduce((a, b) => a + b, 0) *
        1.12
    ).toFixed(2);
    const shipment = {
      customerId: isAuthenticated ? localStorage.getItem("CUSTOMER_ID") : "",
      firstName,
      lastName,
      address,
      city,
      state,
      postalCode,
      country,
      phone,
      email,
      cartId: localStorage.getItem("CART_ID"),
      totalPrice,
    };
    const data = await addNewOrder(shipment);
    setItemsInCart([]);
    return data;
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="m-auto">
          <div className="GridControl">
            <div className="GridInfo">
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<NavigateNextIcon fontSize="small" />}
              >
                <Link style={{ color: "inherit" }} to="/cart">
                  Cart
                </Link>
                <Typography key="3" color="text.primary">
                  <span>Checkout</span>
                </Typography>
              </Breadcrumbs>
            </div>
          </div>
        </div>
        <div style={{ paddingBottom: "200px", display: "flex" }}>
          <div className="BillingInfo">
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  return (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep < steps.length && (
                <>
                  <div>
                    {activeStep == 0 ? (
                      <div className="StepContent">
                        {!isAuthenticated ? (
                          <div>
                            <div>
                              <div>
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="Check out as Guest"
                                  checked={guestCheck}
                                  onChange={(e) => {
                                    setGuestCheck(e.target.value);
                                  }}
                                />
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="Sign In"
                                  checked={!guestCheck}
                                  onChange={(e) => {
                                    setGuestCheck(!e.target.value);
                                  }}
                                />
                              </div>
                              <FormControl
                                className="TextInput"
                                sx={{ m: "10px 0", width: "100%" }}
                                variant="outlined"
                              >
                                <OutlinedInput
                                  error={error && email === ""}
                                  sx={{ height: 38 }}
                                  value={email}
                                  onChange={(event) =>
                                    setEmail(event.target.value)
                                  }
                                  placeholder="Email"
                                />
                              </FormControl>
                            </div>
                            {guestCheck ? null : (
                              <div>
                                <div>
                                  <FormControl
                                    className="TextInput"
                                    sx={{ m: "10px 0", width: "100%" }}
                                    variant="outlined"
                                  >
                                    <OutlinedInput
                                      error={error && password === ""}
                                      sx={{ height: 38 }}
                                      value={password}
                                      onChange={(event) =>
                                        setPassword(event.target.value)
                                      }
                                      placeholder="Password"
                                      type={showPassword ? "text" : "password"}
                                      endAdornment={
                                        <InputAdornment position="end">
                                          <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                              handleMouseDownPassword
                                            }
                                            edge="end"
                                          >
                                            {showPassword ? (
                                              <VisibilityOff />
                                            ) : (
                                              <Visibility />
                                            )}
                                          </IconButton>
                                        </InputAdornment>
                                      }
                                    />
                                  </FormControl>
                                </div>
                                <Button
                                  variant="contained"
                                  color="neutral"
                                  onClick={handleLogin}
                                >
                                  Sign In
                                </Button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div>
                            <p>Check out as {currentUser.firstName}</p>
                            <Button
                              variant="contained"
                              color="neutral"
                              onClick={(event) => {
                                event.preventDefault();
                                perform_logout();
                                window.location.reload(false);
                              }}
                            >
                              Log Out
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : activeStep == 1 ? (
                      <div className="StepContent">
                        <FormControl
                          className="TextInput"
                          sx={{ m: "10px 0", width: "100%" }}
                          variant="outlined"
                        >
                          <OutlinedInput
                            error={error && firstName === ""}
                            sx={{ height: 38 }}
                            value={firstName}
                            onChange={(event) =>
                              setFirstName(event.target.value)
                            }
                            placeholder="First Name"
                          />
                        </FormControl>
                        <FormControl
                          className="TextInput"
                          sx={{ m: "10px 0", width: "100%" }}
                          variant="outlined"
                        >
                          <OutlinedInput
                            error={error && lastName === ""}
                            sx={{ height: 38 }}
                            value={lastName}
                            onChange={(event) =>
                              setLastName(event.target.value)
                            }
                            placeholder="Last Name"
                          />
                        </FormControl>
                        <FormControl
                          className="TextInput"
                          sx={{ m: "10px 0", width: "100%" }}
                          variant="outlined"
                        >
                          <OutlinedInput
                            error={error && address === ""}
                            sx={{ height: 38 }}
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            placeholder="Address"
                          />
                        </FormControl>
                        <FormControl
                          className="TextInput"
                          sx={{ m: "10px 0", width: "100%" }}
                          variant="outlined"
                        >
                          <OutlinedInput
                            error={error && city === ""}
                            sx={{ height: 38 }}
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                            placeholder="City"
                          />
                        </FormControl>
                        <FormControl
                          className="TextInput"
                          sx={{ m: "10px 0", width: "100%" }}
                          variant="outlined"
                        >
                          <OutlinedInput
                            error={error && state === ""}
                            sx={{ height: 38 }}
                            value={state}
                            onChange={(event) => setState(event.target.value)}
                            placeholder="State"
                          />
                        </FormControl>
                        <FormControl
                          className="TextInput"
                          sx={{ m: "10px 0", width: "100%" }}
                          variant="outlined"
                        >
                          <OutlinedInput
                            error={error && postalCode === ""}
                            sx={{ height: 38 }}
                            value={postalCode}
                            onChange={(event) =>
                              setPostalCode(event.target.value)
                            }
                            placeholder="Postal Code"
                          />
                        </FormControl>
                        <FormControl
                          className="TextInput"
                          sx={{ m: "10px 0", width: "100%" }}
                          size="small"
                        >
                          <Select
                            className="SortSelect"
                            value={country}
                            onChange={(event) => setCountry(event.target.value)}
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem value={"Canada"}>Canada</MenuItem>
                            <MenuItem value={"US"}>US</MenuItem>
                            <MenuItem value={"Global"}>Global</MenuItem>
                          </Select>
                        </FormControl>
                        <FormControl
                          className="TextInput"
                          sx={{ m: "10px 0", width: "100%" }}
                          variant="outlined"
                        >
                          <OutlinedInput
                            sx={{ height: 38 }}
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            placeholder="Phone"
                          />
                        </FormControl>
                      </div>
                    ) : (
                      <div className="StepContent">
                        <PaymentMethods />
                      </div>
                    )}
                  </div>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      pt: 2,
                      margin: "0 10%",
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="neutral"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />

                    <Button
                      variant="contained"
                      color="neutral"
                      onClick={handleNext}
                    >
                      {activeStep === steps.length - 1 ? "Place Order" : "Next"}
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </div>
          <div className="PaymentInfo">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td>Subtotal</td>
                  <td style={{ textAlign: "end" }}>
                    $
                    {itemsInCart
                      .map((item) => item.unitPrice * item.qty)
                      .reduce((a, b) => a + b, 0)}
                  </td>
                </tr>
                <tr>
                  <td>Shipping</td>
                  <td style={{ textAlign: "end" }}>${shipping}</td>
                </tr>
                <tr>
                  <td>Tax</td>
                  <td style={{ textAlign: "end" }}>
                    $
                    {(
                      itemsInCart
                        .map((item) => item.unitPrice * item.qty)
                        .reduce((a, b) => a + b, 0) * 0.12
                    ).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
            <Divider variant="middle" />
            <table
              className="table table-borderless"
              style={{ fontSize: 20, fontWeight: "bold" }}
            >
              <tbody>
                <tr>
                  <td>Total</td>
                  <td style={{ textAlign: "end" }}>
                    $
                    {(
                      shipping +
                      itemsInCart
                        .map((item) => item.unitPrice * item.qty)
                        .reduce((a, b) => a + b, 0) *
                        1.12
                    ).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </ThemeProvider>
      <OrderPlaced open={open} setOpen={setOpen} />
    </>
  );
}
