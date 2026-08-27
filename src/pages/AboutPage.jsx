import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/about.css";

const reasons = [
  [
    "🌱",
    "Sustainably Sourced",
    "We partner with farmers who use ethical, sustainable farming practices.",
  ],
  [
    "🌿",
    "Freshly Roasted",
    "Our beans are roasted in small batches for freshness and flavor.",
  ],
  [
    "☕",
    "Expertly Crafted",
    "Each blend highlights the best qualities of the beans.",
  ],
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main>
        <section className="about">
          <h1>ABOUT OUR SHOP</h1>

          <p>
            At Coffee Time, we believe that every cup of coffee tells a story.
            We source high-quality beans from around the globe. Our mission is
            simple: exceptional coffee experiences in every sip.
          </p>
        </section>

        <section className="about-section">
          <h2>Why Choose Us?</h2>

          <div className="reason-row">
            {reasons.map((reason) => (
              <div className="reason" key={reason[1]}>
                <div className="reason-icon">{reason[0]}</div>

                <h3>{reason[1]}</h3>

                <p>{reason[2]}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}