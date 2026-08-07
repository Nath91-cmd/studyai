const reasons = [
  {
    icon: "🧠",
    title: "Compréhension intelligente",
    text: "StudyAI explique les notions difficiles avec des mots simples adaptés à ton niveau."
  },
  {
    icon: "⚡",
    title: "Gain de temps",
    text: "Transforme tes cours, exercices et révisions en quelques secondes."
  },
  {
    icon: "🎯",
    title: "Apprentissage personnalisé",
    text: "L'IA s'adapte à tes besoins pour t'aider à progresser plus vite."
  }
];

export default function WhyStudyAI() {
  return (
    <section className="max-w-6xl mx-auto mt-24 px-6">

      <h2 className="text-4xl font-bold text-center text-gray-900">
        Pourquoi choisir StudyAI ?
      </h2>

      <p className="text-center text-gray-600 mt-4">
        Une nouvelle façon d'apprendre avec l'intelligence artificielle.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-12">

        {reasons.map((reason) => (
          <div
            key={reason.title}
            className="bg-white p-8 rounded-3xl shadow hover:shadow-xl transition"
          >
            <div className="text-4xl">
              {reason.icon}
            </div>

            <h3 className="text-xl font-bold mt-4">
              {reason.title}
            </h3>

            <p className="text-gray-600 mt-3">
              {reason.text}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}