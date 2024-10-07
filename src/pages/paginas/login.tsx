import React from 'react';

const Login: React.FC = () => {
    return (
        <div className="font-sans">
         <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100">
            <div className="relative sm:max-w-md w-full">
                    <div className="card bg-blue-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
                    <div className="card bg-red-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
                <div className="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
                <label htmlFor="remember_me" className="block mt-3 text-sm text-gray-700 text-center font-semibold">
                                <input
                                id="remember_me"
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                name="remember"
                                />
                                <span className="ml-2 text-sm text-gray-600">Login</span>
                            </label>
                            <form method="#" action="#" className="mt-10">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Correo Electrónico
                                    </label>
                                    <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Contraseña
                                    </label>
                                    <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="remember_me" className="inline-flex items-center">
                                    <input
                                        id="remember_me"
                                        name="remember_me"
                                        type="checkbox"
                                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">Recuérdame</span>
                                    </label>
                                    <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                                    ¿Olvidaste tu contraseña?
                                    </a>
                                </div>
                                <div>
                                    <button
                                    type="submit"
                                    className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-indigo-500"
                                    >
                                    Iniciar Sesión
                                    </button>
                                </div>
                            </form>
                     
                        </div>
                    </div>
                </div>                
        </div>
    );
};

export default Login;

