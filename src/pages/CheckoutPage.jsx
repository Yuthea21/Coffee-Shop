import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

import "../styles/checkout.css";

export default function CheckoutPage() {
  const {
    cart,
    total,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const { user } = useAuth();

  const [type, setType] = useState("pickup");
  const [msg, setMsg] = useState("");

  const nav = useNavigate();

  async function order() {
    if (!user) {
      nav("/login");
      return;
    }

    if (cart.length === 0) {
      setMsg("Your cart is empty.");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        email: user.email,
        items: cart,
        total: total,
        type: type,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      clearCart();

      setMsg("Order placed successfully!");
    } catch (error) {
      console.error(error);
      setMsg("Check Firebase configuration.");
    }
  }

  return (
    <>
      <Navbar />

      <main className="checkout">
        <h1>YOUR CART</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>{msg || "Your cart is empty."}</p>

            <Link to="/products">
              Go to Menu
            </Link>
          </div>
        ) : (
          <>
            <section className="checkout-list">
              {cart.map((item) => (
                <div
                  className="checkout-item"
                  key={item.id}
                >
                  <div>
                    <b>{item.name}</b>

                    <p>
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>

                  <div className="quantity">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        addToCart(item)
                      }
                    >
                      +
                    </button>

                    <button
                      className="remove"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </section>

            <div className="order-type">
              <label htmlFor="type">
                Order Type
              </label>

              <select
                id="type"
                value={type}
                onChange={(e) =>
                  setType(e.target.value)
                }
              >
                <option value="pickup">
                  Pickup
                </option>

                <option value="delivery">
                  Delivery
                </option>
              </select>
            </div>

            <h2>
              Total: ${total.toFixed(2)}
            </h2>

            <button
              className="place-order"
              onClick={order}
            >
              {user ? "Place Order" : "Login to Order"}
            </button>

            {msg && <p className="order-message">{msg}</p>}
          </>
        )}
      </main>

      <Footer />
    </>
  );
}