'use client'
import { QuizAnswer } from '@/components/QuizAnswer'
import { QuizQuestion } from '@/components/QuizQuestion'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { quiz } from '@/types/types'

interface CompleteQuizProps {
	question: quiz
	quizName: string
}

interface ChildComponentHandle {
	getColor: () => { answerA: string; answerB: string; answerC: string; answerD: string }
	getCheckedQuestion: () => boolean
	getMarkAnswer: () => string
	setMarkAnswer: (newState: string) => void
	setCheckedQuestion: (newState: boolean) => void
	setColor: (newState: { answerA: string; answerB: string; answerC: string; answerD: string }) => void
}

export const CompleteQuiz = forwardRef<ChildComponentHandle, CompleteQuizProps>((props, ref) => {
	const { question, quizName } = props
	const [markAnswer, setMarkAnswer] = useState<string>('')
	const [checkedQuestion, setCheckedQuestion] = useState<boolean>(false)
	const [color, setColor] = useState<{ answerA: string; answerB: string; answerC: string; answerD: string }>({
		answerA: '',
		answerB: '',
		answerC: '',
		answerD: '',
	})

	useImperativeHandle(ref, () => ({
		getColor() {
			return color
		},
		getCheckedQuestion() {
			return checkedQuestion
		},
		getMarkAnswer() {
			return markAnswer
		},
		setMarkAnswer(newState: string) {
			setMarkAnswer(newState)
		},
		setCheckedQuestion(newState: boolean) {
			setCheckedQuestion(newState)
		},
		setColor(newState: { answerA: string; answerB: string; answerC: string; answerD: string }) {
			setColor(newState)
		},
	}))

	//zaznacz
	const checkAnswer = (checkedAnswer: string) => {
		if (!checkedQuestion) {
			setMarkAnswer(checkedAnswer)
		}
	}

	return (
		<div className='relative rounded-[20px] border border-solid border-border-color max-w-[600px] w-full'>
			<QuizQuestion question={question.question} questionID={question.id} quizName={quizName} />
			<QuizAnswer
				letter={'A'}
				answer={question.answerA}
				id='answerA'
				marked={'answerA' === markAnswer}
				checkAnswer={checkAnswer}
				checkedQuestion={checkedQuestion}
				color={color}
			/>
			<QuizAnswer
				letter={'B'}
				answer={question.answerB}
				id='answerB'
				marked={'answerB' === markAnswer}
				checkAnswer={checkAnswer}
				checkedQuestion={checkedQuestion}
				color={color}
			/>
			<QuizAnswer
				letter={'C'}
				answer={question.answerC}
				id='answerC'
				marked={'answerC' === markAnswer}
				checkAnswer={checkAnswer}
				checkedQuestion={checkedQuestion}
				color={color}
			/>
			<QuizAnswer
				letter={'D'}
				answer={question.answerD}
				id='answerD'
				marked={'answerD' === markAnswer}
				checkAnswer={checkAnswer}
				checkedQuestion={checkedQuestion}
				color={color}
			/>
		</div>
	)
})
