'use client'

import Pagination from '@/components/ui/Pagination'
import { QuestionView } from './QuestionLView'

type dataPromise = {
	questions: {
		id: number
		question: string
		answerA: string
		answerB: string
		answerC: string
		answerD: string
		correctAnswer: string
		quizID: number
	}[]
	questionsNumber: number
} | null

interface AllQuestionsListWrapper {
	data: dataPromise
	quizName: string
	currentPage: number
	perPage: number
}
export const AllQuestionsViewerWrapper = ({ data, quizName, currentPage, perPage }: AllQuestionsListWrapper) => {
	return (
		<div className='flex w-full flex-col items-center'>
			{data ? (
				<>
					<Pagination questionsNumber={data.questionsNumber} perPage={perPage} currentPage={currentPage} />

					<div className='flex flex-col'>
						<div className='mt-[25px] border-b border-solid border-border-color-light dark:border-border-color-dark'></div>
						{data.questions.map((element, index) => (
							<div key={index}>
								<QuestionView
									id={index + 1 + (currentPage - 1) * perPage}
									quizName={quizName}
									questionID={element.id}
									question={element.question}
									answerA={element.answerA}
									answerB={element.answerB}
									answerC={element.answerC}
									answerD={element.answerD}
									correctAnswer={element.correctAnswer}
								/>

								<div className='mt-[45px] border-b border-solid border-border-color-light dark:border-border-color-dark'></div>
							</div>
						))}
					</div>
				</>
			) : (
				<p>Brak pytań w bazie</p>
			)}
		</div>
	)
}
