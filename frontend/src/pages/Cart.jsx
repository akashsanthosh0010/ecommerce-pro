import { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl mb-4">Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between bg-gray-800 p-4 mb-3 rounded"
            >
              <div>
                <h2>{item.name}</h2>
                <p>₹{item.price} × {item.qty}</p>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="bg-red-500 px-3 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <h2 className="mt-4 text-xl">
            Total: ₹{total}
          </h2>
        </>
      )}
    </div>
  );
}

export default Cart;