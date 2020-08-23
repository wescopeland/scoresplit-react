import React from "react";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";

import { currentRunActions } from "../../../state/current-run/current-run.slice";

class ScoreInput extends React.Component<typeof mapDispatchToProps> {
  state = {
    inputValue: ""
  };

  constructor(props: typeof mapDispatchToProps) {
    super(props);

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleKeyPress(event: any) {
    if (event.key === "Enter") {
      if (this.state.inputValue.includes("d")) {
        const death = Number(this.state.inputValue.split("d")[0]) * 1000;
        this.props.addDeath(death);
      } else if (this.state.inputValue.includes("b")) {
        const bonus = Number(this.state.inputValue.split("b")[0]) * 1000;
        this.props.addBonus(bonus);
      } else {
        const score = Number(this.state.inputValue) * 1000;
        this.props.addScore(score);
      }

      this.setState({
        inputValue: ""
      });
    }
  }

  handleInputChange(event: any) {
    this.setState({
      inputValue: event.target.value
    });
  }

  render() {
    return (
      <TextField
        variant="filled"
        label="Score"
        fullWidth={true}
        value={this.state.inputValue}
        onChange={this.handleInputChange}
        onKeyDown={this.handleKeyPress}
      />
    );
  }
}

const mapDispatchToProps = {
  addDeath: currentRunActions.addDeath,
  addBonus: currentRunActions.addBonus,
  addScore: currentRunActions.addScore
};

export default connect(null, mapDispatchToProps)(ScoreInput);
