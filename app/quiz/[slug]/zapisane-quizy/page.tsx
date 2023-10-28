'use server'
import { Loader } from '@/components'
import Await from '@/components/Await'
import { LatestQuiz } from '@/components/LatestQuiz'

import { getAllSummarySavedQuizzes } from '@/lib/getAllSummarySavedQuizzes'

import { Suspense } from 'react'

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

const AllSavedQuizzes = async ({ params }: { params: { slug: string; id: string } }) => {
	const quizName = decodeURIComponent(params.slug)

	const summarySavedQuizzesPromise = getAllSummarySavedQuizzes(quizName)

	return (
		<div className='flex flex-col gap-3 my-[25px]'>
			<h2 className='text-[27px] text-white  '>Zapisane quizy: </h2>
			<Suspense fallback={<Loader />}>
				<Await promise={summarySavedQuizzesPromise}>
					{summarySavedQuizzes => {
						if (!summarySavedQuizzes || summarySavedQuizzes.length === 0) {
							return <span>Nie masz żadnych zapisanych quizów. </span>
						}

						return (
							<>
								{summarySavedQuizzes.map(element => (
									<LatestQuiz
										key={element.id}
										questionNumber={element.questionNumber}
										numberOfCorrectAnswer={element.numberOfCorrectAnswer}
										createdAt={element.createdAt}
										id={element.id}
										quizName={quizName}
									/>
								))}
							</>
						)
					}}
				</Await>
			</Suspense>
		</div>
	)
}

export default AllSavedQuizzes
