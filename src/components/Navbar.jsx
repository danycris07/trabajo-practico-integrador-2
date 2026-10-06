import { Link, useNavigate } from 'react-router';
import { API_BASE_URL } from '../config/api';

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    } finally {
      localStorage.removeItem('isLogged');
      navigate('/login');
    }
  };

  return (
    <nav className="bg-slate-900 p-4 text-white shadow-md flex justify-between items-center">
      <div className="font-bold text-xl tracking-wide">
        <Link to="/">Gestión de Blog</Link>
      </div>
      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:text-slate-300 transition-colors">Inicio</Link>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition font-medium"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};