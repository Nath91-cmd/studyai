export default function Hero() {
	return (
		<section className="max-w-6xl mx-auto text-center mt-20 px-6">
			<h2 className="text-5xl font-bold text-gray-900">
				Ton professeur particulier,
				<br />
				propulsé par l’IA 🤖
			</h2>

			<p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
				StudyAI aide les élèves à comprendre leurs cours, résoudre leurs exercices et réussir leurs examens grâce à l&apos;intelligence artificielle.
			</p>

			<div className="mt-8 flex justify-center gap-4">
				<button className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg hover:bg-blue-700">
					Commencer gratuitement 🚀
				</button>

				<button className="border border-gray-300 px-8 py-4 rounded-full text-lg hover:bg-gray-100">
					Découvrir StudyAI
				</button>
			</div>
		</section>
	);
}
