import { useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../firebase";
import "../styles/contact.css";

const empty = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [f, setF] = useState(empty);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const change = (e) => {
    setF({
      ...f,
      [e.target.name]: e.target.value,
    });
  };

  async function submit(e) {
    e.preventDefault();

    setLoading(true);
    setNote("");

    try {
      await addDoc(collection(db, "messages"), {
        ...f,
        createdAt: serverTimestamp(),
      });

      setF(empty);
      setNote("Thanks — your message has been sent.");
    } catch (error) {
      console.error(error);
      setNote("Check your Firebase configuration.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main>
        <section className="contact-hero">
          <h1>CONTACT US</h1>

          <p>
            Questions about an order, catering, or just want to say hi?
          </p>
        </section>

        <section className="contact-wrap">
          <form
            className="contact-form"
            onSubmit={submit}
          >
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              value={f.name}
              onChange={change}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={f.email}
              onChange={change}
              required
            />

            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="Subject"
              value={f.subject}
              onChange={change}
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              placeholder="Message"
              value={f.message}
              onChange={change}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>

            <p className="form-note">{note}</p>
          </form>

          <div className="contact-info">
            <h3>Visit Us</h3>

            <p>
              <b>Address</b>
              <br />
              190 RUPP
            </p>

            <p>
              <b>Hours</b>
              <br />
              Every day, 7:00am – 6:00pm
            </p>

            <p>
              <b>Phone</b>
              <br />
              (855) 887905528
            </p>

            <p>
              <b>Email</b>
              <br />
              hello@coffeeshop.com
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}