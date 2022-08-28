import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { PayPalButton } from "react-paypal-button-v2";
import GooglePayButton from "@google-pay/button-react";
import { ApplePayButton } from "react-apple-pay-button";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import GooglePayImg from "../../dist/img/google-pay.svg";
import ApplePayImg from "../../dist/img/apple-pay.svg";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../Util/Theme";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      props.expanded ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function PaymentMethods() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expanded={expanded === "panel1"}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography>Google Pay</Typography>
            <img src={GooglePayImg} alt="Google Pay" width="50" />
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ margin: "auto", width: "fit-content" }}>
            <GooglePayButton
              environment="TEST"
              paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                  {
                    type: "CARD",
                    parameters: {
                      allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                      allowedCardNetworks: ["MASTERCARD", "VISA"],
                    },
                    tokenizationSpecification: {
                      type: "PAYMENT_GATEWAY",
                      parameters: {
                        gateway: "example",
                        gatewayMerchantId: "exampleGatewayMerchantId",
                      },
                    },
                  },
                ],
                merchantInfo: {
                  merchantId: "12345678901234567890",
                  merchantName: "Demo Merchant",
                },
                transactionInfo: {
                  totalPriceStatus: "FINAL",
                  totalPriceLabel: "Total",
                  totalPrice: "100.00",
                  currencyCode: "USD",
                  countryCode: "US",
                },
              }}
              onLoadPaymentData={(paymentRequest) => {
                console.log("load payment data", paymentRequest);
              }}
            />
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expanded={expanded === "panel2"}
          aria-controls="panel2d-content"
          id="panel2d-header"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography>Apple Pay</Typography>
            <img src={ApplePayImg} alt="Apple Pay" width="50" />
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <ApplePayButton theme="light">{""}</ApplePayButton>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expanded={expanded === "panel3"}
          aria-controls="panel3d-content"
          id="panel3d-header"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography>Credit Card</Typography>
            <CreditCardIcon />
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl
            className="TextInput"
            sx={{ m: "10px 0", width: "100%" }}
            variant="outlined"
          >
            <OutlinedInput sx={{ height: 38 }} placeholder="Card Number" />
          </FormControl>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <FormControl
              className="TextInput"
              sx={{ m: "10px 0", width: "48%" }}
              variant="outlined"
            >
              <OutlinedInput sx={{ height: 38 }} placeholder="Expiry Date" />
            </FormControl>
            <FormControl
              className="TextInput"
              sx={{ m: "10px 0", width: "48%" }}
              variant="outlined"
            >
              <OutlinedInput sx={{ height: 38 }} placeholder="CVV" />
            </FormControl>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
