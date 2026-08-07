import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto text-center mt-20 px-6">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full">
        🤖 Intelligence artificielle pour les élèves
      </div>


      {/* Titre */}
      <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-8">
        Ton professeur particulier,
        <br />
        <span className="text-blue-600">
          propulsé par l’IA 🚀
        </span>
      </h2>


      {/* Description */}
      <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
        StudyAI aide les élèves à comprendre leurs cours,
        résoudre leurs exercices et réussir leurs examens
        grâce à une intelligence artificielle personnalisée.
      </p>


      {/* Boutons */}
      <div className="flex flex-col md:flex-row justify-center gap-5 mt-10">

        <Link
          href="/register"
          className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition"
        >
          Commencer gratuitement 🚀
        </Link>


        <Link
          href="/login"
          className="border border-gray-300 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition"
        >
          Se connecter 🔐
        </Link>

      </div>



      {/* Statistiques */}
      <div className="grid md:grid-cols-3 gap-6 mt-20">

        <div className="bg-white rounded-3xl shadow p-6">
          <p className="text-4xl font-bold text-blue-600">
            +10 000
          </p>
          <p className="text-gray-600 mt-2">
            Exercices expliqués
          </p>
        </div>


        <div className="bg-white rounded-3xl shadow p-6">
          <p className="text-4xl font-bold text-purple-600">
            24/7
          </p>
          <p className="text-gray-600 mt-2">
            Assistant disponible
          </p>
        </div>


        <div className="bg-white rounded-3xl shadow p-6">
          <p className="text-4xl font-bold text-green-600">
            IA
          </p>
          <p className="text-gray-600 mt-2">
            Apprentissage personnalisé
          </p>
        </div>

      </div>


    </section>
  );
}