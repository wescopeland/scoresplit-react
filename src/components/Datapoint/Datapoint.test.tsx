import { render, screen } from "@testing-library/react";
import React from "react";

import Datapoint from "./Datapoint";

jest.mock("./Difference", () => ({
  Difference: ({ value }: { value?: number }) => <span>{value}</span>
}));

describe("Component: Datapoint", () => {
  it("renders without crashing", () => {
    // ARRANGE
    const { container } = render(<Datapoint label="Mock Datapoint" />);

    // ASSERT
    expect(container).toBeTruthy();
  });

  it("displays a label and a value", () => {
    // ARRANGE
    render(<Datapoint label="Mock Datapoint" value={100000} />);

    // ASSERT
    expect(screen.getByText("Mock Datapoint")).toBeVisible();
    expect(screen.getByText("100,000")).toBeVisible();
  });

  it("displays a metric for the value difference", () => {
    // ARRANGE
    const { rerender } = render(
      <Datapoint label="Mock Datapoint" value={100000} />
    );

    // ACT
    rerender(<Datapoint label="Mock Datapoint" value={150000} />);

    // ASSERT
    expect(screen.getByText("150,000")).toBeVisible();
    expect(screen.getByText("50000")).toBeVisible();
  });

  it("wipes the difference on a reset", () => {
    // ARRANGE
    const { rerender } = render(
      <Datapoint label="Mock Datapoint" value={100000} />
    );

    // ACT
    rerender(<Datapoint label="Mock Datapoint" value={150000} />);
    rerender(<Datapoint label="Mock Datapoint" value={undefined} />);

    // ASSERT
    expect(screen.getByText("–")).toBeVisible();
    expect(screen.queryByText("50000")).toBeNull();
  });
});
