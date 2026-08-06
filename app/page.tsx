export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600">
          StudyAI
        </h1>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700">
          Connexion
        </button>
      </nav>

      <section className="text-center mt-20 px-5">
        <h2 className="text-5xl font-bold text-gray-900">
          Révise plus vite.
          <br />
          Comprends mieux.
        </h2>

        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
          StudyAI est ton professeur particulier avec intelligence artificielle.
          Il t'aide avec tes exercices, tes fiches et tes révisions.
        </p>

        <button className="mt-8 bg-purple-600 text-white px-8 py-4 rounded-full text-lg hover:bg-purple-700">
          Commencer gratuitement 🚀
        </button>
      </section>

      <section className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-20 px-5">

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-bold">
            📸 Scanner un exercice
          </h3>
          <p className="mt-3 text-gray-600">
            Prends une photo et l'IA t'explique la méthode étape par étape.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-bold">
            📚 Fiches de révision
          </h3>
          <p className="mt-3 text-gray-600">
            Transforme tes cours en fiches simples et efficaces.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-bold">
            📝 Quiz intelligents
          </h3>
          <p className="mt-3 text-gray-600">
            Entraîne-toi avec des quiz générés par l'IA.
          </p>
        </div>

      </section>
    </main>
  );
}