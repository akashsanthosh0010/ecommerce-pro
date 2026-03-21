import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, updateCart } = useContext(CartContext);

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const increaseQty = (id) => {
    const updated = cart.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart.map(item =>
      item.id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    );
    updateCart(updated);
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

              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-2 bg-gray-600"
                >
                  -
                </button>
                <span>{item.qty}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-2 bg-gray-600"
                >
                  +
                </button>
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