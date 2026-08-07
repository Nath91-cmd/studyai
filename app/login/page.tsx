"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function loginUser() {
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Entre ton email et ton mot de passe.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      router.push("/dashboard");
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-6">

      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-blue-600">
          StudyAI 🤖
        </h1>

        <h2 className="text-2xl font-bold text-center mt-6">
          Connexion 🔐
        </h2>

        <p className="text-gray-600 text-center mt-2">
          Connecte-toi à ton espace StudyAI.
        </p>

        <div className="mt-8 space-y-5">

          <div>
            <label className="text-gray-700 font-medium">
              Adresse email
            </label>

            <input
              type="email"
              placeholder="ton@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">
              Mot de passe
            </label>

            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {errorMessage && (
            <div className="bg-red-100 text-red-700 p-3 rounded-xl">
              ❌ {errorMessage}
            </div>
          )}

          <button
            onClick={loginUser}
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter 🚀"}
          </button>

        </div>

        <div className="text-center mt-6">

          <p className="text-gray-600">
            Pas encore de compte ?
          </p>

          <button
            onClick={() => router.push("/register")}
            className="text-blue-600 font-semibold mt-2 hover:underline"
          >
            Créer un compte
          </button>

        </div>

      </div>

    </main>
  );
}