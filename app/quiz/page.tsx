"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

type Question = {
  question: string;
  answers: string[];
  correct: number;
  explanation: string;
};

type Quiz = {
  subject: string;
  emoji: string;
  questions: Question[];
};

const quizzes: Quiz[] = [
  {
    subject: "Mathématiques",
    emoji: "➗",
    questions: [
      {
        question: "Combien font 1/2 + 1/2 ?",
        answers: ["1", "1/2", "2", "1/4"],
        correct: 0,
        explanation: "1/2 + 1/2 = 2/2 = 1.",
      },
      {
        question: "Combien font 5 × 4 ?",
        answers: ["9", "15", "20", "25"],
        correct: 2,
        explanation: "5 × 4 = 20.",
      },
      {
        question: "Quel est le carré de 6 ?",
        answers: ["12", "18", "30", "36"],
        correct: 3,
        explanation: "6² = 6 × 6 = 36.",
      },
      {
        question: "Combien font 100 ÷ 4 ?",
        answers: ["20", "25", "40", "50"],
        correct: 1,
        explanation: "100 ÷ 4 = 25.",
      },
      {
        question: "Quel nombre est premier ?",
        answers: ["9", "15", "17", "21"],
        correct: 2,
        explanation: "17 est divisible uniquement par 1 et par 17.",
      },
    ],
  },

  {
    subject: "Physique",
    emoji: "⚡",
    questions: [
      {
        question: "Quelle est l'unité de la force ?",
        answers: ["Watt", "Newton", "Volt", "Joule"],
        correct: 1,
        explanation: "L'unité de force est le newton, noté N.",
      },
      {
        question: "Quelle est l'unité de l'énergie ?",
        answers: ["Joule", "Newton", "Ampère", "Pascal"],
        correct: 0,
        explanation: "L'énergie se mesure en joules (J).",
      },
      {
        question: "Quelle grandeur se mesure en volts ?",
        answers: ["Masse", "Tension électrique", "Force", "Énergie"],
        correct: 1,
        explanation: "La tension électrique se mesure en volts (V).",
      },
      {
        question: "Quel objet peut produire une tension électrique ?",
        answers: ["Une pile", "Une règle", "Un cahier", "Une gomme"],
        correct: 0,
        explanation: "Une pile est un générateur électrique.",
      },
      {
        question: "Quel appareil mesure une tension ?",
        answers: ["Ampèremètre", "Voltmètre", "Balance", "Thermomètre"],
        correct: 1,
        explanation: "Le voltmètre mesure la tension électrique.",
      },
    ],
  },

  {
    subject: "SVT",
    emoji: "🌱",
    questions: [
      {
        question:
          "De quoi une plante a-t-elle besoin pour réaliser la photosynthèse ?",
        answers: [
          "Lumière, eau et CO₂",
          "Seulement de l'eau",
          "Seulement de l'oxygène",
          "Du sucre uniquement",
        ],
        correct: 0,
        explanation:
          "La photosynthèse utilise notamment la lumière, l'eau et le dioxyde de carbone.",
      },
      {
        question: "Quel gaz est rejeté lors de la photosynthèse ?",
        answers: ["CO₂", "O₂", "Azote", "Hydrogène"],
        correct: 1,
        explanation: "La photosynthèse produit notamment du dioxygène.",
      },
      {
        question:
          "Quel organe permet principalement les échanges gazeux chez la plante ?",
        answers: ["La racine", "La feuille", "La graine", "Le fruit"],
        correct: 1,
        explanation:
          "Les feuilles possèdent notamment des stomates permettant les échanges gazeux.",
      },
      {
        question: "Quel organe absorbe principalement l'eau du sol ?",
        answers: ["La fleur", "La feuille", "Les racines", "Le fruit"],
        correct: 2,
        explanation:
          "Les racines absorbent l'eau et les sels minéraux du sol.",
      },
      {
        question: "Quelle molécule transporte l'information génétique ?",
        answers: ["ADN", "Eau", "Glucose", "Oxygène"],
        correct: 0,
        explanation: "L'ADN contient l'information génétique.",
      },
    ],
  },

  {
    subject: "Anglais",
    emoji: "🇬🇧",
    questions: [
      {
        question: "Comment dit-on « maison » en anglais ?",
        answers: ["House", "School", "Car", "Book"],
        correct: 0,
        explanation: "Maison se traduit par « house ».",
      },
      {
        question: "Quel est le prétérit de « go » ?",
        answers: ["Goed", "Gone", "Went", "Going"],
        correct: 2,
        explanation: "Le prétérit de go est went.",
      },
      {
        question: "Que signifie « book » ?",
        answers: ["Table", "Livre", "Chaise", "Porte"],
        correct: 1,
        explanation: "Book signifie livre.",
      },
      {
        question: "Complète : I ___ 14 years old.",
        answers: ["am", "is", "are", "be"],
        correct: 0,
        explanation: "Avec I, on utilise « am ».",
      },
      {
        question: "Que signifie « thank you » ?",
        answers: ["Bonjour", "Au revoir", "Merci", "S'il te plaît"],
        correct: 2,
        explanation: "Thank you signifie merci.",
      },
    ],
  },

  {
    subject: "Histoire",
    emoji: "🇫🇷",
    questions: [
      {
        question: "En quelle année commence la Révolution française ?",
        answers: ["1789", "1815", "1914", "1945"],
        correct: 0,
        explanation: "La Révolution française commence en 1789.",
      },
      {
        question: "Quand a lieu la prise de la Bastille ?",
        answers: [
          "14 juillet 1789",
          "11 novembre 1918",
          "8 mai 1945",
          "1er janvier 1800",
        ],
        correct: 0,
        explanation: "La Bastille est prise le 14 juillet 1789.",
      },
      {
        question: "Quel régime est proclamé en France en 1792 ?",
        answers: ["Empire", "République", "Monarchie", "Dictature"],
        correct: 1,
        explanation: "La Première République est proclamée en 1792.",
      },
      {
        question: "Quel roi est exécuté pendant la Révolution ?",
        answers: ["Louis XIV", "Louis XV", "Louis XVI", "Charles X"],
        correct: 2,
        explanation: "Louis XVI est exécuté en janvier 1793.",
      },
      {
        question: "Quel document est adopté en 1789 ?",
        answers: [
          "La Déclaration des droits de l'homme et du citoyen",
          "Le Code civil",
          "La Constitution européenne",
          "Le traité de Versailles",
        ],
        correct: 0,
        explanation:
          "La Déclaration des droits de l'homme et du citoyen est adoptée en 1789.",
      },
    ],
  },
];

export default function QuizPage() {
  const router = useRouter();

  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [savingScore, setSavingScore] = useState(false);
  const [scoreSaved, setScoreSaved] = useState(false);

  function startQuiz(quiz: Quiz) {
    setSelectedQuiz(quiz);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setFinished(false);
    setScoreSaved(false);
  }

  function chooseAnswer(index: number) {
    if (selectedAnswer !== null) {
      return;
    }

    setSelectedAnswer(index);

    if (
      selectedQuiz &&
      index === selectedQuiz.questions[questionIndex].correct
    ) {
      setScore((previous) => previous + 1);
    }
  }

  async function saveScore(finalScore: number) {
    if (!selectedQuiz || scoreSaved) {
      return;
    }

    setSavingScore(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Erreur utilisateur :", userError);
        return;
      }

      if (!user) {
        console.error("Utilisateur non connecté");
        router.push("/login");
        return;
      }

      const total = selectedQuiz.questions.length;

      const percentage = Math.round(
        (finalScore / total) * 100
      );

      const { error } = await supabase
        .from("quiz_scores")
        .insert({
          user_id: user.id,
          subject: selectedQuiz.subject,
          score: finalScore,
          total: total,
          percentage: percentage,
        });

      if (error) {
        console.error(
          "Erreur sauvegarde score :",
          error
        );
        return;
      }

      setScoreSaved(true);
    } catch (error) {
      console.error("Erreur inattendue :", error);
    } finally {
      setSavingScore(false);
    }
  }

  async function nextQuestion() {
    if (!selectedQuiz || selectedAnswer === null) {
      return;
    }

    const currentQuestion =
      selectedQuiz.questions[questionIndex];

    const lastQuestion =
      questionIndex ===
      selectedQuiz.questions.length - 1;

    if (lastQuestion) {
      const finalScore =
        score +
        (selectedAnswer === currentQuestion.correct
          ? 1
          : 0);

      setScore(finalScore);
      setFinished(true);

      await saveScore(finalScore);

      return;
    }

    setQuestionIndex((previous) => previous + 1);
    setSelectedAnswer(null);
  }

  function restartQuiz() {
    if (!selectedQuiz) {
      return;
    }

    startQuiz(selectedQuiz);
  }

  function backToQuizzes() {
    setSelectedQuiz(null);
    setFinished(false);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setScoreSaved(false);
  }

  function getResultMessage() {
    if (!selectedQuiz) {
      return "";
    }

    const percentage =
      (score / selectedQuiz.questions.length) * 100;

    if (percentage === 100) {
      return "🏆 Excellent ! Tu maîtrises parfaitement le sujet !";
    }

    if (percentage >= 80) {
      return "🔥 Très bon travail ! Continue comme ça !";
    }

    if (percentage >= 60) {
      return "👍 Pas mal ! Encore quelques révisions et ce sera parfait.";
    }

    if (percentage >= 40) {
      return "📚 Tu peux encore progresser. Relis tes fiches et réessaie.";
    }

    return "💪 Ne lâche rien ! Les erreurs servent à apprendre.";
  }

  if (!selectedQuiz) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

        <nav className="bg-white border-b shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-3"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center text-2xl">
                🤖
              </div>

              <div className="text-left">
                <div className="font-bold text-xl">
                  StudyAI
                </div>

                <div className="text-xs text-gray-500">
                  Quiz
                </div>
              </div>
            </button>

            <button
              onClick={() => router.push("/dashboard")}
              className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200"
            >
              ← Dashboard
            </button>

          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-6 py-12">

          <div className="text-center mb-12">

            <div className="inline-flex px-5 py-2 rounded-full bg-purple-100 text-purple-700 font-semibold mb-5">
              📝 Teste tes connaissances
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Quiz StudyAI
            </h1>

            <p className="text-gray-600 text-lg mt-4">
              Choisis une matière et teste tes connaissances.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {quizzes.map((quiz) => (
              <button
                key={quiz.subject}
                onClick={() => startQuiz(quiz)}
                className="text-left bg-white border rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >

                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-4xl mb-6">
                  {quiz.emoji}
                </div>

                <h2 className="text-2xl font-bold">
                  {quiz.subject}
                </h2>

                <p className="text-gray-500 mt-2">
                  {quiz.questions.length} questions
                </p>

                <div className="mt-6 text-blue-600 font-bold">
                  Commencer →
                </div>

              </button>
            ))}

          </div>

        </div>
      </main>
    );
  }

  if (finished) {
    const percentage = Math.round(
      (score / selectedQuiz.questions.length) * 100
    );

    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-xl w-full text-center">

          <div className="text-7xl mb-6">
            {percentage >= 80 ? "🏆" : "📚"}
          </div>

          <h1 className="text-4xl font-bold">
            Quiz terminé !
          </h1>

          <p className="text-gray-500 mt-3">
            {selectedQuiz.subject}
          </p>

          <div className="my-10">

            <div className="text-7xl font-bold text-blue-600">
              {score}/{selectedQuiz.questions.length}
            </div>

            <div className="text-2xl font-semibold mt-2">
              {percentage}%
            </div>

          </div>

          <div className="bg-blue-50 rounded-2xl p-5 mb-5 text-gray-700">
            {getResultMessage()}
          </div>

          {savingScore && (
            <div className="text-sm text-gray-500 mb-5">
              💾 Sauvegarde de ton score...
            </div>
          )}

          {scoreSaved && (
            <div className="text-sm text-green-600 font-semibold mb-5">
              ✅ Score enregistré dans ta progression !
            </div>
          )}

          <div className="grid gap-3">

            <button
              onClick={restartQuiz}
              className="bg-blue-600 text-white rounded-2xl py-4 font-bold hover:bg-blue-700"
            >
              🔄 Recommencer
            </button>

            <button
              onClick={backToQuizzes}
              className="bg-gray-100 rounded-2xl py-4 font-bold hover:bg-gray-200"
            >
              📝 Autre quiz
            </button>

            <button
              onClick={() => router.push("/progression")}
              className="bg-purple-100 text-purple-700 rounded-2xl py-4 font-bold hover:bg-purple-200"
            >
              📊 Voir ma progression
            </button>

            <button
              onClick={() => router.push("/dashboard")}
              className="text-gray-500 py-3"
            >
              ← Retour au dashboard
            </button>

          </div>

        </div>
      </main>
    );
  }

  const question =
    selectedQuiz.questions[questionIndex];

  const progress =
    ((questionIndex + 1) /
      selectedQuiz.questions.length) *
    100;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">

      <div className="max-w-3xl mx-auto">

        <button
          onClick={backToQuizzes}
          className="text-blue-600 font-semibold mb-6"
        >
          ← Quitter le quiz
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">

            <div className="flex justify-between items-center">

              <div>

                <div className="text-blue-100 text-sm">
                  {selectedQuiz.emoji}{" "}
                  {selectedQuiz.subject}
                </div>

                <h1 className="text-2xl font-bold mt-1">
                  Quiz StudyAI
                </h1>

              </div>

              <div className="font-bold">
                {questionIndex + 1}/
                {selectedQuiz.questions.length}
              </div>

            </div>

            <div className="mt-5 h-2 bg-white/20 rounded-full overflow-hidden">

              <div
                className="h-full bg-white rounded-full transition-all"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>

          <div className="p-6 md:p-10">

            <div className="mb-8">

              <div className="text-sm text-gray-500 mb-3">
                Question {questionIndex + 1}
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {question.question}
              </h2>

            </div>

            <div className="space-y-4">

              {question.answers.map(
                (answer, index) => {

                  const isSelected =
                    selectedAnswer === index;

                  const isCorrect =
                    index === question.correct;

                  let style =
                    "border-gray-200 hover:border-blue-400 hover:bg-blue-50";

                  if (selectedAnswer !== null) {

                    if (isCorrect) {
                      style =
                        "border-green-500 bg-green-50 text-green-800";
                    } else if (isSelected) {
                      style =
                        "border-red-500 bg-red-50 text-red-800";
                    } else {
                      style =
                        "border-gray-200 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() =>
                        chooseAnswer(index)
                      }
                      className={`w-full text-left border-2 rounded-2xl p-5 transition-all ${style}`}
                    >

                      <div className="flex items-center gap-4">

                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-bold">
                          {String.fromCharCode(
                            65 + index
                          )}
                        </div>

                        <span className="font-medium">
                          {answer}
                        </span>

                      </div>

                    </button>
                  );
                }
              )}

            </div>

            {selectedAnswer !== null && (
              <div className="mt-7">

                <div className="bg-gray-50 rounded-2xl p-5 mb-5">

                  <div className="font-bold mb-2">
                    💡 Explication
                  </div>

                  <p className="text-gray-700">
                    {question.explanation}
                  </p>

                </div>

                <button
                  onClick={nextQuestion}
                  disabled={savingScore}
                  className="w-full bg-blue-600 text-white rounded-2xl py-4 font-bold hover:bg-blue-700 disabled:opacity-50"
                >
                  {questionIndex + 1 ===
                  selectedQuiz.questions.length
                    ? savingScore
                      ? "Sauvegarde..."
                      : "Voir mon résultat 🏆"
                    : "Question suivante →"}
                </button>

              </div>
            )}

          </div>
        </div>
      </div>

    </main>
  );
}