/* eslint-disable no-undef */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "./Header.jsx";
import { MemoryRouter } from "react-router-dom";

test("Render the Header and empty cart", () => {
  render(
    <MemoryRouter>
      <Header onOpen={() => {}} data={[]} onHistory={() => {}} />
    </MemoryRouter>
  );
  const title = screen.getByText("REACTFOOD", { exact: false });
  expect(title).toBeInTheDocument();
  const img = screen.getByRole("img");
  expect(img).toBeInTheDocument();
  const cartData = screen.getByText("Cart (0)", { exact: false });
  expect(cartData).toBeInTheDocument();
});

test("check if cart is not empty", () => {
  render(
    <MemoryRouter>
      <Header
        onOpen={() => {}}
        data={[{ id: 1, quantity: 1 }]}
        onHistory={() => {}}
      />
    </MemoryRouter>
  );
  const cartData = screen.getByText("Cart (1)", { exact: false });
  expect(cartData).toBeInTheDocument();
});
