import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

const divStyles = {
  display: "flex",
  justifyContent: "center",
  paddingTop: "50px"
};

function SubmitButton(props) {
  return (
    <div>
      <div style={divStyles}>
        <Button
          variant="outlined"
          size="large"
          type="submit"
          onClick={props.onClick}
        >
          Let's get rich
        </Button>
      </div>
    </div>
  );
}

SubmitButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SubmitButton);
