import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "assets/theme/theme.js";

// plugins styles from node_modules
import "react-perfect-scrollbar/dist/css/styles.css";
import "@fullcalendar/common/main.min.css";
import "@fullcalendar/daygrid/main.min.css";
import "quill/dist/quill.core.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// plugins styles downloaded
import "assets/plugins/nucleo/css/nucleo.css";

// core styles
import "assets/scss/argon-dashboard-pro-material-ui.scss?v1.0.0";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <BrowserRouter>
      <Switch>
        {/* <Route path="/index" render={(props) => <Index {...props} />} /> */}
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Redirect from="*" to="/admin/key-set" />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>,
  document.querySelector("#root")
);
