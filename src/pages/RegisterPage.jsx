import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

import { auth, db } from "../firebase";
import Navbar from "../components/Navbar";
import "../styles/auth.css";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError("");

    try {
      // Create Firebase Authentication account
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Save user information in Firestore
      await setDoc(doc(db, "users", result.user.uid), {
        name: name,
        email: email,
        role: "customer",
        createdAt: serverTimestamp(),
      });

      // Go to home page
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(
        "Registration failed. Check your email and make sure your password has at least 6 characters."
      );
    }
  }

  return (
    <>
      <Navbar />

      <main className="auth-page">
        <form className="auth-card" onSubmit={submit}>
          <h1>Create Account</h1>

          {error && <p className="error">{error}</p>}

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password (6+ characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          <button type="submit">
            Register
          </button>

          <p>
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>
        </form>
      </main>
    </>
  );
}