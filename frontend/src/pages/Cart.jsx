import { useEffect, useState } from "react";
import axios from "../api/axios";

function Cart() {
    const [cart, setCart] = useState([]);
    console.log(cart);
    

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const res = await axios.get("/products/cart/");
            setCart(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const removeItem = async (id) => {
        try {
            await axios.delete(`/products/cart/remove/${id}/`);
            setCart(cart.filter(item => item.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const increaseQty = async (id) => {
        try {
            await axios.post("/products/cart/update/", {
                product_id: id,
                action: "inc",
            });

            fetchCart(); // refresh
        } catch (err) {
            console.log(err);
        }
    };

    const decreaseQty = async (id) => {
        try {
            await axios.post("/products/cart/update/", {
                product_id: id,
                action: "dec",
            });

            fetchCart(); // refresh
        } catch (err) {
            console.log(err);
        }
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
                                <button onClick={() => decreaseQty(item.id)}>-</button>
                                <span>{item.qty}</span>
                                <button onClick={() => increaseQty(item.id)}>+</button>
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