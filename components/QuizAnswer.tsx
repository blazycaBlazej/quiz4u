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
	checkAnswer?: (checkedAnswer: string) => void
	color: ColorMap
}

export const QuizAnswer = ({ answer, letter, checkAnswer, id, marked, checkedQuestion, color }: QuizAnswerProps) => {
	const background = color[id]

	const handleOnClick = () => {
		if (checkAnswer) {
			checkAnswer(id)
		}
	}

	return (
		<div
			onClick={handleOnClick}
			style={{ backgroundColor: background }}
			className={`wrapper flex flex-start items-center  w-full max-w-[600px] text-lg px-[20px] py-[15px] gap-4 h-auto border-t border-boder-color  transition-colors  ${
				checkedQuestion
					? 'cursor-default text-white '
					: 'cursor-pointer hover:bg-element-hover-backgorund-light dark:hover:bg-element-hover-backgorund-dark'
			} ${marked ? 'bg-element-hover-backgorund-light dark:bg-element-hover-backgorund-dark' : ''} ${background}`}>
			<div
				className={`min-w-[50px] min-h-[50px]  rounded-full flex justify-center items-center border border-black dark:border-white text-black dark:text-white ${
					checkedQuestion ? 'text-white' : ''
				}`}>
				{letter}
			</div>
			<div>{answer}</div>
		</div>
	)
}
