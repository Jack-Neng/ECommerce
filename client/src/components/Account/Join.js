import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../Util/Theme";
import { register } from "../Util/Requests";
import "./Account.css";

export default function Join() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordC, setPasswordC] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [error, setError] = useState(false);
  const [missingInputs, setMissingInputs] = useState([]);
  const [passwordError, setPasswordError] = useState(false);
  const [registerError, setRegisterError] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const createAccount = async (e) => {
    e.preventDefault();
    let missingFields = [];
    if (email === "") missingFields = [...missingFields, "Email"];
    if (firstName === "") missingFields = [...missingFields, "Fist name"];
    if (lastName === "") missingFields = [...missingFields, "Last name"];
    if (password === "") missingFields = [...missingFields, "Password"];
    if (passwordC === "")
      missingFields = [...missingFields, "Confirm Password"];
    if (!checked) {
      if (address === "") missingFields = [...missingFields, "Address"];
      if (city === "") missingFields = [...missingFields, "City"];
      if (state === "") missingFields = [...missingFields, "State"];
      if (postalCode === "") missingFields = [...missingFields, "Postal code"];
      if (country === "") missingFields = [...missingFields, "Country"];
    }
    setMissingInputs(missingFields);
    setPasswordError(password !== passwordC);
    setRegisterError(false);
    if (missingFields.length > 0 || password !== passwordC) setError(true);
    else {
      setError(false);
      const customer = {
        email,
        firstName,
        lastName,
        address,
        city,
        state,
        postalCode,
        country,
        phone,
        password,
        cartId: localStorage.getItem("CART_ID"),
      };

      const { success, data } = await register(customer);
      if (success) {
        sessionStorage.setItem("ACCESS_TOKEN", data.accessToken);
        localStorage.setItem("CUSTOMER_ID", data.customerId);
        localStorage.setItem("CART_ID", data.cartId);
        window.location.replace("/index");
      } else {
        setRegisterError(true);
      }
    }
  };

  const onEnter = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      createAccount(e);
    }
  };

  return (
    <div
      style={{
        width: "40%",
        margin: "auto",
        marginTop: "50px",
        paddingBottom: "100px",
      }}
    >
      {error && (
        <div className="InputError">
          <ul style={{ margin: "10px" }}>
            {missingInputs.map((field, i) => (
              <li key={`missing-field-${i}`}>{field} cant' be blank.</li>
            ))}
            {passwordError && <li>Passwords don't match.</li>}
            {registerError && <li>Email has already been registered.</li>}
          </ul>
        </div>
      )}
      {registerError && (
        <div className="InputError">
          <ul style={{ margin: "10px" }}>
            <li>Email has already been registered.</li>
          </ul>
        </div>
      )}
      <div>
        <FormControl
          className="TextInput"
          sx={{ m: "10px 0", width: "100%" }}
          variant="outlined"
        >
          <OutlinedInput
            error={error && firstName === ""}
            sx={{ height: 38 }}
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            onKeyDown={onEnter}
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
            onChange={(event) => setLastName(event.target.value)}
            onKeyDown={onEnter}
            placeholder="Last Name"
          />
        </FormControl>
        <FormControl
          className="TextInput"
          sx={{ m: "10px 0", width: "100%" }}
          variant="outlined"
        >
          <OutlinedInput
            error={error && email === ""}
            sx={{ height: 38 }}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onKeyDown={onEnter}
            placeholder="Email"
          />
        </FormControl>
        <FormControl
          className="TextInput"
          sx={{ m: "10px 0", width: "100%" }}
          variant="outlined"
        >
          <OutlinedInput
            error={(error && password === "") || passwordError}
            sx={{ height: 38 }}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={onEnter}
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  tabIndex="-1"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl
          className="TextInput"
          sx={{ m: "10px 0", width: "100%" }}
          variant="outlined"
        >
          <OutlinedInput
            error={(error && passwordC === "") || passwordError}
            sx={{ height: 38 }}
            value={passwordC}
            onChange={(event) => setPasswordC(event.target.value)}
            onKeyDown={onEnter}
            placeholder="Confirm Password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  tabIndex="-1"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <ThemeProvider theme={theme}>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
                onKeyDown={onEnter}
                color="neutral"
              />
            }
            label="Complete Billing Address Later"
          />
        </ThemeProvider>

        {checked === false ? (
          <div>
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
                onKeyDown={onEnter}
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
                onKeyDown={onEnter}
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
                onKeyDown={onEnter}
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
                onChange={(event) => setPostalCode(event.target.value)}
                onKeyDown={onEnter}
                placeholder="Postal Code"
              />
            </FormControl>
            <FormControl
              className="TextInput"
              sx={{ m: "10px 0", width: "100%" }}
              variant="outlined"
            >
              <OutlinedInput
                error={error && country === ""}
                sx={{ height: 38 }}
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                onKeyDown={onEnter}
                placeholder="Country"
              />
            </FormControl>{" "}
            <FormControl
              className="TextInput"
              sx={{ m: "10px 0", width: "100%" }}
              variant="outlined"
            >
              <OutlinedInput
                sx={{ height: 38 }}
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                onKeyDown={onEnter}
                placeholder="Phone"
              />
            </FormControl>
          </div>
        ) : null}
      </div>
      <ThemeProvider theme={theme}>
        <Button variant="contained" color="neutral" onClick={createAccount}>
          Create Account
        </Button>
      </ThemeProvider>
      <div>
        <span>Already have an account? </span>
        <a href="/signin">Login</a>
      </div>
      <Modal show={modalShow}>
        <Modal.Body>
          Welcome {firstName}!<br /> Thanks for Joining, Please Sign In and
          Continue!
        </Modal.Body>
        <Modal.Footer>
          <Button href="/signin" className="button">
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
