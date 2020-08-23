import React from "react";
import { render, screen } from "@testing-library/react";

import { Difference } from "./Difference";

describe("Component: Difference", () => {
  it("renders without crashing", () => {
    // ARRANGE
    const { container } = render(<Difference value={100} />);

    // ASSERT
    expect(container).toBeTruthy();
  });

  it("displays the correct string for a positive value", () => {
    // ARRANGE
    render(<Difference value={1000} />);

    // ASSERT
    expect(screen.getByText("(+1,000)")).toBeVisible();
  });

  it("displays the correct string for a negative value", () => {
    // ARRANGE
    render(<Difference value={-1000} />);

    // ASSERT
    expect(screen.getByText("(-1,000)")).toBeVisible();
  });
});
