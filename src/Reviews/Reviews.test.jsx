/* eslint-disable no-undef */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Reviews from "./Reviews.jsx";
import { MemoryRouter } from "react-router-dom";

describe("Reviews component tests", () => {
  test("Renders the Reviews component", () => {
    render(
      <MemoryRouter>
        <Reviews data={[]} />
      </MemoryRouter>
    );
    const title = screen.getByText("REACTFOOD", { exact: false });
    expect(title).toBeInTheDocument();
  });
});
