import { useState } from "react";

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://127.0.0.1:8000/api/auth/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        console.log(data);

        if (res.ok) {
            localStorage.setItem("access", data.access);
            alert("Login successful 🚀");

            // redirect (next step)
            window.location.href = "/dashboard";
        } else {
            alert(data.error || "Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-6 rounded-xl w-80 space-y-4"
            >
                <h2 className="text-white text-xl font-bold">Login</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                />

                <button className="w-full bg-green-500 p-2 rounded text-black font-bold">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;