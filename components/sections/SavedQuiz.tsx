'use client'
import { useState } from 'react'
import { QuizQuestion } from '@/components/quiz/QuizQuestion'
import { QuizAnswer } from '@/components/quiz/QuizAnswer'

type QuizItemChecker = {
	id: number
	markAnswer: string
	color: {
		answerA: string
		answerB: string
		answerC: string
		answerD: string
	}
	checkedQuestion: boolean
	message: string
	isCorrectAnswer: boolean | null
}

type QuizItemCheckerState = QuizItemChecker[]

interface savedQuiz {
	markAnswer: string
	id: number
	question: string
	answerA: string
	answerB: string
	answerC: string
	answerD: string
	correctAnswer: string
	quizID: number
}

interface SavedQuizProps {
	quizName: string
	savedQuiz: savedQuiz[]
}

export const SavedQuiz = ({ savedQuiz, quizName }: SavedQuizProps) => {
	const [questionIndex, setQuestionIndex] = useState(0)

	const quiz: QuizItemCheckerState = []

	let correctAnswer = 0

	for (let i = 0; i < savedQuiz.length; i++) {
		let color = {
			answerA: '',
			answerB: '',
			answerC: '',
			answerD: '',
		}
		let isCorrectAnswer: boolean | null = null
		let message: string = ''

		if (savedQuiz[i].markAnswer === savedQuiz[i].correctAnswer) {
			correctAnswer++
			color = {
				answerA:
					savedQuiz[i].markAnswer === 'answerA'
						? 'bg-correctAnswerLight dark:bg-correctAnswerDark'
						: 'bg-incorrect-answer-quiz opacity-20',
				answerB:
					savedQuiz[i].markAnswer === 'answerB'
						? 'bg-correctAnswerLight dark:bg-correctAnswerDark'
						: 'bg-incorrect-answer-quiz opacity-20',
				answerC:
					savedQuiz[i].markAnswer === 'answerC'
						? 'bg-correctAnswerLight dark:bg-correctAnswerDark'
						: 'bg-incorrect-answer-quiz opacity-20',
				answerD:
					savedQuiz[i].markAnswer === 'answerD'
						? 'bg-correctAnswerLight dark:bg-correctAnswerDark'
						: 'bg-incorrect-answer-quiz opacity-20',
			}
			isCorrectAnswer = true
			message = 'Gratulacje! To jest prawidłowa odpowiedź '
		} else if (savedQuiz[i].markAnswer === '') {
			color = {
				answerA:
					savedQuiz[i].correctAnswer === 'answerA'
						? 'bg-correctAnswerLight dark:bg-correctAnswerDark opacity-20'
						: 'bg-incorrect-answer-quiz opacity-20',

				answerB:
					savedQuiz[i].correctAnswer === 'answerB'
						? 'bg-correctAnswerLight dark:bg-correctAnswerDark opacity-20'
						: 'bg-incorrect-answer-quiz opacity-20',
				answerC:
					savedQuiz[i].correctAnswer === 'answerC'
						? 'bg-correctAnswerLight dark:bg-correctAnswerDark opacity-20'
						: 'bg-incorrect-answer-quiz opacity-20',
				answerD:
					savedQuiz[i].correctAnswer === 'answerD'
						? 'bg-correctAnswerLight dark:bg-correctAnswerDark opacity-20'
						: 'bg-incorrect-answer-quiz opacity-20',
			}
			isCorrectAnswer = null
			message = `Nie udzielono odpowiedzi na te pytanie. Poprawna odpowiedź to: ${savedQuiz[i].correctAnswer.replace(
				'answer',
				'',
			)}`
		} else if (savedQuiz[i].markAnswer !== savedQuiz[i].correctAnswer) {
			color = {
				answerA:
					savedQuiz[i].correctAnswer === 'answerA'
						? 'bg-correctAnswerLight dark:bg-correctAnswerDark opacity-20'
						: savedQuiz[i].markAnswer !== 'answerA'
						? 'bg-incorrect-answer-quiz opacity-20'
						: 'bg-incorrect-answer-quiz',
				answerB:
					savedQuiz[i].correctAnswer === 'answerB'
						? 'bg-correctAnswerLight dark:bg-correctAnswerDark opacity-20'
						: savedQuiz[i].markAnswer !== 'answerB'
						? 'bg-incorrect-answer-quiz opacity-20'
						: 'bg-incorrect-answer-quiz',
				answerC:
					savedQuiz[i].correctAnswer === 'answerC'
						? 'bg-correctAnswerLight dark:bg-correctAnswerDark opacity-20'
						: savedQuiz[i].markAnswer !== 'answerC'
						? 'bg-incorrect-answer-quiz opacity-20'
						: 'bg-incorrect-answer-quiz',
				answerD:
					savedQuiz[i].correctAnswer === 'answerD'
						? 'bg-correctAnswerLight dark:bg-correctAnswerDark opacity-20'
						: savedQuiz[i].markAnswer !== 'answerD'
						? 'bg-incorrect-answer-quiz opacity-20'
						: 'bg-incorrect-answer-quiz',
			}
			isCorrectAnswer = false
			message = `Niestety, to jest błędna odpowiedź. Poprawna odpowiedź to: ${savedQuiz[i].correctAnswer.replace(
				'answer',
				'',
			)}`
		}

		quiz.push({
			id: i,
			markAnswer: '',
			color,
			checkedQuestion: true,
			message,
			isCorrectAnswer,
		})
	}

	console.log(quiz)

	const quizResult = ((correctAnswer / savedQuiz.length) * 100).toFixed(2)

	const previousQuestion = () => {
		if (questionIndex > 0) {
			setQuestionIndex(questionIndex - 1)
		}
	}

	const nextQuestion = () => {
		if (questionIndex < savedQuiz.length - 1) {
			setQuestionIndex(questionIndex + 1)
		}
	}

	return (
		<div className='my-[25px] flex w-full flex-col items-center justify-center'>
			<div className='w-full'>
				<div className='flex flex-wrap justify-start gap-2'>
					{Array.from({ length: savedQuiz.length as number }, (_, index) => index + 1).map((number) => (
						<button
							key={number}
							className={`w-full max-w-[43px] rounded-[10px] border  p-[10px] transition-colors
							${
								quiz[number - 1].isCorrectAnswer === true
									? 'border-none bg-correctAnswerLight dark:bg-correctAnswerDark'
									: quiz[number - 1].isCorrectAnswer === false
									? 'border-none bg-incorrect-answer-quiz'
									: 'border-none bg-element-active-backgorund-dark/50'
							}

							${
								// active button
								questionIndex === number - 1 ? 'opacity-30 ' : ''
							}`}
							onClick={() => setQuestionIndex(number - 1)}
						>
							{number}
						</button>
					))}
				</div>

				<div className='mt-[25px] border-b border-solid border-border-color-light dark:border-border-color-dark'></div>

				<div className='mt-[25px] flex w-full justify-center'>
					<div className='flex w-full max-w-[600px] flex-col rounded-[20px] border border-solid border-border-color-light dark:border-border-color-dark'>
						<QuizQuestion
							questionNummber={questionIndex + 1}
							question={savedQuiz[questionIndex].question}
							questionID={savedQuiz[questionIndex].id}
							quizName={quizName}
						/>
						<QuizAnswer
							letter={'A'}
							answer={savedQuiz[questionIndex].answerA}
							id='answerA'
							marked={'answerA' === quiz[questionIndex].markAnswer}
							checkedQuestion={quiz[questionIndex].checkedQuestion}
							color={quiz[questionIndex].color}
						/>
						<QuizAnswer
							letter={'B'}
							answer={savedQuiz[questionIndex].answerB}
							id='answerB'
							marked={'answerB' === quiz[questionIndex].markAnswer}
							checkedQuestion={quiz[questionIndex].checkedQuestion}
							color={quiz[questionIndex].color}
						/>
						<QuizAnswer
							letter={'C'}
							answer={savedQuiz[questionIndex].answerC}
							id='answerC'
							marked={'answerC' === quiz[questionIndex].markAnswer}
							checkedQuestion={quiz[questionIndex].checkedQuestion}
							color={quiz[questionIndex].color}
						/>
						<QuizAnswer
							letter={'D'}
							answer={savedQuiz[questionIndex].answerD}
							id='answerD'
							marked={'answerD' === quiz[questionIndex].markAnswer}
							checkedQuestion={quiz[questionIndex].checkedQuestion}
							color={quiz[questionIndex].color}
						/>
					</div>
				</div>

				{quiz[questionIndex].message && (
					<p className='mt-[25px] w-full text-center text-lg text-black dark:text-white'>
						{quiz[questionIndex].message}
					</p>
				)}

				<div className='mt-[15px] flex w-full flex-col items-center'>
					<div className='mt-[10px] flex w-full max-w-[600px] items-center justify-center gap-[50px]'>
						<button
							onClick={() => previousQuestion()}
							className={`flex justify-center bg-btn-violet-color px-[15px] py-[7px] text-lg text-white transition-colors hover:bg-btn-violet-color-hover 
							${!questionIndex ? 'cursor-not-allowed' : 'cursor-pointer'}`}
						>
							Poprzednie pytanie
						</button>
						<button
							onClick={() => nextQuestion()}
							className='flex cursor-pointer justify-center bg-btn-violet-color px-[15px] py-[7px] text-lg text-white transition-colors hover:bg-btn-violet-color-hover'
						>
							Następne pytanie
						</button>
					</div>

					<p
						className={`mt-[25px] w-full text-center text-lg  
						${
							+quizResult < 50
								? 'text-error-color'
								: +quizResult > 80
								? 'text-correctAnswerLight dark:text-correctAnswerDark'
								: 'text-black dark:text-white'
						}`}
					>
						Twój wynik to: {quizResult}% ({correctAnswer}/{savedQuiz.length})
					</p>
				</div>
			</div>
		</div>
	)
}
