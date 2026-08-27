import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";

export default function HomePage() {
  return (
    <>
      <div className="home">
        <Navbar />

        <section className="hero">
          <div className="hero-content">
            <h1>
              WELCOME GUYS
              <br />
              TO COFFEE SHOP
            </h1>

            <p>
              START YOUR DAY WITH CAFE.
              <br />
              We have a lot of choices for you, like espresso, latte, and
              matcha.
            </p>

            <Link className="hero-button" to="/products">
              ORDER NOW
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}