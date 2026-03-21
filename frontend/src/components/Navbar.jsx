function Navbar() {
    const token = localStorage.getItem("access");

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
        </div>
    );
}

export default Navbar;