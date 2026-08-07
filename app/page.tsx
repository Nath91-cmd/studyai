import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import WhyStudyAI from "./components/WhyStudyAI";
import DashboardPreview from "./components/DashboardPreview";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

      <Navbar />

      <Hero />

      <Features />

      <WhyStudyAI />

      <DashboardPreview />

    </main>
  );
}