import React from "react";
import { useDispatch } from "react-redux";
import { Box, Button } from "@material-ui/core";

import { ScoreInput } from "./ScoreInput";
import { currentRunActions } from "../../state/current-run/current-run.slice";

export const Toolbelt = () => {
  const dispatch = useDispatch();

  const handleResetClick = () => {
    dispatch(currentRunActions.reset());
  };

  return (
    <>
      <Box padding={2}>
        <ScoreInput />
      </Box>

      <Box paddingLeft={2} paddingRight={2}>
        <Button variant="contained" onClick={handleResetClick}>
          Reset
        </Button>
      </Box>
    </>
  );
};
