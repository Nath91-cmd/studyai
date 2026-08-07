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

export default function DashboardPage() {
  const router = useRouter();

  const [scores, setScores] = useState<QuizScore[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setEmail(user.email ?? "");

      const { data, error } = await supabase
        .from("quiz_scores")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(error);
        setScores([]);
      } else {
        setScores(data ?? []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const totalQuizzes = scores.length;

  const average =
    totalQuizzes === 0
      ? 0
      : Math.round(
          scores.reduce(
            (sum, quiz) => sum + quiz.percentage,
            0
          ) / totalQuizzes
        );

  const bestScore =
    totalQuizzes === 0
      ? 0
      : Math.max(
          ...scores.map((quiz) => quiz.percentage)
        );

  function getSubjectAverage(subject: string) {
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

  function getMessage() {
    if (totalQuizzes === 0) {
      return "Fais ton premier quiz pour commencer ta progression 🚀";
    }

    if (average >= 90) {
      return "Excellent travail ! Tu es vraiment fort 🔥";
    }

    if (average >= 75) {
      return "Très bon travail ! Continue comme ça 💪";
    }

    if (average >= 50) {
      return "Tu progresses bien. Continue tes efforts 📚";
    }

    return "Ne lâche rien ! Chaque erreur te permet d'apprendre 🧠";
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-5">🤖</div>

          <h1 className="text-3xl font-bold text-gray-900">
            StudyAI
          </h1>

          <p className="text-gray-500 mt-2">
            Chargement de ton espace...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

      {/* =========================
          NAVIGATION
      ========================= */}

      <nav className="bg-white border-b shadow-sm">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow">
              🤖
            </div>

            <div>
              <h1 className="text-xl font-bold">
                StudyAI
              </h1>

              <p className="text-xs text-gray-500">
                Assistant scolaire
              </p>
            </div>

          </div>

          <div className="flex items-center gap-4">

            <div className="hidden md:block text-right">
              <p className="text-sm font-semibold">
                {email}
              </p>

              <p className="text-xs text-green-600">
                ● Connecté
              </p>
            </div>

            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800"
            >
              Déconnexion
            </button>

          </div>

        </div>

      </nav>


      {/* =========================
          CONTENU
      ========================= */}

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HERO */}

        <section className="mb-10">

          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-5">
            ✨ Ton espace personnel
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Bonjour 👋
          </h2>

          <p className="text-lg text-gray-600 mt-3">
            Prêt à apprendre quelque chose aujourd'hui ?
          </p>

        </section>


        {/* =========================
            ACTIONS
        ========================= */}

        <section className="grid md:grid-cols-3 gap-6 mb-8">

          <button
            onClick={() => router.push("/dashboard/chat")}
            className="text-left bg-white rounded-3xl border shadow-sm p-7 hover:shadow-xl hover:-translate-y-1 transition-all"
          >

            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-4xl mb-5">
              🤖
            </div>

            <h3 className="text-2xl font-bold">
              Chat IA
            </h3>

            <p className="text-gray-500 mt-2">
              Pose tes questions à StudyAI.
            </p>

            <p className="text-blue-600 font-bold mt-5">
              Poser une question →
            </p>

          </button>


          <button
            onClick={() => router.push("/quiz")}
            className="text-left bg-white rounded-3xl border shadow-sm p-7 hover:shadow-xl hover:-translate-y-1 transition-all"
          >

            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-4xl mb-5">
              📝
            </div>

            <h3 className="text-2xl font-bold">
              Quiz
            </h3>

            <p className="text-gray-500 mt-2">
              Teste tes connaissances.
            </p>

            <p className="text-purple-600 font-bold mt-5">
              Commencer un quiz →
            </p>

          </button>


          <button
            onClick={() => router.push("/fiches")}
            className="text-left bg-white rounded-3xl border shadow-sm p-7 hover:shadow-xl hover:-translate-y-1 transition-all"
          >

            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-4xl mb-5">
              📚
            </div>

            <h3 className="text-2xl font-bold">
              Fiches
            </h3>

            <p className="text-gray-500 mt-2">
              Révise rapidement tes cours.
            </p>

            <p className="text-green-600 font-bold mt-5">
              Voir mes fiches →
            </p>

          </button>

        </section>


        {/* =========================
            STATISTIQUES
        ========================= */}

        <section className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-3xl border shadow-sm p-7">

            <p className="text-gray-500">
              Quiz réalisés
            </p>

            <div className="flex items-center justify-between mt-3">

              <p className="text-5xl font-bold">
                {totalQuizzes}
              </p>

              <span className="text-4xl">
                📝
              </span>

            </div>

          </div>


          <div className="bg-white rounded-3xl border shadow-sm p-7">

            <p className="text-gray-500">
              Moyenne générale
            </p>

            <div className="flex items-center justify-between mt-3">

              <p className="text-5xl font-bold text-blue-600">
                {average}%
              </p>

              <span className="text-4xl">
                📈
              </span>

            </div>

          </div>


          <div className="bg-white rounded-3xl border shadow-sm p-7">

            <p className="text-gray-500">
              Meilleur score
            </p>

            <div className="flex items-center justify-between mt-3">

              <p className="text-5xl font-bold text-purple-600">
                {bestScore}%
              </p>

              <span className="text-4xl">
                🏆
              </span>

            </div>

          </div>

        </section>


        {/* =========================
            MESSAGE
        ========================= */}

        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl p-8 mb-8 shadow-lg">

          <div className="text-4xl mb-4">
            🚀
          </div>

          <h3 className="text-2xl font-bold">
            Ton objectif
          </h3>

          <p className="text-blue-100 text-lg mt-2">
            {getMessage()}
          </p>

        </section>


        {/* =========================
            PROGRESSION
        ========================= */}

        <section className="bg-white rounded-3xl border shadow-sm p-8 mb-8">

          <div className="flex justify-between items-center mb-8">

            <div>

              <h3 className="text-2xl font-bold">
                📊 Ma progression
              </h3>

              <p className="text-gray-500 mt-1">
                Tes résultats par matière.
              </p>

            </div>

            <button
              onClick={() => router.push("/progression")}
              className="px-5 py-3 bg-gray-100 rounded-xl font-semibold hover:bg-gray-200"
            >
              Voir tout →
            </button>

          </div>


          <div className="space-y-7">

            {subjects.map((subject) => {

              const percentage =
                getSubjectAverage(subject.name);

              const count = scores.filter(
                (quiz) =>
                  quiz.subject === subject.name
              ).length;

              return (
                <div key={subject.name}>

                  <div className="flex justify-between items-center mb-3">

                    <div className="flex items-center gap-3">

                      <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center text-xl">
                        {subject.emoji}
                      </div>

                      <div>

                        <p className="font-bold">
                          {subject.name}
                        </p>

                        <p className="text-xs text-gray-400">
                          {count} quiz
                        </p>

                      </div>

                    </div>

                    <p className="font-bold text-blue-600">
                      {percentage}%
                    </p>

                  </div>


                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">

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


        {/* =========================
            DERNIERS QUIZ
        ========================= */}

        <section className="bg-white rounded-3xl border shadow-sm p-8">

          <div className="flex items-center justify-between mb-7">

            <div>

              <h3 className="text-2xl font-bold">
                🕐 Derniers quiz
              </h3>

              <p className="text-gray-500 mt-1">
                Tes derniers résultats.
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

            <div className="text-center py-10">

              <div className="text-6xl mb-5">
                📝
              </div>

              <h4 className="text-xl font-bold">
                Aucun quiz réalisé
              </h4>

              <p className="text-gray-500 mt-2">
                Fais ton premier quiz pour voir tes résultats ici.
              </p>

              <button
                onClick={() => router.push("/quiz")}
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold"
              >
                Faire mon premier quiz 🚀
              </button>

            </div>

          ) : (

            <div className="space-y-3">

              {scores.slice(0, 5).map((quiz) => {

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
                        {subject?.emoji ?? "📚"}
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

                      <p className="text-xs text-gray-400">
                        {quiz.percentage}%
                      </p>

                    </div>

                  </div>

                );
              })}

            </div>

          )}

        </section>


        {/* =========================
            PROGRESSION COMPLÈTE
        ========================= */}

        <button
          onClick={() => router.push("/progression")}
          className="w-full mt-8 bg-gray-900 text-white rounded-2xl py-5 text-lg font-bold hover:bg-gray-800"
        >
          📊 Ouvrir ma progression complète
        </button>


        {/* FOOTER */}

        <footer className="text-center py-10 text-gray-400">
          StudyAI 🤖 — Ton assistant scolaire
        </footer>

      </div>

    </main>
  );
}