import React from "react";
import { connect } from "react-redux";

import { Datapoint } from "./components/Datapoint";
import { Toolbelt } from "./components/Toolbelt";
import { RootState } from "./state/store";
import {
  selectDeathPoints,
  selectPace,
  selectPreviousLevel,
  selectLevelAverage
} from "./state/current-run/current-run.selectors";

class App extends React.Component<ReturnType<typeof mapStateToProps>> {
  render() {
    const {
      start,
      pace,
      previousLevel,
      levelAverage,
      deathPoints
    } = this.props;

    return (
      <>
        <Datapoint label="Estimated Final Score (L22)" value={pace} />
        <Datapoint label="Previous Level" value={previousLevel} />
        <Datapoint label="Level Average (L5 - L21)" value={levelAverage} />
        <Datapoint label="Start Score (L1 - L4)" value={start} />
        <Datapoint label="Death Points" value={deathPoints} />

        <Toolbelt />
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  start: state.currentRun.start,
  pace: selectPace(state),
  previousLevel: selectPreviousLevel(state),
  deathPoints: selectDeathPoints(state),
  levelAverage: selectLevelAverage(state)
});

export default connect(mapStateToProps)(App);
