import { it, expect, describe, vi } from "vitest";

import { Product } from "./Product";

import { render, screen } from "@testing-library/react"; //renders a component in a fake webpage for testing

//first we have to get a mock product data to test, and also to give the product the props cause loadCart is an async function and we can't make http request cause it can modify the data

// for load cart we have to mock the function, -> to create a fake version of  this function cause it's async through vi from vitest, vi creates a fake function that doesn't do anything

describe("Product component", () => {
  const product = {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",

    image: "images/products/athletic-cotton-socks-6-pairs.jpg",

    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",

    rating: {
      stars: 4.5,

      count: 87,
    },

    priceCents: 1090,

    keywords: ["socks", "sports", "apparel"],
  };

  const loadCart = vi.fn();

  it("displays the product details correctly", () => {
    render(<Product product={product} loadCart={loadCart} />);

    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs"),
    ).toBeInTheDocument();

    expect(screen.getByText("$10.90")).toBeInTheDocument();

    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg",
    );
    expect(screen.getByTestId("product-rating-stars-image")).toHaveAttribute(
      "src",
      "images/ratings/rating-45.png",
    );
    expect(screen.getByText("87")).toBeInTheDocument();
  });
});
