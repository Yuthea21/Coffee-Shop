import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { totalItems } = useCart();
  const { user, role, logout } = useAuth();

  const navigate = useNavigate();

  async function out() {
    await logout();
    navigate("/");
    setOpen(false);
  }

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <Link className="logo" to="/" onClick={closeMenu}>
        Coffee Shop
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="hamburger"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Navigation */}
      <div className={`nav-menu ${open ? "open" : ""}`}>

        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>

        <NavLink to="/products" onClick={closeMenu}>
          Menu
        </NavLink>

        <NavLink to="/about" onClick={closeMenu}>
          About Us
        </NavLink>

        <NavLink to="/contact" onClick={closeMenu}>
          Contact
        </NavLink>

        {/* Admin */}
        {role === "admin" && (
          <NavLink to="/admin" onClick={closeMenu}>
            Admin
          </NavLink>
        )}

        {/* Login / Logout */}
        {user ? (
          <button
            className="nav-action"
            onClick={out}
          >
            Logout
          </button>
        ) : (
          <>
            <NavLink to="/login" onClick={closeMenu}>
              Login
            </NavLink>

            <NavLink to="/register" onClick={closeMenu}>
              Register
            </NavLink>
          </>
        )}

        {/* Cart */}
        <Link
          className="cart-link"
          to="/checkout"
          onClick={closeMenu}
        >
          🛒 <span>{totalItems}</span>
        </Link>

      </div>
    </nav>
  );
}