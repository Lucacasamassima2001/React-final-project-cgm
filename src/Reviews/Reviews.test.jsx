import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Reviews from "./Reviews";
import { MemoryRouter } from "react-router-dom";

test("renders 'REACTFOOD' in header", () => {
  // Renderizza il componente Header senza passare data
  render(
    <MemoryRouter>
      <Reviews />
    </MemoryRouter>
  );

  // Verifica se l'elemento h1 contiene il testo "REACTFOOD"
  const reviewsTitle = screen.getByText("REACTFOOD");
  expect(reviewsTitle).toBeInTheDocument();
});
