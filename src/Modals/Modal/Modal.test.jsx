/* eslint-disable no-undef */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Modal from "./Modal";

// Crea un elemento div con id "modal" nel DOM prima di eseguire i test
beforeEach(() => {
  const modalContainer = document.createElement("div");
  modalContainer.id = "modal";
  document.body.appendChild(modalContainer);
});

test("Renders Modal component with children when open is true", () => {
  const modalContent = "Test Modal Content";

  render(
    <MemoryRouter>
      <Modal open={true} onClose={() => {}}>
        <div>{modalContent}</div>
      </Modal>
    </MemoryRouter>
  );

  const renderedContent = screen.getByText(modalContent);
  expect(renderedContent).toBeInTheDocument();
});

test("Modal dialog exists when open is true", () => {
  render(
    <MemoryRouter>
      <Modal open={true} onClose={() => {}}>
        <div>Test Modal Content</div>
      </Modal>
    </MemoryRouter>
  );

  const modalDialog = screen.getByRole("dialog");
  expect(modalDialog).toBeInTheDocument();
});
test("Modal dialog does not exist when open is false", () => {
  render(
    <MemoryRouter>
      <Modal open={false} onClose={() => {}}>
        <div>Test Modal Content</div>
      </Modal>
    </MemoryRouter>
  );

  const modalDialog = screen.queryByRole("dialog");
  expect(modalDialog).not.toBeInTheDocument();
});
