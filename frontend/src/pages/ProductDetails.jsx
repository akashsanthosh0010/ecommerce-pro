import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { addToCart } from "../utils/cart";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        api.get(`/products/${id}/`)
            .then((res) => setProduct(res.data))
            .catch((err) => console.log(err));
    }, [id]);

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

                <button
                    onClick={() => {
                        addToCart(product);
                        alert("Added to cart 🛒");
                    }}
                    className="mt-6 bg-green-500 px-6 py-2 rounded hover:bg-green-600"
                >
                    Add to Cart 🛒
                </button>
            </div>
        </div>
    );
}

export default ProductDetails;