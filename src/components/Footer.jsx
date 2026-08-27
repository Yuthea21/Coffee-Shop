import { Link } from "react-router-dom";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div>
        <h3>Coffee Shop</h3>
        <p>Good coffee. Good mood. Good day.</p>
      </div>

      <div className="footer-links">
        <Link to="/products">Menu</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <p>© 2026 Coffee Shop. All rights reserved.</p>

    </footer>
  );
}