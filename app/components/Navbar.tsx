export default function Navbar() {
  return (
    <nav className="flex justify-between items-center max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600">
        StudyAI
      </h1>

      <div className="flex gap-4 items-center">
        <button className="text-gray-700 hover:text-blue-600">
          Fonctionnalités
        </button>

        <button className="text-gray-700 hover:text-blue-600">
          Tarifs
        </button>

        <button className="bg-black text-white px-5 py-2 rounded-full">
          Connexion
        </button>
      </div>
    </nav>
  );
}