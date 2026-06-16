import { Header } from "../components/Header";
import { Link } from "react-router";
import "./ErrorPage.css";
export function ErrorPage({ cart }) {
  return (
    <>
      <Header cart={cart} />
      <main className="error-page">
        <h1>404 - Page Not Found</h1>
        <p>{"The page you're looking for doesn't exist."}</p>
        <Link to="/" className="home-link">
          Go Home
        </Link>
      </main>
    </>
  );
}
