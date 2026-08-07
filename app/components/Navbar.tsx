import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center max-w-6xl mx-auto p-6">

      <Link href="/">
        <h1 className="text-3xl font-bold text-blue-600">
          StudyAI
        </h1>
      </Link>

      <Link
        href="/login"
        className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800"
      >
        Connexion
      </Link>

    </nav>
  );
}