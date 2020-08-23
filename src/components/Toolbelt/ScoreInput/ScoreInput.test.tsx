import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import * as ReactReduxModule from "react-redux";

import { ScoreInput } from "./ScoreInput";
import { currentRunActions } from "../../../state/current-run/current-run.slice";

describe("Component: ScoreInput", () => {
  it("renders without crashing", () => {
    // ARRANGE
    const mockUseDispatch = jest.fn();
    spyOn(ReactReduxModule, "useDispatch").and.returnValue(mockUseDispatch);

    const { container } = render(<ScoreInput />);

    // ASSERT
    expect(container).toBeTruthy();
  });

  it("can add a shorthand score", async () => {
    // ARRANGE
    const mockUseDispatch = jest.fn();
    spyOn(ReactReduxModule, "useDispatch").and.returnValue(mockUseDispatch);

    render(<ScoreInput />);

    const inputField = screen.getByRole("textbox");

    // ACT
    await userEvent.type(inputField, "100");
    fireEvent.keyDown(inputField, { key: "Enter", code: "Enter" });

    // ASSERT
    expect(mockUseDispatch).toHaveBeenCalledWith(
      currentRunActions.addScore(100000)
    );
  });

  it("can add a death", async () => {
    // ARRANGE
    const mockUseDispatch = jest.fn();
    spyOn(ReactReduxModule, "useDispatch").and.returnValue(mockUseDispatch);

    render(<ScoreInput />);

    const inputField = screen.getByRole("textbox");

    // ACT
    await userEvent.type(inputField, "2d");
    fireEvent.keyDown(inputField, { key: "Enter", code: "Enter" });

    // ASSERT
    expect(mockUseDispatch).toHaveBeenCalledWith(
      currentRunActions.addDeath(2000)
    );
  });

  it("can add a bonus", async () => {
    // ARRANGE
    const mockUseDispatch = jest.fn();
    spyOn(ReactReduxModule, "useDispatch").and.returnValue(mockUseDispatch);

    render(<ScoreInput />);

    const inputField = screen.getByRole("textbox");

    // ACT
    await userEvent.type(inputField, "100b");
    fireEvent.keyDown(inputField, { key: "Enter", code: "Enter" });

    // ASSERT
    expect(mockUseDispatch).toHaveBeenCalledWith(
      currentRunActions.addBonus(100000)
    );
  });
});
