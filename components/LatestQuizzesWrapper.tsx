'use server'
import { get3SummarySavedQuizzes } from '@/lib/get3SummarySavedQuizzes'
import { LatestQuiz } from './LatestQuiz'
import { Suspense } from 'react'
import { Loader } from '.'
import Await from './Await'
import Link from 'next/link'

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
											<Link href={`/quiz/${quizName}/zapisane-quizy`}>
												<button className='w-full py-[9px] text-lg bg-btn-violet-color  rounded-[8px] text-white cursor-pointer hover:opacity-80'>
													Zobacz więcej
												</button>
											</Link>
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

{
	/* {summarySavedQuizzes?.length === 0 ? (
								<span>Nie masz żadnych zapisanych quizów. </span>
							) : summarySavedQuizzes === null ? (
								<span>Nie masz żadnych zapisanych quizów. </span>
							) : (
								<>
									{summarySavedQuizzes.map(element => (
										<LatestQuiz
											questionNumber={element.questionNumber}
											numberOfCorrectAnswer={element.numberOfCorrectAnswer}
											createdAt={element.createdAt}
											id={element.id}
											quizName={quizName}
										/>
									))}
									<button className='w-full py-[9px] text-lg bg-btn-violet-color  rounded-[8px] text-white cursor-pointer hover:opacity-80'>
										Zobacz więcej
									</button>
								</>
							)} */
}
