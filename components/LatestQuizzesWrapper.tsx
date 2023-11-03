'use server'

import { LatestQuiz } from './LatestQuiz'
import { Suspense } from 'react'
import { Loader } from '.'
import Await from './Await'
import Link from 'next/link'
import Button from './Button'
import { get3SummarySavedQuizzes } from '@/lib/get3SummarySavedQuizzes'

export const LatestQuizzesWrapper = async ({ quizName }: { quizName: string }) => {
	const data = get3SummarySavedQuizzes(quizName)

	return (
		<section className='w-full h-auto sm:w-[50%] '>
			<div className='box bg-light-box dark:bg-dark-box p-[24px] h-[100%]  flex flex-col gap-4'>
				<span className='text-black dark:text-white  text-2xl'>Twoje ostatnie zapisane quizy:</span>
				<div className='flex flex-col gap-3'>
					<Suspense fallback={<Loader />}>
						<Await promise={data}>
							{data => {
								if (!data?.isLogged) {
									return <span>Zaloguj się żeby zobaczyć zapisane quizy.</span>
								}
								if (!data.savedQuizziesSummary || data?.savedQuizziesSummary.length === 0) {
									return <span>Nie masz żadnych zapisanych quizów.</span>
								}

								return (
									<>
										{data?.savedQuizziesSummary.map(element => (
											<LatestQuiz
												key={element.id}
												questionNumber={element.questionNumber}
												numberOfCorrectAnswer={element.numberOfCorrectAnswer}
												createdAt={element.createdAt}
												id={element.id}
												quizName={quizName}
											/>
										))}

										{data.savedQuizziesCount > 3 ? (
											<>
												<span>Aktualna liczba zapisanych quizów: {data.savedQuizziesCount}</span>
												<Button href={`/quiz/${quizName}/zapisane-quizy`} rounded={'sm'}>
													Zobacz więcej
												</Button>
											</>
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
