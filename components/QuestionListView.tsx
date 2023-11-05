import { QuizQuestion } from './QuizQuestion'

interface QuestionCompleteProps {
	quizName: string
	questionID: number
	question: string
	answerA: string
	answerB: string
	answerC: string
	answerD: string
	correctAnswer: string
	id: number
}

export const QuestionListView = ({
	quizName,
	questionID,
	question,
	answerA,
	answerB,
	answerC,
	answerD,
	correctAnswer,
	id,
}: QuestionCompleteProps) => {
	return (
		<div>
			<QuizQuestion question={question} questionID={questionID} quizName={quizName} questionNummber={id} />
			<div
				className={`wrapper flex-start border-boder-color flex  h-auto w-full max-w-[600px] items-center gap-4 border-t px-[20px] py-[15px] text-lg 
				${
					correctAnswer === 'answerA'
						? 'bg-correctAnswerLight/30 text-black dark:bg-correctAnswerDark/30 dark:text-white '
						: ''
				}`}
			>
				<div className='flex min-h-[50px]  min-w-[50px] items-center justify-center rounded-full border border-black text-black  dark:border-white dark:text-white'>
					A
				</div>
				<div>{answerA}</div>
			</div>
			<div
				className={`wrapper flex-start border-boder-color flex  h-auto w-full max-w-[600px] items-center gap-4 border-t px-[20px] py-[15px] text-lg 
				${
					correctAnswer === 'answerB'
						? 'bg-correctAnswerLight/30 text-black dark:bg-correctAnswerDark/30 dark:text-white '
						: ''
				}`}
			>
				<div className='flex min-h-[50px]  min-w-[50px] items-center justify-center rounded-full border border-black text-black  dark:border-white dark:text-white'>
					B
				</div>
				<div>{answerB}</div>
			</div>
			<div
				className={`wrapper flex-start border-boder-color flex  h-auto w-full max-w-[600px] items-center gap-4 border-t px-[20px] py-[15px] text-lg 
				${
					correctAnswer === 'answerC'
						? 'bg-correctAnswerLight/30 text-black dark:bg-correctAnswerDark/30 dark:text-white '
						: ''
				}`}
			>
				<div className='flex min-h-[50px]  min-w-[50px] items-center justify-center rounded-full border border-black text-black  dark:border-white dark:text-white'>
					C
				</div>
				<div>{answerC}</div>
			</div>
			<div
				className={`wrapper flex-start border-boder-color flex  h-auto w-full max-w-[600px] items-center gap-4 border-t px-[20px] py-[15px] text-lg 
				${
					correctAnswer === 'answerD'
						? 'bg-correctAnswerLight/30 text-black dark:bg-correctAnswerDark/30 dark:text-white '
						: ''
				}`}
			>
				<div className='flex min-h-[50px]  min-w-[50px] items-center justify-center rounded-full border border-black text-black dark:border-white dark:text-white'>
					D
				</div>
				<div>{answerD}</div>
			</div>
		</div>
	)
}
