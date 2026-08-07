"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

type Message = {
  id?: number;
  role: "user" | "assistant";
  content: string;
  created_at?: string;
};

export default function ChatAI() {
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  // ==========================================
  // RÉCUPÉRER L'UTILISATEUR ET SON HISTORIQUE
  // ==========================================

  useEffect(() => {
    loadChat();
  }, []);

  async function loadChat() {
    setLoadingHistory(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Si personne n'est connecté
    if (!user) {
      router.push("/login");
      return;
    }

    setUserEmail(user.email || "");

    // Récupération des messages de cet utilisateur
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Erreur historique :", error);
      setLoadingHistory(false);
      return;
    }

    if (data && data.length > 0) {
      setMessages(data);
    } else {
      // Premier message si aucune conversation
      setMessages([
        {
          role: "assistant",
          content:
            "Salut 👋 Je suis StudyAI ! Pose-moi une question et je t'aiderai à comprendre tes cours. 📚",
        },
      ]);
    }

    setLoadingHistory(false);
  }

  // ==========================================
  // ENVOYER UN MESSAGE
  // ==========================================

  async function sendMessage() {
    if (!message.trim() || loading) {
      return;
    }

    const text = message.trim();

    setMessage("");
    setLoading(true);

    // Récupérer l'utilisateur
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    // ==========================================
    // MESSAGE UTILISATEUR
    // ==========================================

    const { data: savedUserMessage, error: userError } =
      await supabase
        .from("messages")
        .insert({
          user_id: user.id,
          role: "user",
          content: text,
        })
        .select()
        .single();

    if (userError) {
      console.error("Erreur sauvegarde utilisateur :", userError);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "❌ Impossible de sauvegarder ton message. Vérifie la configuration Supabase.",
        },
      ]);

      setLoading(false);
      return;
    }

    if (savedUserMessage) {
      setMessages((prev) => [...prev, savedUserMessage]);
    }

    // ==========================================
    // RÉPONSE TEMPORAIRE
    // ==========================================

    const answer = generateStudyAIResponse(text);

    // ==========================================
    // SAUVEGARDER LA RÉPONSE
    // ==========================================

    const { data: savedAssistantMessage, error: assistantError } =
      await supabase
        .from("messages")
        .insert({
          user_id: user.id,
          role: "assistant",
          content: answer,
        })
        .select()
        .single();

    if (assistantError) {
      console.error("Erreur sauvegarde réponse :", assistantError);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: answer,
        },
      ]);

      setLoading(false);
      return;
    }

    if (savedAssistantMessage) {
      setMessages((prev) => [...prev, savedAssistantMessage]);
    }

    setLoading(false);
  }

  // ==========================================
  // RÉPONSE TEMPORAIRE DE STUDYAI
  // ==========================================

  function generateStudyAIResponse(question: string) {
    const lowerQuestion = question.toLowerCase();

    if (
      lowerQuestion.includes("fraction") ||
      lowerQuestion.includes("fractions")
    ) {
      return (
        "📚 Une fraction représente une partie d'un tout.\n\n" +
        "Par exemple, 1/2 signifie que l'on prend 1 partie parmi 2 parties égales.\n\n" +
        "• Le nombre du haut s'appelle le numérateur.\n" +
        "• Le nombre du bas s'appelle le dénominateur.\n\n" +
        "🤖 Le vrai assistant IA sera connecté prochainement pour répondre à toutes tes questions."
      );
    }

    if (
      lowerQuestion.includes("bonjour") ||
      lowerQuestion.includes("salut")
    ) {
      return "Salut 👋 ! Je suis StudyAI. Quelle matière veux-tu travailler aujourd'hui ? 📚";
    }

    if (
      lowerQuestion.includes("math") ||
      lowerQuestion.includes("mathématique")
    ) {
      return (
        "🧮 Les mathématiques permettent de résoudre des problèmes " +
        "en utilisant des nombres, des calculs et des raisonnements.\n\n" +
        "Donne-moi ton exercice et je pourrai t'expliquer la méthode."
      );
    }

    if (
      lowerQuestion.includes("physique")
    ) {
      return (
        "⚡ La physique étudie notamment les mouvements, les forces, " +
        "l'énergie et les phénomènes qui nous entourent."
      );
    }

    return (
      "🤖 J'ai bien reçu ta question :\n\n" +
      `"${question}"\n\n` +
      "Pour l'instant, mon moteur IA est encore en développement. " +
      "Mais ton message a bien été sauvegardé dans ton historique StudyAI ! 💾"
    );
  }

  // ==========================================
  // SUPPRIMER LA CONVERSATION
  // ==========================================

  async function clearChat() {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer toute cette conversation ?"
    );

    if (!confirmed) {
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      console.error("Erreur suppression :", error);

      alert("Impossible de supprimer la conversation.");

      return;
    }

    setMessages([
      {
        role: "assistant",
        content:
          "Conversation supprimée 🧹\n\nSalut 👋 ! On peut recommencer une nouvelle conversation.",
      },
    ]);
  }

  // ==========================================
  // DÉCONNEXION
  // ==========================================

  async function logout() {
    await supabase.auth.signOut();

    router.push("/login");
  }

  // ==========================================
  // AFFICHAGE
  // ==========================================

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">

      <div className="max-w-5xl mx-auto">

        {/* BARRE DU HAUT */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          <button
            onClick={() => router.push("/dashboard")}
            className="text-blue-600 font-semibold hover:underline text-left"
          >
            ← Retour au dashboard
          </button>

          <div className="flex items-center gap-3">

            <div className="hidden md:block text-sm text-gray-500">
              {userEmail}
            </div>

            <button
              onClick={clearChat}
              className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-xl hover:bg-red-50"
            >
              🗑️ Effacer
            </button>

            <button
              onClick={logout}
              className="px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800"
            >
              Déconnexion
            </button>

          </div>

        </div>

        {/* CHAT */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border">

          {/* HEADER */}

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                🤖
              </div>

              <div>

                <h1 className="text-3xl font-bold">
                  Chat StudyAI
                </h1>

                <p className="text-blue-100 mt-1">
                  Ton assistant pour apprendre plus facilement.
                </p>

              </div>

            </div>

          </div>

          {/* MESSAGES */}

          <div className="h-[550px] overflow-y-auto p-5 md:p-8 space-y-5">

            {loadingHistory ? (

              <div className="text-center text-gray-500 py-10">
                Chargement de ta conversation... 🔄
              </div>

            ) : (

              messages.map((msg, index) => (

                <div
                  key={msg.id ?? index}
                  className={`flex ${
                    msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-5 py-4 whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-br-md"
                        : "bg-gray-100 text-gray-800 rounded-bl-md"
                    }`}
                  >

                    <div className="text-xs opacity-70 mb-1">

                      {msg.role === "user"
                        ? "Toi"
                        : "StudyAI 🤖"}

                    </div>

                    <div>
                      {msg.content}
                    </div>

                  </div>

                </div>

              ))

            )}

            {loading && (

              <div className="flex justify-start">

                <div className="bg-gray-100 rounded-2xl px-5 py-4">

                  <div className="text-xs text-gray-500 mb-1">
                    StudyAI 🤖
                  </div>

                  <div>
                    Je réfléchis...
                  </div>

                </div>

              </div>

            )}

          </div>

          {/* ZONE DE SAISIE */}

          <div className="border-t bg-gray-50 p-4 md:p-5">

            <div className="flex gap-3">

              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="Pose ta question..."
                disabled={loading}
                className="flex-1 bg-white border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />

              <button
                onClick={sendMessage}
                disabled={loading || !message.trim()}
                className="bg-blue-600 text-white px-6 rounded-2xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "..." : "Envoyer 🚀"}
              </button>

            </div>

            <p className="text-xs text-gray-500 mt-3 text-center">
              StudyAI sauvegarde automatiquement tes conversations.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}