interface QuizQuestion {
	question: string
}

export const QuizQuestion = ({ question }: QuizQuestion) => {
	return <div className='wrapper flex justify-start w-full max-w-[600px] text-lg p-[20px] pr-[50px]'>{question}</div>
}
