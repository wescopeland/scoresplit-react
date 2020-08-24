import React from "react";
import { useSelector } from "react-redux";
import { Box, styled } from "@material-ui/core";

import { Chart } from "./components/Chart";
import { Datapoint } from "./components/Datapoint";
import { Toolbelt } from "./components/Toolbelt";
import { RootState } from "./state/store";
import {
  selectDeathPoints,
  selectPace,
  selectPreviousLevel,
  selectLevelAverage
} from "./state/current-run/current-run.selectors";

const StyledBox = styled(Box)({
  width: 400,
  height: 300,
  position: "absolute",
  top: 32,
  right: 32,
  border: "1px solid #eee",
  backgroundColor: "black"
});

export const App = () => {
  const start = useSelector((state: RootState) => state.currentRun.start);
  const pace = useSelector(selectPace);
  const previousLevel = useSelector(selectPreviousLevel);
  const levelAverage = useSelector(selectLevelAverage);
  const deathPoints = useSelector(selectDeathPoints);
  const levelScoresCount = useSelector(
    (state: RootState) => state.currentRun.levelScores.length
  );

  return (
    <>
      <Datapoint label="Estimated Final Score (L22)" value={pace} />
      <Datapoint label="Previous Level" value={previousLevel} />
      <Datapoint label="Level Average (L5 - L21)" value={levelAverage} />
      <Datapoint label="Start Score (L1 - L4)" value={start} />
      <Datapoint label="Death Points" value={deathPoints} />

      <StyledBox>
        <Chart currentPace={pace} levelScoresCount={levelScoresCount} />
      </StyledBox>

      <Toolbelt />
    </>
  );
};
