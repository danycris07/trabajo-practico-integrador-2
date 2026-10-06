import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";
import { API_BASE_URL } from "../config/api";

export const RegisterPage = () => {
  const { formState, handleInputChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [successMsg, setSuccessMsg] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);
    setSuccessMsg(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (response.ok || response.status === 201) {
        handleReset();
        setSuccessMsg("¡Registro exitoso! Redirigiendo...");
        setTimeout(() => navigate("/login"), 2000);
      } else if (response.status === 400) {
        const data = await response.json();
        if (data.errors && Array.isArray(data.errors)) {
          setErrors(data.errors.map((err) => err.msg));
        } else {
          setErrors([data.message || "Error al validar los datos."]);
        }
      } else {
        setErrors(["Error del servidor."]);
      }
    } catch (error) {
      setErrors(["Error de conexión."]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto mt-10 border bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Crear Cuenta</h1>

      {successMsg && (
        <p className="bg-green-200 text-green-800 p-2 mb-4">{successMsg}</p>
      )}

      {errors.length > 0 && (
        <ul className="bg-red-200 text-red-800 p-2 mb-4 list-disc pl-5">
          {errors.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label>Nombre de Usuario</label>
          <input
            type="text"
            name="username"
            value={formState.username}
            onChange={handleInputChange}
            required
            className="border w-full p-2"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            required
            className="border w-full p-2"
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
            required
            className="border w-full p-2 text-xs"
            placeholder="Mín. 8 caracteres, 1 mayúscula, 1 número"
          />
        </div>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            name="first_name"
            value={formState.first_name}
            onChange={handleInputChange}
            required
            className="border w-full p-2"
          />
        </div>
        <div>
          <label>Apellido</label>
          <input
            type="text"
            name="last_name"
            value={formState.last_name}
            onChange={handleInputChange}
            required
            className="border w-full p-2"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-600 text-white p-2 mt-2"
        >
          {isLoading ? "Registrando..." : "Registrarse"}
        </button>
      </form>

      <p className="mt-4 text-sm">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="text-blue-600 underline">
          Inicia Sesión
        </Link>
      </p>
    </div>
  );
};
