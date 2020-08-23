import * as selectors from "./current-run.selectors";
import { CurrentRunState } from "./models/current-run-state.model";
import { RootState } from "../store";

describe("Selector: selectBonusPoints", () => {
  it("returns 0 if there are no bonuses", () => {
    // ARRANGE
    const mockCurrentRunValue: CurrentRunState = {
      levelScores: [],
      deaths: [],
      bonuses: [],
      subtractionCache: 0
    };

    const mockState: Partial<RootState> = {
      currentRun: mockCurrentRunValue
    };

    // ACT
    const selected = selectors.selectBonusPoints(mockState as RootState);

    // ASSERT
    expect(selected).toEqual(0);
  });

  it("returns the sum of bonuses if they are present", () => {
    // ARRANGE
    const mockCurrentRunValue: CurrentRunState = {
      levelScores: [],
      deaths: [],
      bonuses: [100, 200],
      subtractionCache: 0
    };

    const mockState: Partial<RootState> = {
      currentRun: mockCurrentRunValue
    };

    // ACT
    const selected = selectors.selectBonusPoints(mockState as RootState);

    // ASSERT
    expect(selected).toEqual(300);
  });
});

describe("Selector: selectDeathPoints", () => {
  it("returns 0 if there are no deaths", () => {
    // ARRANGE
    const mockCurrentRunValue: CurrentRunState = {
      levelScores: [],
      deaths: [],
      bonuses: [],
      subtractionCache: 0
    };

    const mockState: Partial<RootState> = {
      currentRun: mockCurrentRunValue
    };

    // ACT
    const selected = selectors.selectDeathPoints(mockState as RootState);

    // ASSERT
    expect(selected).toEqual(0);
  });

  it("returns the sum of deaths if they are present", () => {
    // ARRANGE
    const mockCurrentRunValue: CurrentRunState = {
      levelScores: [],
      deaths: [100, 200],
      bonuses: [],
      subtractionCache: 0
    };

    const mockState: Partial<RootState> = {
      currentRun: mockCurrentRunValue
    };

    // ACT
    const selected = selectors.selectDeathPoints(mockState as RootState);

    // ASSERT
    expect(selected).toEqual(300);
  });
});

describe("Selector: selectPreviousLevel", () => {
  it("returns undefined if there is no previous level", () => {
    // ARRANGE
    const mockCurrentRunValue: CurrentRunState = {
      levelScores: [],
      deaths: [],
      bonuses: [],
      subtractionCache: 0
    };

    const mockState: Partial<RootState> = {
      currentRun: mockCurrentRunValue
    };

    // ACT
    const selected = selectors.selectPreviousLevel(mockState as RootState);

    // ASSERT
    expect(selected).toBeUndefined();
  });

  it("returns the previous level if it is present", () => {
    // ARRANGE
    const mockCurrentRunValue: CurrentRunState = {
      levelScores: [100, 200, 300],
      deaths: [],
      bonuses: [],
      subtractionCache: 0
    };

    const mockState: Partial<RootState> = {
      currentRun: mockCurrentRunValue
    };

    // ACT
    const selected = selectors.selectPreviousLevel(mockState as RootState);

    // ASSERT
    expect(selected).toEqual(300);
  });
});

describe("Selector: selectLevelAverage", () => {
  it("returns undefined if there are no levels to average", () => {
    // ARRANGE
    const mockCurrentRunValue: CurrentRunState = {
      levelScores: [],
      deaths: [],
      bonuses: [],
      subtractionCache: 0
    };

    const mockState: Partial<RootState> = {
      currentRun: mockCurrentRunValue
    };

    // ACT
    const selected = selectors.selectLevelAverage(mockState as RootState);

    // ASSERT
    expect(selected).toBeUndefined();
  });

  it("returns the average of the level scores", () => {
    // ARRANGE
    const mockCurrentRunValue: CurrentRunState = {
      levelScores: [1001, 2005], // these don't end with a 0 so we induce rounding
      deaths: [],
      bonuses: [],
      subtractionCache: 0
    };

    const mockState: Partial<RootState> = {
      currentRun: mockCurrentRunValue
    };

    // ACT
    const selected = selectors.selectLevelAverage(mockState as RootState);

    // ASSERT
    expect(selected).toEqual(1500);
  });
});

describe("Selector: selectPace", () => {
  it("returns undefined if there is no start", () => {
    // ARRANGE
    const mockCurrentRunValue: CurrentRunState = {
      levelScores: [1000, 2000],
      deaths: [],
      bonuses: [],
      subtractionCache: 0
    };

    const mockState: Partial<RootState> = {
      currentRun: mockCurrentRunValue,
      config: {
        repeatingLevelCount: 17
      }
    };

    // ACT
    const selected = selectors.selectPace(mockState as RootState);

    // ASSERT
    expect(selected).toBeUndefined();
  });

  it("returns undefined if there is no level average", () => {
    // ARRANGE
    const mockCurrentRunValue: CurrentRunState = {
      levelScores: [],
      deaths: [],
      bonuses: [],
      start: 130000,
      subtractionCache: 0
    };

    const mockState: Partial<RootState> = {
      currentRun: mockCurrentRunValue,
      config: {
        repeatingLevelCount: 17
      }
    };

    // ACT
    const selected = selectors.selectPace(mockState as RootState);

    // ASSERT
    expect(selected).toBeUndefined();
  });

  it("correctly calculates pace", () => {
    // ARRANGE
    const mockCurrentRunValue: CurrentRunState = {
      levelScores: [63000, 67000, 59000, 64000, 58500, 60000], // 61916
      deaths: [2000, 12000, 3000],
      bonuses: [],
      start: 130000,
      subtractionCache: 0
    };

    const mockState: Partial<RootState> = {
      currentRun: mockCurrentRunValue,
      config: {
        repeatingLevelCount: 17
      }
    };

    // ACT
    const selected = selectors.selectPace(mockState as RootState);

    // ASSERT
    expect(selected).toEqual(1199300);
  });
});
