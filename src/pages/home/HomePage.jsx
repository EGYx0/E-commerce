import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";
import { Header } from "../../components/Header";
import "./HomePage.css";
import { ProductGrid } from "./ProductGrid";

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    async function loadProducts() {
      try {
        const urlPath = search
          ? `/api/products?search=${search}`
          : "/api/products";
        const response = await axios.get(urlPath);
        const data = response.data;
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }
    loadProducts();
  }, [search]);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />

      <title>Ecommerce Project</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
