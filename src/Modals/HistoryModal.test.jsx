/* eslint-disable no-undef */
import "@testing-library/jest-dom";
import HistoryModal from "./HistoryModal";
import { render, screen } from "@testing-library/react";
import { fetchOrders } from "../http";
import { act } from "react-dom/test-utils";
describe("HistoryModal component tests", () => {
  test("Renders the HistoryModal component", () => {
    render(<HistoryModal onClose={() => {}} />);
    const modal = screen.getByTestId("history-modal");
    expect(modal).toBeInTheDocument();
  });

  test("Renders the modal title", () => {
    render(<HistoryModal onClose={() => {}} />);
    const modalTitle = screen.getByText("History");
    expect(modalTitle).toBeInTheDocument();
  });

  test("Check if no orders are rendered", async () => {
    render(<HistoryModal data={[]} />);
    act(async () => {
      const orders = await fetchOrders();
      expect(orders.length).toBe(0);
    });
    const noOrders = screen.getByText("No orders yet");
    expect(noOrders).toBeInTheDocument();
  });
});
