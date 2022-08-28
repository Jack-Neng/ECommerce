import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./Util/Theme";

import { getCurrentUser, updateCustomer } from "./Util/Requests";

export default function Profile() {
  const [customerId, setCustomerId] = useState(
    localStorage.getItem("CUSTOMER_ID")
  );
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
  const [checked, setChecked] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [changeProfile, setChangeProfile] = useState(false);
  const [error, setError] = useState(false);
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");

  useEffect(() => {
    loadProfile();
  }, []);

  const onEnter = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      // createAccount(e);
    }
  };

  const loadProfile = async () => {
    const data = await getCurrentUser(customerId, accessToken);
    setEmail(data.email);
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setAddress(data.address);
    setCity(data.city);
    setState(data.state);
    setPostalCode(data.postalCode);
    setCountry(data.country);
    setPhone(data.phone);
  };

  const updateCustomerProfile = async () => {
    const customer = {
      firstName,
      lastName,
      address,
      city,
      state,
      postalCode,
      country,
      phone,
      email,
    };
    const data = await updateCustomer(customer, accessToken);
  };

  return (
    <div
      style={{
        width: "50%",
        margin: "auto",
        marginBottom: "200px",
        padding: "20px 0",
      }}
    >
      <ThemeProvider theme={theme}>
        <h3>My Profile</h3>
        <div>
          <h5>Personal Information</h5>
          <div>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
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
              </Grid>
              <Grid item xs={6}>
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
              </Grid>
            </Grid>

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
                sx={{ height: 38 }}
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                onKeyDown={onEnter}
                placeholder="Phone"
              />
            </FormControl>
          </div>
        </div>

        <div>
          <h5>Address</h5>
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
                placeholder="Street"
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
            </FormControl>
          </div>
          <div>
            <Button
              variant="contained"
              color="neutral"
              style={{ float: "right" }}
              type="submit"
              onClick={updateCustomerProfile}
            >
              Update Profile
            </Button>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
