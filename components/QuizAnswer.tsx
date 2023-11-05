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
			className={`wrapper flex-start border-boder-color flex  h-auto w-full max-w-[600px] items-center gap-4 border-t px-[20px] py-[15px] text-lg  transition-colors  
			${
				checkedQuestion
					? 'cursor-default text-white '
					: 'cursor-pointer hover:bg-element-hover-backgorund-light dark:hover:bg-element-hover-backgorund-dark'
			} ${marked ? 'bg-element-hover-backgorund-light dark:bg-element-hover-backgorund-dark' : ''} ${background}`}
		>
			<div
				className={`flex min-h-[50px]  min-w-[50px] items-center justify-center rounded-full border border-black text-black dark:border-white dark:text-white 
				${checkedQuestion ? 'text-white' : ''}`}
			>
				{letter}
			</div>
			<div>{answer}</div>
		</div>
	)
}
