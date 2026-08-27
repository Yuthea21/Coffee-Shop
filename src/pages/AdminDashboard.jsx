import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/admin.css";

export default function AdminDashboard() {
  return (
    <>
      <Navbar />

      <main className="admin">
        <h1>ADMIN DASHBOARD</h1>

        <div className="admin-card">
          <h2>Menu Management</h2>
          <p>
            Add, edit and delete products here after connecting your
            Firestore products collection.
          </p>

          <p>
            <b>Collections:</b> products, orders, users, messages
          </p>
        </div>

        <div className="admin-card">
          <h2>Order Management</h2>
          <p>
            Orders from online customers and in-shop ordering can be
            stored in Firestore.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}