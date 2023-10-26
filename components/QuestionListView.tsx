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
				className={`wrapper flex flex-start items-center  w-full max-w-[600px] text-lg px-[20px] py-[15px] gap-4 h-auto border-t border-boder-color ${
					correctAnswer === 'answerA' ? 'bg-correctAnswer/30 text-white' : ''
				}`}>
				<div className='min-w-[50px] min-h-[50px]  rounded-full flex justify-center items-center border border-white text-white '>
					A.
				</div>
				<div>{answerA}</div>
			</div>
			<div
				className={`wrapper flex flex-start items-center  w-full max-w-[600px] text-lg px-[20px] py-[15px] gap-4 h-auto border-t border-boder-color ${
					correctAnswer === 'answerB' ? 'bg-correctAnswer/30 text-white' : ''
				}`}>
				<div className='min-w-[50px] min-h-[50px]  rounded-full flex justify-center items-center border border-white text-white'>
					B.
				</div>
				<div>{answerB}</div>
			</div>
			<div
				className={`wrapper flex flex-start items-center  w-full max-w-[600px] text-lg px-[20px] py-[15px] gap-4 h-auto border-t border-boder-color ${
					correctAnswer === 'answerC' ? 'bg-correctAnswer/30 text-white' : ''
				}`}>
				<div className='min-w-[50px] min-h-[50px]  rounded-full flex justify-center items-center border border-white text-white'>
					C.
				</div>
				<div>{answerC}</div>
			</div>
			<div
				className={`wrapper flex flex-start items-center  w-full max-w-[600px] text-lg px-[20px] py-[15px] gap-4 h-auto border-t border-boder-color ${
					correctAnswer === 'answerD' ? 'bg-correctAnswer/30 text-white' : ''
				}`}>
				<div className='min-w-[50px] min-h-[50px]  rounded-full flex justify-center items-center border border-white text-white'>
					D.
				</div>
				<div>{answerD}</div>
			</div>
		</div>
	)
}
