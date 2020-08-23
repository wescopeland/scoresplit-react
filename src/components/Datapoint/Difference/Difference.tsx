import React from "react";
import { Box } from "@material-ui/core";

interface DifferenceProps {
  value: number;
}

export const Difference = ({ value }: DifferenceProps) => {
  const plusOrMinus = value >= 0 ? "+" : "-";

  return (
    <Box component="span" color={value >= 0 ? "#00e676" : "#ff1744"}>
      ({plusOrMinus}
      {Math.abs(value).toLocaleString()})
    </Box>
  );
};
