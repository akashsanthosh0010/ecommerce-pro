import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { addToCart } from "../utils/cart";
import { CartContext } from "../context/CartContext";
import axios from "../api/axios";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { cart, updateCart } = useContext(CartContext);

    useEffect(() => {
        api.get(`/products/${id}/`)
            .then((res) => setProduct(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    const handleAddToCart = async () => {
        try {
            await axios.post("/products/cart/add/", {
                product_id: product.id,
            });

            alert("Added to cart");
        } catch (err) {
            console.log(err);
        }
    };

    if (!product) return <p className="text-white p-6">Loading...</p>;

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white flex gap-10">

            {/* IMAGE */}
            <img
                src={product.image}
                alt={product.name}
                className="w-96 h-96 object-cover rounded"
            />

            {/* DETAILS */}
            <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="mt-4 text-gray-300">{product.description}</p>

                <p className="text-green-400 text-2xl mt-4">
                    ₹{product.price}
                </p>

                <button onClick={handleAddToCart}>
                    Add to Cart 🛒
                </button>
            </div>
        </div>
    );
}

export default ProductDetails;