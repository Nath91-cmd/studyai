export default function DashboardPreview() {
  return (
    <section className="max-w-6xl mx-auto mt-24 px-6 pb-20">

      <h2 className="text-4xl font-bold text-center text-gray-900">
        Découvre ton espace StudyAI 🚀
      </h2>

      <p className="text-center text-gray-600 mt-4">
        Un tableau de bord intelligent pour apprendre plus efficacement.
      </p>


      <div className="mt-12 bg-white rounded-3xl shadow-xl p-8">

        <div className="grid md:grid-cols-3 gap-6">

          {/* Assistant IA */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold">
              🤖 Assistant IA
            </h3>

            <div className="mt-5 bg-white rounded-xl p-4 shadow">
              <p className="text-gray-500 text-sm">
                Toi :
              </p>
              <p>
                Explique-moi les fractions.
              </p>
            </div>

            <div className="mt-3 bg-blue-600 text-white rounded-xl p-4">
              Les fractions représentent une partie d'un ensemble...
            </div>
          </div>


          {/* Progression */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold">
              📈 Progression
            </h3>

            <p className="text-5xl font-bold text-blue-600 mt-6">
              82%
            </p>

            <p className="text-gray-600 mt-2">
              Objectif de la semaine atteint
            </p>
          </div>


          {/* Révisions */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold">
              📚 Révisions
            </h3>

            <div className="mt-5 space-y-3">
              <p>✅ Mathématiques</p>
              <p>✅ Anglais</p>
              <p>⏳ Physique</p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}