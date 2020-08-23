import React from "react";
import { connect } from "react-redux";
import { Box, Button } from "@material-ui/core";

import { ScoreInput } from "./ScoreInput";
import { currentRunActions } from "../../state/current-run/current-run.slice";

class Toolbelt extends React.Component<typeof mapDispatchToProps> {
  constructor(props: typeof mapDispatchToProps) {
    super(props);

    this.handleResetClick = this.handleResetClick.bind(this);
  }

  handleResetClick() {
    this.props.reset();
  }

  render() {
    return (
      <>
        <Box padding={2}>
          <ScoreInput />
        </Box>

        <Box paddingLeft={2} paddingRight={2}>
          <Button variant="contained" onClick={this.handleResetClick}>
            Reset
          </Button>
        </Box>
      </>
    );
  }
}

const mapDispatchToProps = {
  reset: currentRunActions.reset
};

export default connect(null, mapDispatchToProps)(Toolbelt);
