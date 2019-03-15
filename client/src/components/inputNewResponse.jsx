import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

const divStyles = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  paddingTop: "50px"
};

function NewResponse(props) {
  return (
    <div style={divStyles}>
      <form noValidate autoComplete="off">
        <TextField
          required
          margin="dense"
          id="outlined-flexible-required"
          label="Add a new response"
          rows="1"
          rowsMax="4"
          variant="outlined"
          value={props.value}
          onChange={props.onChange}
        />
      </form>
    </div>
  );
}

NewResponse.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewResponse);
