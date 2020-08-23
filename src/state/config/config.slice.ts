import { createSlice } from "@reduxjs/toolkit";

import { ConfigState } from "./models/config-state.model";

export const initialState: ConfigState = {
  repeatingLevelCount: 17 // Donkey Kong has 17 repeating levels.
};

export const config = createSlice({
  name: "config",
  initialState,
  reducers: {}
});

export const configActions = { ...config.actions };
