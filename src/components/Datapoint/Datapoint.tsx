import React from "react";
import {
  Box,
  Divider,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";

import { Difference } from "./Difference";

interface DatapointProps {
  label: string;
  value?: number;
}

class Datapoint extends React.Component<DatapointProps & WithStyles> {
  state = {
    difference: undefined
  };

  componentDidUpdate(prevProps: DatapointProps & WithStyles) {
    if (prevProps.value !== this.props.value) {
      if (prevProps.value && this.props.value) {
        const difference = this.props.value - prevProps.value;
        this.setState({ difference });
      } else if (!this.props.value) {
        // When we reset the calculator, we also should reset the difference.
        this.setState({ difference: undefined });
      }
    }
  }

  render() {
    const { label, value, classes } = this.props;

    return (
      <>
        <Box padding={2}>
          <Typography className={classes.label}>{label}</Typography>
          <Typography>
            {value ? value.toLocaleString() : "–"}
            {this.state.difference && (
              <Box component="span" display="inline-block" marginLeft={1}>
                <Difference value={this.state.difference ?? 0} />
              </Box>
            )}
          </Typography>
        </Box>

        <Divider />
      </>
    );
  }
}

const styles = {
  label: {
    fontWeight: 700
  }
};

export default withStyles(styles)(Datapoint);
