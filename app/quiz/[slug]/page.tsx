'use server'

import { getNumberQuestionInQuiz } from '@/lib/getNumberQuestionsInQuiz'
import { getQuizDeatails } from '@/lib/getQuizDeatails'
import QuizDeatails from '@/components/sections/quizIDeatails/QuizDeatails'
import { LatestQuizzesWrapper } from '@/components/sections/latestQuiz/LatestQuizzesWrapper'

export default async function QuizPage({ params }: { params: { slug: string } }) {
	const quizName = decodeURIComponent(params.slug)
	const quizDeatails = await getQuizDeatails(quizName)
	const questionsNumber = await getNumberQuestionInQuiz(quizName)

	if (!quizDeatails || typeof questionsNumber !== 'number') {
		return <div>error </div>
	}

	return (
		<main className='flex w-full flex-col'>
			<QuizDeatails
				quizDeatails={quizDeatails}
				questionsNumber={questionsNumber}
				quizName={quizName}
				savedQuizzes={<LatestQuizzesWrapper quizName={quizName} />}
			/>
		</main>
	)
}
