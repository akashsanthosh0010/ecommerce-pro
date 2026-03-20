import { useEffect } from "react";

function Dashboard() {
  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <h1 className="text-3xl">Welcome to Dashboard 🚀</h1>
    </div>
  );
}

export default Dashboard;