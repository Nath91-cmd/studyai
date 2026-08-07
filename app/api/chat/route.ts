import { NextResponse } from "next/server";


export async function POST(req: Request) {

  try {

    const { question } = await req.json();


    if (!question) {

      return NextResponse.json(
        {
          error: "Aucune question reçue"
        },
        {
          status: 400
        }
      );

    }


    const answer = `
Je suis StudyAI 🤖

Ta question :
"${question}"

Mon intelligence artificielle complète arrive bientôt 🚀
Pour l'instant, je suis en mode test.
    `;


    return NextResponse.json({
      answer: answer
    });


  } catch (error) {


    return NextResponse.json(
      {
        error: "Erreur serveur"
      },
      {
        status: 500
      }
    );


  }

}