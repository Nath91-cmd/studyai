"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

type QuizScore = {
  id: number;
  subject: string;
  score: number;
  total: number;
  percentage: number;
  created_at: string;
};

const subjects = [
  { name: "Mathématiques", emoji: "➗" },
  { name: "Physique", emoji: "⚡" },
  { name: "SVT", emoji: "🌱" },
  { name: "Anglais", emoji: "🇬🇧" },
  { name: "Histoire", emoji: "🏛️" },
];

export default function ProgressionPage() {
  const router = useRouter();

  const [scores, setScores] = useState<QuizScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScores();
  }, []);

  async function loadScores() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data, error } = await supabase
      .from("quiz_scores")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("Erreur :", error);
      setScores([]);
    } else {
      setScores(data || []);
    }

    setLoading(false);
  }

  const totalQuiz = scores.length;

  const average =
    totalQuiz === 0
      ? 0
      : Math.round(
          scores.reduce(
            (sum, quiz) => sum + quiz.percentage,
            0
          ) / totalQuiz
        );

  const bestScore =
    totalQuiz === 0
      ? 0
      : Math.max(
          ...scores.map((quiz) => quiz.percentage)
        );

  function getAverage(subject: string) {
    const list = scores.filter(
      (quiz) => quiz.subject === subject
    );

    if (list.length === 0) {
      return 0;
    }

    return Math.round(
      list.reduce(
        (sum, quiz) => sum + quiz.percentage,
        0
      ) / list.length
    );
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <h1 className="text-2xl font-bold">
            Chargement...
          </h1>
          <p className="text-gray-500 mt-2">
            Récupération de ta progression
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

      {/* NAVBAR */}

      <nav className="bg-white border-b shadow-sm">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-3"
          >

            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl text-white">
              🤖
            </div>

            <div className="text-left">

              <h1 className="font-bold text-xl">
                StudyAI
              </h1>

              <p className="text-xs text-gray-500">
                Ma progression
              </p>

            </div>

          </button>

          <div className="flex gap-3">

            <button
              onClick={() => router.push("/dashboard")}
              className="px-4 py-2 bg-gray-100 rounded-xl font-semibold hover:bg-gray-200"
            >
              ← Dashboard
            </button>

            <button
              onClick={logout}
              className="px-4 py-2 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800"
            >
              Déconnexion
            </button>

          </div>

        </div>

      </nav>


      {/* CONTENU */}

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* TITRE */}

        <div className="mb-10">

          <div className="inline-flex px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-semibold text-sm mb-4">
            📊 Tableau de progression
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Mes progrès
          </h2>

          <p className="text-gray-600 text-lg mt-3">
            Suis tes résultats et vois tes points forts.
          </p>

        </div>


        {/* STATISTIQUES */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white border rounded-3xl p-7 shadow-sm">

            <p className="text-gray-500">
              Quiz réalisés
            </p>

            <p className="text-5xl font-bold mt-3">
              {totalQuiz}
            </p>

            <p className="text-gray-400 mt-2">
              quiz terminés
            </p>

          </div>


          <div className="bg-white border rounded-3xl p-7 shadow-sm">

            <p className="text-gray-500">
              Moyenne générale
            </p>

            <p className="text-5xl font-bold text-blue-600 mt-3">
              {average}%
            </p>

            <p className="text-gray-400 mt-2">
              sur tous tes quiz
            </p>

          </div>


          <div className="bg-white border rounded-3xl p-7 shadow-sm">

            <p className="text-gray-500">
              Meilleur score
            </p>

            <p className="text-5xl font-bold text-purple-600 mt-3">
              {bestScore}%
            </p>

            <p className="text-gray-400 mt-2">
              ton meilleur résultat
            </p>

          </div>

        </div>


        {/* MATIÈRES */}

        <section className="bg-white border rounded-3xl shadow-sm p-8 mb-10">

          <h3 className="text-2xl font-bold">
            📚 Progression par matière
          </h3>

          <p className="text-gray-500 mt-2 mb-8">
            Ta moyenne dans chaque matière.
          </p>


          <div className="space-y-8">

            {subjects.map((subject) => {

              const percentage =
                getAverage(subject.name);

              const quizNumber =
                scores.filter(
                  (quiz) =>
                    quiz.subject === subject.name
                ).length;

              return (

                <div key={subject.name}>

                  <div className="flex items-center justify-between mb-3">

                    <div className="flex items-center gap-3">

                      <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl">
                        {subject.emoji}
                      </div>

                      <div>

                        <p className="font-bold">
                          {subject.name}
                        </p>

                        <p className="text-sm text-gray-400">
                          {quizNumber} quiz
                        </p>

                      </div>

                    </div>

                    <p className="text-xl font-bold text-blue-600">
                      {percentage}%
                    </p>

                  </div>


                  <div className="w-full h-5 bg-gray-100 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-700"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                </div>

              );
            })}

          </div>

        </section>


        {/* HISTORIQUE */}

        <section className="bg-white border rounded-3xl shadow-sm p-8">

          <div className="flex items-center justify-between mb-7">

            <div>

              <h3 className="text-2xl font-bold">
                🕐 Historique des quiz
              </h3>

              <p className="text-gray-500 mt-2">
                Tous tes derniers résultats.
              </p>

            </div>

            <button
              onClick={() => router.push("/quiz")}
              className="px-5 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
            >
              Nouveau quiz
            </button>

          </div>


          {scores.length === 0 ? (

            <div className="text-center py-14">

              <div className="text-6xl mb-5">
                📚
              </div>

              <h4 className="text-xl font-bold">
                Pas encore de résultat
              </h4>

              <p className="text-gray-500 mt-2">
                Fais un quiz pour voir ta progression.
              </p>

              <button
                onClick={() => router.push("/quiz")}
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold"
              >
                Faire un quiz 🚀
              </button>

            </div>

          ) : (

            <div className="space-y-3">

              {scores.map((quiz) => {

                const subject = subjects.find(
                  (item) =>
                    item.name === quiz.subject
                );

                return (

                  <div
                    key={quiz.id}
                    className="flex items-center justify-between bg-gray-50 rounded-2xl p-5"
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl">
                        {subject?.emoji || "📚"}
                      </div>

                      <div>

                        <p className="font-bold">
                          {quiz.subject}
                        </p>

                        <p className="text-sm text-gray-400">
                          {new Date(
                            quiz.created_at
                          ).toLocaleDateString("fr-FR")}
                        </p>

                      </div>

                    </div>


                    <div className="text-right">

                      <p
                        className={`text-xl font-bold ${
                          quiz.percentage >= 80
                            ? "text-green-600"
                            : quiz.percentage >= 50
                            ? "text-orange-500"
                            : "text-red-500"
                        }`}
                      >
                        {quiz.score}/{quiz.total}
                      </p>

                      <p className="text-sm text-gray-400">
                        {quiz.percentage}%
                      </p>

                    </div>

                  </div>

                );
              })}

            </div>

          )}

        </section>


        {/* BOUTON CHAT */}

        <button
          onClick={() => router.push("/dashboard/chat")}
          className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl py-5 text-lg font-bold hover:opacity-90 transition"
        >
          🤖 Retourner discuter avec StudyAI
        </button>


        {/* FOOTER */}

        <footer className="text-center py-10 text-gray-400">
          StudyAI 🤖 — Continue tes efforts !
        </footer>

      </div>

    </main>
  );
}