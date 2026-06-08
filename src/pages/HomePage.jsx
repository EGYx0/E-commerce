import { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "../components/Header";
import checkMark from "../assets/images/icons/checkmark.png";
import "./HomePage.css";

export function HomePage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        const data = response.data;
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }
    async function loadCartItems() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/cart-items",
        );
        const data = response.data;
        setCart(data);
      } catch (error) {
        console.log("Failed to fetch cart Items", error);
      }
    }

    loadProducts();
    loadCartItems();
  }, []);
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />

      <title>Ecommerce Project</title>

      <Header cart={cart} />

      <div className="home-page">
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-container" key={product.id}>
              <div className="product-image-container">
                <img className="product-image" src={product.image} />
              </div>

              <div className="product-name limit-text-to-2-lines">
                {product.name}
              </div>

              <div className="product-rating-container">
                <img
                  className="product-rating-stars"
                  src={`images/ratings/rating-${product.rating.stars * 10}.png`}
                />

                <div className="product-rating-count link-primary">
                  {product.rating.count}
                </div>
              </div>

              <div className="product-price">
                ${(product.priceCents / 100).toFixed(2)}
              </div>

              <div className="product-quantity-container">
                <select>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>

              <div className="product-spacer"></div>

              <div className="added-to-cart">
                <img src={checkMark} />
                Added
              </div>

              <button className="add-to-cart-button button-primary">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
