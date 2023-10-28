'use server'
import { get3SummarySavedQuizzes } from '@/lib/get3SummarySavedQuizzes'
import { LatestQuiz } from './LatestQuiz'
import { Suspense } from 'react'
import { Loader } from '.'
import Await from './Await'
import Link from 'next/link'
import Button from './Button'

export const LatestQuizzesWrapper = async ({ quizName }: { quizName: string }) => {
	const summarySavedQuizzesPromise = get3SummarySavedQuizzes(quizName)

	return (
		<section className='w-full max-w-[50%]'>
			<div className='dark-box  p-[24px] flex flex-col gap-4'>
				<span className='text-white text-2xl'>Twoje ostatnie zapisane quizy:</span>
				<div className='flex flex-col gap-3'>
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

										{summarySavedQuizzes.length === 3 ? (
											<Button href={`/quiz/${quizName}/zapisane-quizy`} rounded={'sm'}>
												Zobacz więcej
											</Button>
										) : (
											''
										)}
									</>
								)
							}}
						</Await>
					</Suspense>
				</div>
			</div>
		</section>
	)
}
