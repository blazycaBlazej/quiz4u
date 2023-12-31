import { Suspense } from 'react'
import SaveQuestion from './SaveQuestion'
import Loading from '@/app/loading'

interface QuizQuestion {
	question: string
	questionNummber?: number
	questionID: number
	quizName: string
}

export const QuizQuestion = ({ question, questionNummber, questionID, quizName }: QuizQuestion) => {
	return (
		<div className='wrapper relative flex w-full max-w-[600px] justify-start p-[20px] pr-[50px] text-lg'>
			{questionNummber ? (
				<>
					{questionNummber}. {question}
				</>
			) : (
				<>{question}</>
			)}

			<span className='absolute right-[20px] top-[20px] cursor-pointer transition-colors hover:text-white dark:hover:text-black'>
				<Suspense fallback={<Loading />}>
					<SaveQuestion questionID={questionID} quizName={quizName} />
				</Suspense>
			</span>
		</div>
	)
}
