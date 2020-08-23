import React from "react";
import { withStyles, WithStyles } from "@material-ui/core";

interface DifferenceProps {
  value: number;
}

class Difference extends React.PureComponent<DifferenceProps & WithStyles> {
  render() {
    const { value, classes } = this.props;

    const colorClass = value >= 0 ? classes.positive : classes.negative;
    const plusOrMinus = value >= 0 ? "+" : "-";

    return (
      <span className={colorClass}>
        ({plusOrMinus}
        {Math.abs(value).toLocaleString()})
      </span>
    );
  }
}

const styles = {
  positive: {
    color: "#00e676"
  },
  negative: {
    color: "#ff1744"
  }
};

export default withStyles(styles)(Difference);
