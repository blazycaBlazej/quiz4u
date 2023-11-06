import { QuizQuestion } from '../../quiz/QuizQuestion'
import AnswerView from './AnswerView'

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

export const QuestionView = ({
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
			<AnswerView letter='A' answer={answerA} varaint={correctAnswer === 'answerA' ? 'correct' : 'default'} />
			<AnswerView letter='B' answer={answerB} varaint={correctAnswer === 'answerB' ? 'correct' : 'default'} />
			<AnswerView letter='C' answer={answerC} varaint={correctAnswer === 'answerC' ? 'correct' : 'default'} />
			<AnswerView letter='D' answer={answerD} varaint={correctAnswer === 'answerD' ? 'correct' : 'default'} />
		</div>
	)
}
