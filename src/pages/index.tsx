import Link from "next/link";

const HomePage = () => {
    return (
        <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url(/images/background)" }}>
            <nav className="absolute top-0 left-0 w-full p-4 bg-opacity-50 bg-gray-800">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-white text-2xl font-bold">Logo</h1>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/" className="text-white hover:text-gray-300">Inicio</Link>
                        </li>
                        <li>
                            <Link href="/paginas/carreras" className="text-white hover:text-gray-300">Carreras</Link>
                        </li>
                        <li>
                            <Link href="/programaciones" className="text-white hover:text-gray-300">Programaciones</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="flex items-center justify-center h-full">
                <div className="text-center text-white">
                    <h2 className="text-4xl font-bold mb-4">Bienvenidos a Programaciones</h2>
                    <p className="mb-8">Explora nuestras programaciones y descubre lo que tenemos para ofrecerte.</p>
                    <Link href="/mas-info" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                        Más Información
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
