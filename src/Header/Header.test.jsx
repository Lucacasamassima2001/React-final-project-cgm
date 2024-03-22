import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";

test("renders 'REACTFOOD' in header", () => {
  // Renderizza il componente Header senza passare data
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  // Verifica se l'elemento h1 contiene il testo "REACTFOOD"
  const reactFoodElement = screen.getByText("REACTFOOD");
  expect(reactFoodElement).toBeInTheDocument();
});
