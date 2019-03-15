import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app.jsx";
import { Grid } from "@material-ui/core";

const AppWrapper = () => (
  <Grid container={true}>
    <Grid item={true} xs={12}>
      <App />
    </Grid>
  </Grid>
);

ReactDOM.render(<AppWrapper />, document.getElementById("root"));
