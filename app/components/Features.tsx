const features = [
	{
		title: "💬 Chat IA",
		description: "Pose tes questions et obtiens des explications simples."
	},
	{
		title: "📸 Scanner",
		description: "Scanne tes exercices et comprends les corrections."
	},
	{
		title: "📚 Fiches",
		description: "Transforme tes cours en fiches de révision."
	},
	{
		title: "📝 Quiz",
		description: "Entraîne-toi avec des quiz générés par l'IA."
	}
];

export default function Features() {
	return (
		<section className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mt-24 px-6">
			{features.map((feature) => (
				<div
					key={feature.title}
					className="bg-white p-6 rounded-3xl shadow"
				>
					<h3 className="text-xl font-bold">
						{feature.title}
					</h3>

					<p className="mt-3 text-gray-600">
						{feature.description}
					</p>
				</div>
			))}
		</section>
	);
}