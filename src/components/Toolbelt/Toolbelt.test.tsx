import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import * as ReactReduxModule from "react-redux";

import { Toolbelt } from "./Toolbelt";
import { currentRunActions } from "../../state/current-run/current-run.slice";

describe("Component: Toolbelt", () => {
  it("renders without crashing", () => {
    // ARRANGE
    const { container } = render(<Toolbelt />);

    // ASSERT
    expect(container).toBeTruthy();
  });

  it("calls the reset action when the reset button is clicked", async () => {
    // ARRANGE
    const mockUseDispatch = jest.fn();
    spyOn(ReactReduxModule, "useDispatch").and.returnValue(mockUseDispatch);

    render(<Toolbelt />);

    // ACT
    await userEvent.click(screen.getByText(/reset/i));

    // ASSERT
    expect(mockUseDispatch).toHaveBeenCalledWith(currentRunActions.reset());
  });
});
