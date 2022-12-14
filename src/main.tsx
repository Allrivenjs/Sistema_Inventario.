import React from 'react'
import ReactDOM from 'react-dom/client'
import {CssBaseline, ThemeProvider} from "@mui/material";
import {App} from "./router/App";
import {BrowserRouter} from "react-router-dom";
import {darkTheme} from "./themes/darkTheme";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <BrowserRouter>
              <ThemeProvider theme={darkTheme}>
                  <CssBaseline />
                  {<App />}
              </ThemeProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
