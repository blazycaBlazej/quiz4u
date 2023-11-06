'use server'
import { SavedQuiz } from '@/components/sections/SavedQuiz'
import { getSavedQuiz } from '@/lib/getSavedQuiz'

interface savedQuiz {
	markAnswer: string
	id: number
	question: string
	answerA: string
	answerB: string
	answerC: string
	answerD: string
	correctAnswer: string
	quizID: number
}

const savedQuizzes = async ({ params }: { params: { slug: string; id: string } }) => {
	const quizName = decodeURIComponent(params.slug)
	const id = decodeURIComponent(params.id)

	const savedQuiz = await getSavedQuiz(+id)

	if (savedQuiz === null) {
		return <div>error</div>
	} else {
		return <SavedQuiz quizName={quizName} savedQuiz={savedQuiz as savedQuiz[]} />
	}
}

export default savedQuizzes
