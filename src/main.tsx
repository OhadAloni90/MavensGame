import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {  ThemeProvider } from "@mui/material/styles";
import theme from "./themes";
import './main.css';


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
