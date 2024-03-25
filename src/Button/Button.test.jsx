/* eslint-disable no-undef */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Button from "./Button.jsx";

describe("Button component tests", () => {
  test("Renders the button without children", () => {
    render(<Button />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("Renders the button with children", () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Test");
  });

  test("Renders the button with className", () => {
    render(<Button className="test">Test</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("test");
  });

  test("Renders the button with id", () => {
    render(<Button id="test">Test</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("id", "test");
  });

  test("Renders the button with onClick", () => {
    const onClickHandler = () => {
      onClickHandler.called = true;
    };
    onClickHandler.called = false;
    render(<Button onClick={onClickHandler}>Test</Button>);
    const button = screen.getByRole("button");
    button.click();
    expect(onClickHandler.called).toBe(true);
  });
});
