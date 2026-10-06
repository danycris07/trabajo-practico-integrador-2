import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from '../hooks/useForm';
import { API_BASE_URL } from '../config/api';

export const LoginPage = () => {
  const { formState, handleInputChange } = useForm({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formState)
      });

      if (response.ok) {
        localStorage.setItem('isLogged', 'true');
        navigate('/');
      } else if (response.status === 401) {
        setErrorMsg("Credenciales incorrectas.");
      } else {
        setErrorMsg("Error interno del servidor.");
      }
    } catch (error) {
      setErrorMsg("Error de conexión.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto mt-10 border bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>

      {errorMsg && <p className="bg-red-200 text-red-800 p-2 mb-4">{errorMsg}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label>Usuario</label>
          <input type="text" name="username" value={formState.username} onChange={handleInputChange} required
            className="border w-full p-2" />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" name="password" value={formState.password} onChange={handleInputChange} required
            className="border w-full p-2" />
        </div>
        <button type="submit" disabled={isLoading} className="bg-blue-600 text-white p-2 mt-2">
          {isLoading ? 'Cargando...' : 'Ingresar'}
        </button>
      </form>

      <p className="mt-4 text-sm">
        ¿No tienes cuenta? <Link to="/register" className="text-blue-600 underline">Regístrate</Link>
      </p>
    </div>
  );
};