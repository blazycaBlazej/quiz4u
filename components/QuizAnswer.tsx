type ColorMap = {
	[key: string]: string // sygnatura indeksu
	answerA: string
	answerB: string
	answerC: string
	answerD: string
}

interface QuizAnswerProps {
	answer: string
	letter: string
	id: string
	marked: boolean
	checkedQuestion: boolean
	checkAnswer: (checkedAnswer: string) => void
	color: ColorMap
}

export const QuizAnswer = ({ answer, letter, checkAnswer, id, marked, checkedQuestion, color }: QuizAnswerProps) => {
	const background = color[id]
	console.log(background)
	return (
		<div
			onClick={() => checkAnswer(id)}
			style={{ backgroundColor: background }}
			className={`wrapper flex flex-start items-center  w-full max-w-[600px] text-lg px-[20px] py-[15px] gap-4 h-auto border-t border-boder-color  transition-colors  ${
				checkedQuestion ? 'cursor-default text-white' : 'cursor-pointer hover:bg-element-hover-backgorund'
			} ${marked ? 'bg-element-hover-backgorund' : ''} ${background}`}>
			<div className='min-w-[50px] min-h-[50px]  rounded-full flex justify-center items-center border border-white text-white'>
				{letter}
			</div>
			<div>{answer}</div>
		</div>
	)
}
