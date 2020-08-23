import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CurrentRunState } from "./models/current-run-state.model";

export const initialState: CurrentRunState = {
  levelScores: [],
  deaths: [],
  bonuses: [],
  subtractionCache: 0
};

export const currentRun = createSlice({
  name: "currentGame",
  initialState,
  reducers: {
    addBonus: (state, action: PayloadAction<number>) => {
      state.bonuses = [...state.bonuses, action.payload];
    },

    addDeath: (state, action: PayloadAction<number>) => {
      state.subtractionCache += action.payload;

      state.deaths = [...state.deaths, action.payload];
    },

    addScore: (state, action: PayloadAction<number>) => {
      if (state.start && state.previousScore) {
        // With a 100,000 start and a 150,000 level end,
        // we want to input 50,000 into the array.
        // For this reason, we keep a previousScore cached value.
        const newLevelScore =
          action.payload - state.previousScore - state.subtractionCache;

        state.levelScores = [...state.levelScores, newLevelScore];
      } else {
        state.start = action.payload;
      }

      state.previousScore = action.payload;
      state.subtractionCache = 0;
    },

    reset: (state, action: PayloadAction<undefined>) => {
      return initialState;
    }
  }
});

export const currentRunActions = { ...currentRun.actions };
