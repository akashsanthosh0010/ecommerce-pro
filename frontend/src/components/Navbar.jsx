import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const token = localStorage.getItem("access");
  const { cart } = useContext(CartContext);

  const handleLogout = () => {
    localStorage.removeItem("access");
    window.location.href = "/";
  };

  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="bg-gray-800 p-4 flex justify-between text-white">
      <h1 className="font-bold">MyShop</h1>

      <div>
        {token ? (
          <>
            <Link to="/dashboard" className="mr-4">Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>

      <Link to="/cart">Cart 🛒 ({count})</Link>
    </div>
  );
}

export default Navbar;