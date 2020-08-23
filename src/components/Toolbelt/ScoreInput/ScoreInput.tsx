import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField } from "@material-ui/core";

import { currentRunActions } from "../../../state/current-run/current-run.slice";

export const ScoreInput = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      if (inputValue.includes("d")) {
        const death = Number(inputValue.split("d")[0]) * 1000;
        dispatch(currentRunActions.addDeath(death));
      } else if (inputValue.includes("b")) {
        const bonus = Number(inputValue.split("b")[0]) * 1000;
        dispatch(currentRunActions.addBonus(bonus));
      } else {
        const score = Number(inputValue) * 1000;
        dispatch(currentRunActions.addScore(score));
      }

      setInputValue("");
    }
  };

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  return (
    <TextField
      variant="filled"
      label="Score"
      fullWidth={true}
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleKeyPress}
    />
  );
};
