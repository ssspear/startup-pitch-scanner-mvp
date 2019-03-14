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

function OutlinedTextFields(props) {
  return (
    <form noValidate autoComplete="off">
      <TextField
        required
        multiline
        fullWidth
        id="outlined-multiline-flexible-required"
        label="Pitch goes here"
        rows="4"
        rowsMax="10"
        margin="normal"
        variant="outlined"
        value={props.value}
        onChange={props.onChange}
      />
    </form>
  );
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OutlinedTextFields);
