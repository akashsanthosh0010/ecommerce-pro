import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

function Navbar() {
  const [count, setCount] = useState(0);
  const token = localStorage.getItem("access");

  useEffect(() => {
    if (token) {
      fetchCartCount();
    }
  }, []);

  const fetchCartCount = async () => {
    try {
      const res = await axios.get("/products/cart/");
      const totalQty = res.data.reduce((sum, item) => sum + item.qty, 0);
      setCount(totalQty);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    window.location.href = "/";
  };

  return (
    <div className="bg-gray-800 p-4 flex justify-between text-white">
      <h1 className="font-bold">MyShop</h1>

      <div>
        {token ? (
          <>
            <a href="/dashboard" className="mr-4">Dashboard</a>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <a href="/" className="mr-4">Login</a>
            <a href="/register">Register</a>
          </>
        )}
      </div>

      <Link to="/cart">Cart 🛒({count})</Link>
    </div>
  );
}

export default Navbar;