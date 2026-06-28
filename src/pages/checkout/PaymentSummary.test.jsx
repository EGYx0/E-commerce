import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { PaymentSummary } from "./PaymentSummary";

vi.mock("axios");
describe("PaymentSummary Component", () => {
  let paymentSummary;
  let loadCart;
  let user;
  beforeEach(() => {
    paymentSummary = {
      totalItems: 3,
      productCostCents: 13000,
      shippingCostCents: 0,
      totalCostBeforeTaxCents: 13000,
      taxCents: 1383,
      totalCostCents: 16830,
    };

    loadCart = vi.fn();

    user = userEvent.setup();
  });

  it("displays on the page", () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("payment-summary")).toBeInTheDocument();
  });

  it("displays the details correctly", () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>,
    );
    expect(
      screen.getByTestId("payment-summary-product-cost"),
    ).toHaveTextContent("$130.00");

    expect(
      screen.getByTestId("payment-summary-shipping-cost"),
    ).toHaveTextContent("$0.00");

    expect(
      screen.getByTestId("payment-summary-total-before-tax"),
    ).toHaveTextContent("$130.00");

    expect(screen.getByTestId("payment-summary-tax")).toHaveTextContent(
      "$13.83",
    );

    expect(screen.getByTestId("payment-summary-total")).toHaveTextContent(
      "$168.30",
    );
  });

  it("creates order", async () => {
    function Location() {
      const location = useLocation();
      return <div data-testid="url-path">{location.pathname}</div>;
    }

    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        <Location />
      </MemoryRouter>,
    );

    const createOrderButton = screen.getByTestId("place-order-button");

    expect(createOrderButton).toBeInTheDocument();

    await user.click(createOrderButton);

    expect(loadCart).toHaveBeenCalled();

    expect(axios.post).toHaveBeenCalledWith("/api/orders");

    expect(screen.getByTestId("url-path")).toHaveTextContent("/orders");
  });
});
