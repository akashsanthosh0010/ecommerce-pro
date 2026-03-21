import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Products() {
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        api.get("/products/")
            .then((res) => {
                console.log(res.data);
                setProducts(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <h1 className="text-3xl mb-6">Products 🛒</h1>

            <div className="grid grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        onClick={() => navigate(`/products/${product.id}`)}
                        className="cursor-pointer bg-gray-800 rounded-xl p-4 hover:scale-105 transition"
                    >

                        {/* IMAGE */}
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-40 w-full object-cover rounded"
                        />

                        {/* NAME */}
                        <h2 className="text-lg mt-2 font-bold">{product.name}</h2>

                        {/* PRICE */}
                        <p className="text-green-400">₹{product.price}</p>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;