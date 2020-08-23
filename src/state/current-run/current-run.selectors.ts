import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { selectRepeatingLevelCount } from "../config/config.selectors";

const selectCurrentRun = (state: RootState) => state.currentRun;

export const selectBonusPoints = createSelector(
  selectCurrentRun,
  ({ bonuses }) => (bonuses.length ? bonuses.reduce((a, b) => a + b) : 0)
);

export const selectDeathPoints = createSelector(
  selectCurrentRun,
  ({ deaths }) => (deaths.length ? deaths.reduce((a, b) => a + b) : 0)
);

export const selectPreviousLevel = createSelector(
  selectCurrentRun,
  ({ levelScores }) =>
    levelScores.length ? levelScores[levelScores.length - 1] : undefined
);

export const selectLevelAverage = createSelector(
  selectCurrentRun,
  ({ levelScores }) => {
    if (!levelScores.length) {
      return undefined;
    }

    const levelAverage =
      levelScores.reduce((a, b) => a + b) / levelScores.length;

    return Math.round(levelAverage / 100) * 100;
  }
);

export const selectPace = createSelector(
  [
    selectCurrentRun,
    selectLevelAverage,
    selectRepeatingLevelCount,
    selectBonusPoints,
    selectDeathPoints
  ],
  ({ start }, levelAverage, repeatingLevelCount, bonusPoints, deathPoints) => {
    if (!start || !levelAverage) {
      return undefined;
    }

    const repeatingLevelAverage = levelAverage * repeatingLevelCount; // 63,000 * 17 -->  1,071,000

    const pace = start + repeatingLevelAverage + bonusPoints + deathPoints;
    return Math.round(pace / 100) * 100;
  }
);
