export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      
      {/* Navigation */}
      <nav className="flex justify-between items-center max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-blue-600">
          StudyAI
        </h1>

        <button className="bg-black text-white px-5 py-2 rounded-full">
          Connexion
        </button>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto text-center mt-20 px-6">
        <h2 className="text-5xl font-bold text-gray-900">
          Ton professeur particulier,
          <br />
          propulsé par l’IA 🤖
        </h2>

        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
          StudyAI aide les élèves à comprendre leurs cours,
          résoudre leurs exercices et réussir leurs examens.
        </p>

        <button className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-full text-lg hover:bg-blue-700">
          Commencer gratuitement 🚀
        </button>
      </section>

      {/* Fonctionnalités */}
      <section className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mt-24 px-6">

        <div className="bg-white p-6 rounded-3xl shadow">
          <h3 className="text-xl font-bold">
            💬 Chat IA
          </h3>
          <p className="mt-3 text-gray-600">
            Pose tes questions et obtiens des explications simples.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <h3 className="text-xl font-bold">
            📸 Scanner
          </h3>
          <p className="mt-3 text-gray-600">
            Scanne un exercice et comprends la correction.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <h3 className="text-xl font-bold">
            📚 Fiches
          </h3>
          <p className="mt-3 text-gray-600">
            Transforme tes cours en fiches de révision.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <h3 className="text-xl font-bold">
            📝 Quiz
          </h3>
          <p className="mt-3 text-gray-600">
            Entraîne-toi avec des quiz générés par l’IA.
          </p>
        </div>

      </section>

    </main>
  );
}