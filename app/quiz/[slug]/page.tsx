export default function QuizPage({ params }: { params: { slug: string } }) {
	return <h1>{params.slug}</h1>
}
