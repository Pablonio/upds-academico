// components/LoginModal.tsx
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import {motion} from 'framer-motion';

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
          <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
          >
            <div className="bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-700 w-full max-w-md">
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
                    className="flex text-center items-center justify-center w-full mb-6 pt-4 pr-10 pb-2 pl-10 text-base
                    font-medium text-white bg-indigo-700 rounded-xl transition duration-500 ease-in-out transform
                    hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Iniciar Sesión
                  </button>
                </div>
              </form>
              <button
                onClick={onClose}
                className="flex text-center items-center justify-center w-full pt-2 pr-10 pb-4 pl-10 text-base
                    font-medium text-white bg-red-600 rounded-xl transition duration-500 ease-in-out transform
                    hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancelar
              </button>
            </div>
          
          </motion.div>
        ) : null
      );                       
};

export default LoginModal;
