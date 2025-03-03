// index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { DarkModeProvider } from "./Portfoilo/context/DarkModeContext";

const CLIENT_ID =
  "505405282471-r6mpu3r3ib1ce06mlks7rhl2b7bodhq9.apps.googleusercontent.com";

ReactDOM.render(
  <DarkModeProvider>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </DarkModeProvider>,
  document.getElementById("root")
);
