import { RootState } from "../store";

export const selectRepeatingLevelCount = (state: RootState) =>
  state.config.repeatingLevelCount;
