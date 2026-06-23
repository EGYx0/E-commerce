import { it, expect, describe, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import { Product } from "./Product";
vi.mock("axios"); // we can mock any npm package, when we import it above and make this line it will make a fake version of axios or any other packages so we can test it

//renders a component in a fake webpage for testing

//first we have to get a mock product data to test, and also to give the product the props cause loadCart is an async function and we can't make http request cause it can modify the data

// for load cart we have to mock the function, -> to create a fake version of  this function cause it's async through vi from vitest, vi creates a fake function that doesn't do anything

describe("Product component", () => {
  let product;
  let loadCart;
  let user;
  beforeEach(() => {
    product = {
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
    loadCart = vi.fn();

    user = userEvent.setup();
  });
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
  it("behaves correctly when interactions", async () => {
    render(<Product product={product} loadCart={loadCart} />);
    const addToCartButton = screen.getByTestId("add-to-cart-button");

    await user.click(addToCartButton); // this basically check when we click add to cart, then we expect that axios.post runs and loadCart and give them values if exists like axios.post
    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
    });
    expect(loadCart).toHaveBeenCalled();
  });

  it("selects a quantity", async () => {
    render(<Product product={product} loadCart={loadCart} />);
    const quantitySelector = screen.getByTestId("product-quantity-selector");
    expect(quantitySelector).toHaveValue("1");
    await user.selectOptions(quantitySelector, "3");
    expect(quantitySelector).toHaveValue("3");

    const addTocartButton = screen.getByTestId("add-to-cart-button");
    await user.click(addTocartButton);
    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 3,
    });
    expect(loadCart).toHaveBeenCalled();
  });
});
