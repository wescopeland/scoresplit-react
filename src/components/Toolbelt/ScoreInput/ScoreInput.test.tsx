import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import { ScoreInput } from "./ScoreInput";

describe("Component: ScoreInput", () => {
  it("renders without crashing", () => {
    // ARRANGE
    const mockAddDeath = jest.fn();
    const mockAddBonus = jest.fn();
    const mockAddScore = jest.fn();

    const { container } = render(
      <ScoreInput
        addDeath={mockAddDeath as any}
        addBonus={mockAddBonus as any}
        addScore={mockAddScore as any}
      />
    );

    // ASSERT
    expect(container).toBeTruthy();
  });

  it("can add a shorthand score", async () => {
    // ARRANGE
    const mockAddDeath = jest.fn();
    const mockAddBonus = jest.fn();
    const mockAddScore = jest.fn();

    render(
      <ScoreInput
        addDeath={mockAddDeath as any}
        addBonus={mockAddBonus as any}
        addScore={mockAddScore as any}
      />
    );

    const inputField = screen.getByRole("textbox");

    // ACT
    await userEvent.type(inputField, "100");
    fireEvent.keyDown(inputField, { key: "Enter", code: "Enter" });

    // ASSERT
    expect(mockAddScore).toHaveBeenCalledWith(100000);
  });

  it("can add a death", async () => {
    // ARRANGE
    const mockAddDeath = jest.fn();
    const mockAddBonus = jest.fn();
    const mockAddScore = jest.fn();

    render(
      <ScoreInput
        addDeath={mockAddDeath as any}
        addBonus={mockAddBonus as any}
        addScore={mockAddScore as any}
      />
    );

    const inputField = screen.getByRole("textbox");

    // ACT
    await userEvent.type(inputField, "2d");
    fireEvent.keyDown(inputField, { key: "Enter", code: "Enter" });

    // ASSERT
    expect(mockAddDeath).toHaveBeenCalledWith(2000);
  });

  it("can add a bonus", async () => {
    // ARRANGE
    const mockAddDeath = jest.fn();
    const mockAddBonus = jest.fn();
    const mockAddScore = jest.fn();

    render(
      <ScoreInput
        addDeath={mockAddDeath as any}
        addBonus={mockAddBonus as any}
        addScore={mockAddScore as any}
      />
    );

    const inputField = screen.getByRole("textbox");

    // ACT
    await userEvent.type(inputField, "100b");
    fireEvent.keyDown(inputField, { key: "Enter", code: "Enter" });

    // ASSERT
    expect(mockAddBonus).toHaveBeenCalledWith(100000);
  });
});
