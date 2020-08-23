import React from "react";
import { render } from "@testing-library/react";

import { App } from "./App";

describe("Component: App", () => {
  it("renders without crashing", () => {
    // ARRANGE
    const { container } = render(<App />);

    // ASSERT
    expect(container).toBeTruthy();
  });
});
