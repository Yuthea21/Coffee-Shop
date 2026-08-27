import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import "../styles/product.css";

export default function ProductPage() {
  const [cat, setCat] = useState("All");
  const { addToCart } = useCart();

  const list =
    cat === "All"
      ? products
      : products.filter((p) => p.category === cat);

  return (
    <>
      <Navbar />

      <main className="product-page">
        <section className="page-heading">
          <h1>OUR MENU</h1>
          <p>
            Choose your favorite coffee, tea, food and dessert.
          </p>
        </section>

        <div className="categories">
          {["All", "Coffee", "Tea", "Food", "Dessert"].map((x) => (
            <button
              className={cat === x ? "active" : ""}
              key={x}
              onClick={() => setCat(x)}
            >
              {x}
            </button>
          ))}
        </div>

        <section className="product-grid">
          {list.map((p) => (
            <article className="product-card" key={p.id}>
              <div className="product-image">
                {p.emoji}
              </div>

              <div className="product-info">
                <small>{p.category}</small>

                <h3>{p.name}</h3>

                <p>{p.description}</p>

                <div className="product-bottom">
                  <strong>${p.price.toFixed(2)}</strong>

                  <button onClick={() => addToCart(p)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}