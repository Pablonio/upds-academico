// components/LoginModal.tsx
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/Usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            console.log("Datos obtenidos:", data); // Verificar que el backend devuelve los datos correctamente

            if (res.ok) {
                Cookies.set('rol', data.rol);
                Cookies.set('userId', data.id);
                if (data.rol === 'ADMINISTRATIVO') {
                    router.push('/paginas/administrativo');
                } else if (data.rol === 'DOCENTE') {
                    router.push('/paginas/docentes');
                } else if (data.rol === 'ESTUDIANTE') {
                    router.push('/');
                }
            } else {
                setError(data.error);
            }
        } catch (err) {
            console.error(err);
            setError('Error al iniciar sesión. Intenta de nuevo.');
        }
    };

    return (
        isOpen ? (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4 text-gray-200">Iniciar Sesión</h2>
              {error && <div className="text-red-500 mb-2">{error}</div>}
              <form onSubmit={handleLogin}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400">Correo Electrónico</label>
                  <input
                    id="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full border border-gray-600 bg-gray-700 text-white p-2 rounded-md focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-400">Contraseña</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full border border-gray-600 bg-gray-700 text-white p-2 rounded-md focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Iniciar Sesión
                  </button>
                </div>
              </form>
              <button
                onClick={onClose}
                className="mt-4 w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : null
      );                       
};

export default LoginModal;
