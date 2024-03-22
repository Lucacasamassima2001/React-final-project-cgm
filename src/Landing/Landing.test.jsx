/* eslint-disable no-undef */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Landing from "./Landing.jsx";
import { MemoryRouter } from "react-router-dom";

test("Renders the main page", () => {
  render(
    <MemoryRouter>
      <Landing />
    </MemoryRouter>
  );
  const title = screen.getByText("REACTFOOD", { exact: false });
  expect(title).toBeInTheDocument();
  const img = screen.getByRole("img");
  expect(img).toBeInTheDocument();
  const subtitle = screen.getByText("Start your journey with us!", {
    exact: false,
  });
  expect(subtitle).toBeInTheDocument();
});
