import { MemoryRouter, useLocation } from "react-router";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "./Header";

describe("Header Component", () => {
  let user;
  let cart;
  beforeEach(() => {
    user = userEvent.setup();
    cart = [
      {
        id: 11,
        productId: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
        quantity: 1,
        deliveryOptionId: "1",
        updatedAt: "2026-06-29T05:24:12.133Z",
        createdAt: "2026-06-29T05:24:12.133Z",
      },
      {
        id: 12,
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 3,
        deliveryOptionId: "1",
        createdAt: "2026-06-29T05:37:48.921Z",
        updatedAt: "2026-06-29T05:37:48.921Z",
        product: {
          keywords: ["sports", "basketballs"],
          id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          image: "images/products/intermediate-composite-basketball.jpg",
          name: "Intermediate Size Basketball",
          rating: {
            stars: 4,
            count: 127,
          },
          priceCents: 2095,
          createdAt: "2026-06-17T11:45:51.162Z",
          updatedAt: "2026-06-17T11:45:51.162Z",
        },
      },
    ];
  });
  it("shows 0 when the cart is empty", () => {
    render(
      <MemoryRouter>
        <Header cart={[]} />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("cart-quantity")).toHaveTextContent("0");
  });

  it("shows cart quantity", () => {
    render(
      <MemoryRouter>
        <Header cart={cart} />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("cart-quantity")).toHaveTextContent("4");
  });

  it("navigates to the orders page when the Orders link is clicked", async () => {
    const LocationDisplay = () => {
      const location = useLocation();
      return <div data-testid="location">{location.pathname}</div>;
    };
    render(
      <MemoryRouter>
        <Header cart={cart} />
        <LocationDisplay />
      </MemoryRouter>,
    );
    const orderLink = screen.getByRole("link", { name: /orders/i });
    await user.click(orderLink);
    expect(screen.getByTestId("location")).toHaveTextContent("/orders");
  });

  it("navigates to the checkout page when the Cart link is clicked", async () => {
    const LocationDisplay = () => {
      const location = useLocation();
      return <div data-testid="location">{location.pathname}</div>;
    };
    render(
      <MemoryRouter>
        <Header cart={cart} />
        <LocationDisplay />
      </MemoryRouter>,
    );
    const orderLink = screen.getByRole("link", { name: /cart/i });
    await user.click(orderLink);
    expect(screen.getByTestId("location")).toHaveTextContent("/checkout");
  });

  it("initializes the search input from the URL", () => {
    const query = "basketball";
    render(
      <MemoryRouter initialEntries={[`/?search=${query}`]}>
        <Header cart={cart} />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("search-bar")).toHaveValue(query);
  });

  it("updates the search input value when typing", async () => {
    render(
      <MemoryRouter>
        <Header cart={cart} />
      </MemoryRouter>,
    );

    const searchInput = screen.getByRole("textbox", {
      name: /search-bar/i,
    });

    const query = "Intermediate Size Basketball";

    await user.type(searchInput, query);

    expect(searchInput).toHaveValue(query);
  });

  it("navigates to the search URL when the search button is clicked", async () => {
    const LocationDisplay = () => {
      const location = useLocation();

      return (
        <div data-testid="location">
          {location.pathname}
          {location.search}
        </div>
      );
    };
    render(
      <MemoryRouter>
        <Header cart={cart} />
        <LocationDisplay />
      </MemoryRouter>,
    );

    const searchInput = screen.getByRole("textbox", { name: /search-bar/i });
    const searchButton = screen.getByRole("button", {
      name: /search-button/i,
    });
    const query = "basketball";

    await user.type(searchInput, query);
    await user.click(searchButton);
    expect(screen.getByTestId("location")).toHaveTextContent("basketball");
  });

  it("clears the search input after clicking the Search button", async () => {
    render(
      <MemoryRouter>
        <Header cart={cart} />
      </MemoryRouter>,
    );

    const searchInput = screen.getByTestId("search-bar");
    const searchButton = screen.getByRole("button");

    await user.type(searchInput, "basketball");

    expect(searchInput).toHaveValue("basketball");

    await user.click(searchButton);

    expect(searchInput).toHaveValue("");
  });
});
