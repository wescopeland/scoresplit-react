import {
  currentRun,
  currentRunActions,
  initialState
} from "./current-run.slice";

describe("Slice: currentRun", () => {
  it("exists", () => {
    // ASSERT
    expect(currentRun).toBeDefined();
  });

  describe("Action: addBonus", () => {
    it("appends a given bonus to the bonuses array", () => {
      // ARRANGE
      const mockBonus = 130000;

      // ACT
      const newState = currentRun.reducer(
        initialState,
        currentRunActions.addBonus(mockBonus)
      );

      // ASSERT
      expect(newState.bonuses).toHaveLength(1);
      expect(newState.bonuses[0]).toEqual(130000);
    });
  });

  describe("Action: addDeath", () => {
    it("appends a given death to the deaths array", () => {
      // ARRANGE
      const mockDeath = 2000;

      // ACT
      const newState = currentRun.reducer(
        initialState,
        currentRunActions.addDeath(mockDeath)
      );

      // ASSERT
      expect(newState.deaths).toHaveLength(1);
      expect(newState.deaths[0]).toEqual(2000);
    });
  });

  describe("Action: addScore", () => {
    it("sets the start if there is no start for the current run", () => {
      // ARRANGE
      const mockScore = 140000;

      // ACT
      const newState = currentRun.reducer(
        initialState,
        currentRunActions.addScore(mockScore)
      );

      // ASSERT
      expect(newState.start).toEqual(140000);
      expect(newState.levelScores).toEqual([]);
    });

    it("adds the score to the level scores array if there is already a start", () => {
      // ARRANGE
      const mockStart = 140000;
      const mockScore = 170000;

      // ACT
      let newState = currentRun.reducer(
        initialState,
        currentRunActions.addScore(mockStart)
      );

      newState = currentRun.reducer(
        newState,
        currentRunActions.addScore(mockScore)
      );

      // ASSERT
      expect(newState.start).toEqual(mockStart);
      expect(newState.levelScores).toHaveLength(1);
      expect(newState.levelScores[0]).toEqual(30000);
    });

    it("respects when deaths occur on a level for a given score", () => {
      // ARRANGE
      const mockStart = 100000;
      const mockDeath = 2000;
      const mockScore = 152000; // This is a 50,000 point level with the death.

      // ACT
      let newState = currentRun.reducer(
        initialState,
        currentRunActions.addScore(mockStart)
      );

      newState = currentRun.reducer(
        newState,
        currentRunActions.addDeath(mockDeath)
      );

      newState = currentRun.reducer(
        newState,
        currentRunActions.addScore(mockScore)
      );

      // ASSERT
      expect(newState.levelScores).toHaveLength(1);
      expect(newState.levelScores[0]).toEqual(50000);
    });
  });

  describe("Action: reset", () => {
    it("resets the store to the initial value", () => {
      // ACT
      let newState = currentRun.reducer(
        initialState,
        currentRunActions.addScore(130000)
      );

      newState = currentRun.reducer(newState, currentRunActions.reset());

      // ASSERT
      expect(newState).toEqual(initialState);
    });
  });
});
