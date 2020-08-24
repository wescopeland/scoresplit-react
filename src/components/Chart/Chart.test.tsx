import { render } from "@testing-library/react";
import React from "react";

import { Chart } from "./Chart";

describe("Component: Chart", () => {
  it("renders without crashing", () => {
    // ARRANGE
    const { container } = render(<Chart levelScoresCount={0} />);

    // ASSERT
    expect(container).toBeTruthy();
  });
});
