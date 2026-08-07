"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Fiche = {
  id: number;
  title: string;
  subject: string;
  level: string;
  emoji: string;
  color: string;
  summary: string;
  points: string[];
};

const fiches: Fiche[] = [
  {
    id: 1,
    title: "Les fractions",
    subject: "Mathématiques",
    level: "Collège",
    emoji: "➗",
    color: "blue",
    summary:
      "Une fraction représente une partie d'un tout. Elle est composée d'un numérateur et d'un dénominateur.",
    points: [
      "Le nombre du haut est le numérateur.",
      "Le nombre du bas est le dénominateur.",
      "Le dénominateur ne peut jamais être égal à zéro.",
      "Pour additionner des fractions, il faut généralement avoir le même dénominateur.",
      "Pour multiplier deux fractions, on multiplie les numérateurs entre eux et les dénominateurs entre eux."
    ]
  },

  {
    id: 2,
    title: "Le théorème de Pythagore",
    subject: "Mathématiques",
    level: "Collège",
    emoji: "📐",
    color: "purple",
    summary:
      "Dans un triangle rectangle, le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés.",
    points: [
      "Le triangle doit être rectangle.",
      "L'hypoténuse est le côté opposé à l'angle droit.",
      "La formule est a² + b² = c².",
      "On peut utiliser le théorème pour calculer une longueur.",
      "Il faut toujours identifier l'hypoténuse avant de commencer."
    ]
  },

  {
    id: 3,
    title: "Les forces",
    subject: "Physique",
    level: "Collège",
    emoji: "⚡",
    color: "yellow",
    summary:
      "Une force représente une action exercée sur un objet. Elle peut modifier son mouvement ou le déformer.",
    points: [
      "Une force possède une direction.",
      "Elle possède un sens.",
      "Elle possède une intensité.",
      "Elle possède un point d'application.",
      "L'unité de force est le newton (N)."
    ]
  },

  {
    id: 4,
    title: "La photosynthèse",
    subject: "SVT",
    level: "Collège",
    emoji: "🌱",
    color: "green",
    summary:
      "La photosynthèse permet aux végétaux chlorophylliens de produire leur matière organique grâce à la lumière.",
    points: [
      "La plante utilise de l'eau.",
      "Elle utilise du dioxyde de carbone.",
      "La lumière fournit l'énergie nécessaire.",
      "La photosynthèse se déroule principalement dans les feuilles.",
      "Du dioxygène est rejeté."
    ]
  },

  {
    id: 5,
    title: "Les temps en anglais",
    subject: "Anglais",
    level: "Collège",
    emoji: "🇬🇧",
    color: "red",
    summary:
      "Les temps anglais permettent de situer une action dans le présent, le passé ou le futur.",
    points: [
      "Le présent simple sert notamment à parler des habitudes.",
      "Le présent continu décrit une action en cours.",
      "Le prétérit permet notamment de parler d'une action passée.",
      "Le futur peut être exprimé avec will.",
      "Il faut faire attention aux auxiliaires."
    ]
  },

  {
    id: 6,
    title: "La Révolution française",
    subject: "Histoire",
    level: "Collège",
    emoji: "🇫🇷",
    color: "orange",
    summary:
      "La Révolution française commence en 1789 et transforme profondément l'organisation politique et sociale de la France.",
    points: [
      "La Révolution commence en 1789.",
      "La prise de la Bastille a lieu le 14 juillet 1789.",
      "La Déclaration des droits de l'homme et du citoyen est adoptée en 1789.",
      "La monarchie est renversée en 1792.",
      "La République est proclamée en 1792."
    ]
  }
];

export default function FichesPage() {
  const router = useRouter();

  const [selectedSubject, setSelectedSubject] = useState("Toutes");
  const [selectedFiche, setSelectedFiche] = useState<Fiche | null>(null);
  const [search, setSearch] = useState("");

  const subjects = [
    "Toutes",
    "Mathématiques",
    "Physique",
    "SVT",
    "Anglais",
    "Histoire"
  ];

  const filteredFiches = fiches.filter((fiche) => {
    const matchesSubject =
      selectedSubject === "Toutes" ||
      fiche.subject === selectedSubject;

    const matchesSearch =
      fiche.title.toLowerCase().includes(search.toLowerCase()) ||
      fiche.subject.toLowerCase().includes(search.toLowerCase());

    return matchesSubject && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

      {/* NAVBAR */}

      <nav className="bg-white border-b shadow-sm">

        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-3"
          >

            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center text-2xl">
              🤖
            </div>

            <div className="text-left">

              <div className="text-xl font-bold text-gray-900">
                StudyAI
              </div>

              <div className="text-xs text-gray-500">
                Ton espace d'apprentissage
              </div>

            </div>

          </button>

          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 font-medium"
          >
            ← Dashboard
          </button>

        </div>

      </nav>


      {/* CONTENU */}

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* TITRE */}

        <div className="mb-10">

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            📚 Révisions
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Fiches de révision
          </h1>

          <p className="text-gray-600 mt-3 text-lg max-w-2xl">
            Retrouve les notions importantes de tes cours et révise
            efficacement avec StudyAI.
          </p>

        </div>


        {/* RECHERCHE */}

        <div className="bg-white rounded-3xl shadow-sm border p-5 mb-8">

          <div className="relative">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
              🔎
            </span>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une fiche..."
              className="w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

        </div>


        {/* FILTRES */}

        <div className="flex gap-3 overflow-x-auto pb-4 mb-6">

          {subjects.map((subject) => (

            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`px-5 py-3 rounded-2xl whitespace-nowrap font-semibold transition ${
                selectedSubject === subject
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border hover:bg-gray-50"
              }`}
            >
              {subject}
            </button>

          ))}

        </div>


        {/* NOMBRE DE RÉSULTATS */}

        <div className="mb-5 text-gray-500">

          {filteredFiches.length} fiche
          {filteredFiches.length > 1 ? "s" : ""} disponible
          {filteredFiches.length > 1 ? "s" : ""}

        </div>


        {/* CARTES */}

        {filteredFiches.length === 0 ? (

          <div className="bg-white rounded-3xl p-12 text-center border">

            <div className="text-5xl mb-4">
              🔎
            </div>

            <h2 className="text-2xl font-bold">
              Aucune fiche trouvée
            </h2>

            <p className="text-gray-500 mt-2">
              Essaie une autre recherche ou une autre matière.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredFiches.map((fiche) => (

              <button
                key={fiche.id}
                onClick={() => setSelectedFiche(fiche)}
                className="text-left bg-white rounded-3xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden"
              >

                <div className="p-6">

                  <div className="flex items-center justify-between mb-5">

                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl">
                      {fiche.emoji}
                    </div>

                    <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                      {fiche.level}
                    </span>

                  </div>


                  <div className="text-sm font-semibold text-blue-600 mb-2">
                    {fiche.subject}
                  </div>


                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {fiche.title}
                  </h2>


                  <p className="text-gray-600 line-clamp-3">
                    {fiche.summary}
                  </p>


                  <div className="mt-6 flex items-center justify-between">

                    <span className="text-sm text-gray-500">
                      {fiche.points.length} notions
                    </span>

                    <span className="text-blue-600 font-bold">
                      Ouvrir →
                    </span>

                  </div>

                </div>

              </button>

            ))}

          </div>

        )}

      </div>


      {/* MODALE */}

      {selectedFiche && (

        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">

            {/* HEADER MODALE */}

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-7">

              <div className="flex items-start justify-between gap-4">

                <div>

                  <div className="text-5xl mb-4">
                    {selectedFiche.emoji}
                  </div>

                  <div className="text-blue-100 text-sm font-semibold">
                    {selectedFiche.subject}
                  </div>

                  <h2 className="text-3xl font-bold mt-1">
                    {selectedFiche.title}
                  </h2>

                </div>


                <button
                  onClick={() => setSelectedFiche(null)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-xl"
                >
                  ✕
                </button>

              </div>

            </div>


            {/* CONTENU MODALE */}

            <div className="p-7">

              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-7">

                <div className="font-bold text-blue-700 mb-2">
                  💡 À retenir
                </div>

                <p className="text-gray-700">
                  {selectedFiche.summary}
                </p>

              </div>


              <h3 className="text-2xl font-bold mb-5">
                📝 Les notions importantes
              </h3>


              <div className="space-y-3">

                {selectedFiche.points.map((point, index) => (

                  <div
                    key={index}
                    className="flex gap-4 items-start bg-gray-50 rounded-2xl p-4"
                  >

                    <div className="w-8 h-8 shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>

                    <p className="text-gray-700 pt-1">
                      {point}
                    </p>

                  </div>

                ))}

              </div>


              <div className="mt-8 grid sm:grid-cols-2 gap-3">

                <button
                  onClick={() => {
                    setSelectedFiche(null);
                    router.push("/dashboard/chat");
                  }}
                  className="bg-blue-600 text-white rounded-2xl py-4 font-semibold hover:bg-blue-700"
                >
                  🤖 Demander à StudyAI
                </button>

                <button
                  onClick={() => setSelectedFiche(null)}
                  className="bg-gray-100 text-gray-800 rounded-2xl py-4 font-semibold hover:bg-gray-200"
                >
                  Fermer
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}