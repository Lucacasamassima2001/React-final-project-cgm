/* eslint-disable no-undef */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Meal from "./Meal";

test("Renders Meal component with correct content", () => {
  const meal = {
    name: "Test Meal",
    image: "test-image.jpg",
    price: 10,
    description: "Test description",
  };

  render(
    <MemoryRouter>
      <Meal meal={meal} onAdd={() => {}} />
    </MemoryRouter>
  );

  const mealName = screen.getByText(meal.name);
  expect(mealName).toBeInTheDocument();

  const mealImage = screen.getByRole("img");
  expect(mealImage).toHaveAttribute(
    "src",
    `http://localhost:3000/${meal.image}`
  );

  const mealPrice = screen.getByText(`${meal.price} €`);
  expect(mealPrice).toBeInTheDocument();

  const mealDescription = screen.getByText(meal.description);
  expect(mealDescription).toBeInTheDocument();

  const addButton = screen.getByText("Add to cart");
  expect(addButton).toBeInTheDocument();
  addButton.click();
});
