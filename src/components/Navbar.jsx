import { Link, useNavigate } from "react-router";
import { API_BASE_URL } from "../config/api";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    } finally {
      localStorage.removeItem("isLogged");
      navigate("/login");
    }
  };

  return (
    <nav className="flex justify-between items-center bg-black text-white p-4">
      <Link to="/" className="font-bold text-lg">
        Gestión de Blog
      </Link>
      <div className="flex items-center gap-4">
        <Link to="/">Inicio</Link>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-3 py-1 text-white"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};
