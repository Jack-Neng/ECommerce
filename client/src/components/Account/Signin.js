import React, { useState } from "react";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../Util/Theme";
import { login } from "../Util/Requests";
import "./Account.css";

export default function Signin({ cartId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [missingInputs, setMissingInputs] = useState([]);
  const [loginError, setLoginError] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
    const customer = { email: email, password: password, cartId: cartId };
    const { success, data } = await login(customer);
    if (success) {
      sessionStorage.setItem("ACCESS_TOKEN", data.accessToken);
      localStorage.setItem("CUSTOMER_ID", data.customerId);
      localStorage.setItem("CART_ID", data.cartId);
      window.location.replace("/index");
    } else {
      setLoginError(true);
    }
  };

  return (
    <div
      style={{
        width: "40%",
        margin: "auto",
        marginTop: "100px",
        marginBottom: "100px",
      }}
    >
      {(error || loginError) && (
        <div className="InputError">
          <ul style={{ margin: "10px" }}>
            {missingInputs.map((field, i) => (
              <li key={`missing-field-${i}`}>{field} cant' be blank.</li>
            ))}
            {loginError && (
              <li>Invalid email or password. Please try again.</li>
            )}
          </ul>
        </div>
      )}
      <form style={{ margin: "10px 0" }}>
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
            onKeyDown={(e) => {
              if (e.keyCode == 13) {
                e.preventDefault();
                handleLogin(e);
              }
            }}
            placeholder="Email"
          />
        </FormControl>
        <FormControl
          className="TextInput"
          sx={{ m: "10px 0", width: "100%" }}
          variant="outlined"
        >
          <OutlinedInput
            error={error && password === ""}
            sx={{ height: 38 }}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(e) => {
              if (e.keyCode == 13) {
                e.preventDefault();
                handleLogin(e);
              }
            }}
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
      </form>
      <ThemeProvider theme={theme}>
        <Button variant="contained" color="neutral" onClick={handleLogin}>
          Sign In
        </Button>
      </ThemeProvider>
      <div>
        <span>Don't have an account? </span>
        <a href="/join">Join Now</a>
      </div>
    </div>
  );
}
