import { useState } from "react";
import { useRouter } from "next/router";

const CarrerasPage = () => {
    const [nombre, setNombre] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null); // Reset error

        try {
            const response = await fetch("/api/carrera/crearCarrera", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nombre }),
            });

            if (!response.ok) {
                throw new Error("Error al crear la carrera");
            }

            const data = await response.json();
            console.log("Carrera creada:", data);
            // Optionally redirect or reset form
            router.push("/paginas/carreras"); // Redirect to the carreras list
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error desconocido");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="mb-4 text-2xl font-bold">Crear Nueva Carrera</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="nombre">Nombre de la Carrera</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Crear Carrera
                </button>
            </form>
        </div>
    );
};

export default CarrerasPage;
