/* eslint-disable no-undef */
import Input from "./Input";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
test("Renders Input component with label", () => {
  const labelText = "Test Label";
  render(
    <MemoryRouter>
      <Input
        labelText={labelText}
        onChange={() => {}}
        inputType="text"
        inputName="testInput"
        error={false}
        placeholderText="Enter text"
      />
    </MemoryRouter>
  );

  // Verifica che la label sia stata resa correttamente
  const labelElement = screen.getByText(labelText);
  expect(labelElement).toBeInTheDocument();

  // Verifica che l'input sia presente
  const inputElement = screen.getByPlaceholderText("Enter text");
  expect(inputElement).toBeInTheDocument();
});
