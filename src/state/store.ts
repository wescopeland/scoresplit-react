import { configureStore } from "@reduxjs/toolkit";

import { config } from "./config/config.slice";
import { currentRun } from "./current-run/current-run.slice";

export const store = configureStore({
  reducer: {
    config: config.reducer,
    currentRun: currentRun.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
