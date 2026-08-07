"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");



  async function createAccount() {

    setMessage("");

    if (!email || !password) {
      setMessage("❌ Remplis tous les champs.");
      return;
    }


    setLoading(true);



    const { error } = await supabase.auth.signUp({

      email: email.trim(),

      password: password,

      options: {

        emailRedirectTo: "http://localhost:3000/login",

      },

    });



    if (error) {

      setMessage("❌ " + error.message);

      setLoading(false);

      return;

    }



    setMessage(
      "✅ Compte créé ! Vérifie ton email puis connecte-toi."
    );


    setLoading(false);

  }



  return (

    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-6">


      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">


        <div className="text-center">

          <div className="text-5xl">
            🤖
          </div>


          <h1 className="text-4xl font-bold text-blue-600 mt-3">
            StudyAI
          </h1>


          <h2 className="text-2xl font-bold mt-6">
            Créer un compte
          </h2>


          <p className="text-gray-600 mt-2">
            Rejoins ton assistant IA pour apprendre plus vite.
          </p>


        </div>




        <div className="mt-8 space-y-5">



          <div>

            <label className="font-medium">
              Email
            </label>


            <input

              type="email"

              placeholder="ton@email.com"

              value={email}

              onChange={(e)=>setEmail(e.target.value)}

              className="w-full mt-2 border p-3 rounded-xl"

            />


          </div>





          <div>

            <label className="font-medium">
              Mot de passe
            </label>


            <input

              type="password"

              placeholder="Minimum 6 caractères"

              value={password}

              onChange={(e)=>setPassword(e.target.value)}

              className="w-full mt-2 border p-3 rounded-xl"

            />


          </div>





          <button

            onClick={createAccount}

            disabled={loading}

            className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700"

          >

            {loading 
              ? "Création..."
              : "Créer mon compte 🚀"
            }


          </button>





          {message && (

            <div className="bg-gray-100 p-4 rounded-xl text-center">

              {message}

            </div>

          )}



        </div>



      </div>


    </main>

  );

}