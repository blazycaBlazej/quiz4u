'use client'
import { useEffect, useState } from 'react'
import { QuizQuestion } from '@/components/QuizQuestion'
import { QuizAnswer } from '@/components/QuizAnswer'

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

	const initialQuiz: QuizItemCheckerState = []

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
				answerA: savedQuiz[i].markAnswer === 'answerA' ? 'bg-correctAnswer' : 'bg-incorrect-answer-quiz opacity-20',
				answerB: savedQuiz[i].markAnswer === 'answerB' ? 'bg-correctAnswer' : 'bg-incorrect-answer-quiz opacity-20',
				answerC: savedQuiz[i].markAnswer === 'answerC' ? 'bg-correctAnswer' : 'bg-incorrect-answer-quiz opacity-20',
				answerD: savedQuiz[i].markAnswer === 'answerD' ? 'bg-correctAnswer' : 'bg-incorrect-answer-quiz opacity-20',
			}
			isCorrectAnswer = true
			message = 'Gratulacje! To jest prawidłowa odpowiedź '
		} else if (savedQuiz[i].markAnswer === '') {
			color = {
				answerA:
					savedQuiz[i].correctAnswer === 'answerA'
						? 'bg-correctAnswer opacity-20'
						: 'bg-incorrect-answer-quiz opacity-20',

				answerB:
					savedQuiz[i].correctAnswer === 'answerB'
						? 'bg-correctAnswer opacity-20'
						: 'bg-incorrect-answer-quiz opacity-20',
				answerC:
					savedQuiz[i].correctAnswer === 'answerC'
						? 'bg-correctAnswer opacity-20'
						: 'bg-incorrect-answer-quiz opacity-20',
				answerD:
					savedQuiz[i].correctAnswer === 'answerD'
						? 'bg-correctAnswer opacity-20'
						: 'bg-incorrect-answer-quiz opacity-20',
			}
			isCorrectAnswer = null
			message = `Nie udzielono odpowiedzi na te pytanie. Poprawna odpowiedź to: ${savedQuiz[i].correctAnswer.replace(
				'answer',
				''
			)}`
		} else if (savedQuiz[i].markAnswer !== savedQuiz[i].correctAnswer) {
			color = {
				answerA:
					savedQuiz[i].correctAnswer === 'answerA'
						? 'bg-correctAnswer opacity-20'
						: savedQuiz[i].markAnswer !== 'answerA'
						? 'bg-incorrect-answer-quiz opacity-20'
						: 'bg-incorrect-answer-quiz',
				answerB:
					savedQuiz[i].correctAnswer === 'answerB'
						? 'bg-correctAnswer opacity-20'
						: savedQuiz[i].markAnswer !== 'answerB'
						? 'bg-incorrect-answer-quiz opacity-20'
						: 'bg-incorrect-answer-quiz',
				answerC:
					savedQuiz[i].correctAnswer === 'answerC'
						? 'bg-correctAnswer opacity-20'
						: savedQuiz[i].markAnswer !== 'answerC'
						? 'bg-incorrect-answer-quiz opacity-20'
						: 'bg-incorrect-answer-quiz',
				answerD:
					savedQuiz[i].correctAnswer === 'answerD'
						? 'bg-correctAnswer opacity-20'
						: savedQuiz[i].markAnswer !== 'answerD'
						? 'bg-incorrect-answer-quiz opacity-20'
						: 'bg-incorrect-answer-quiz',
			}
			isCorrectAnswer = false
			message = `Niestety, to jest błędna odpowiedź. Poprawna odpowiedź to: ${savedQuiz[i].correctAnswer.replace(
				'answer',
				''
			)}`
		}

		initialQuiz.push({
			id: i,
			markAnswer: '',
			color,
			checkedQuestion: true,
			message,
			isCorrectAnswer,
		})
	}

	const [quiz, setQuiz] = useState<QuizItemCheckerState>(initialQuiz)

	const [numberOfCorrectAnswer, setNumberOfCorrectAnswer] = useState(correctAnswer)

	const quizResult = ((numberOfCorrectAnswer / savedQuiz.length) * 100).toFixed(2)

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
		<div className='flex flex-col items-center justify-center w-full my-[25px]'>
			<div className='w-full'>
				<div className='flex flex-wrap justify-start gap-2'>
					{Array.from({ length: savedQuiz.length as number }, (_, index) => index + 1).map(number => (
						<button
							key={number}
							className={`border rounded-[10px] p-[10px] max-w-[43px]  w-full transition-colors
                          
                         ${
														quiz[number - 1].checkedQuestion
															? quiz[number - 1].isCorrectAnswer === true
																? 'border-none bg-correctAnswer'
																: quiz[number - 1].isCorrectAnswer === false
																? 'border-none bg-incorrect-answer-quiz'
																: 'border-none bg-element-active-backgorund/50'
															: ''
													}

                         ${
														!quiz[number - 1].checkedQuestion
															? quiz[number - 1].markAnswer
																? 'bg-element-active-backgorund/20 border-none'
																: ' border-element-active-backgorund'
															: ''
													}
                         ${questionIndex === number - 1 ? 'colorful-box2 text-white' : ''}
                         `}
							onClick={() => setQuestionIndex(number - 1)}>
							{number}
						</button>
					))}
				</div>

				<div className='mt-[25px] border-b border-solid border-border-color '></div>

				<div className='w-full flex justify-center mt-[25px]'>
					<div className='flex flex-col rounded-[20px] border border-solid border-border-color max-w-[600px] w-full'>
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
					<p className='text-lg text-center w-full mt-[25px] text-white'>{quiz[questionIndex].message}</p>
				)}

				<div className='w-full flex flex-col items-center mt-[15px]'>
					<div className='flex justify-center items-center gap-[50px] max-w-[600px] w-full mt-[10px]'>
						<button
							onClick={() => previousQuestion()}
							className={`flex justify-center px-[15px] py-[7px] text-lg bg-btn-violet-color text-white transition-colors hover:bg-btn-violet-color-hover ${
								!questionIndex ? 'cursor-not-allowed' : 'cursor-pointer'
							}`}>
							Poprzednie pytanie
						</button>
						<button
							onClick={() => nextQuestion()}
							className='flex justify-center px-[15px] py-[7px] text-lg bg-btn-violet-color text-white cursor-pointer transition-colors hover:bg-btn-violet-color-hover'>
							Następne pytanie
						</button>
					</div>

					<p
						className={`text-lg text-center w-full mt-[25px]  ${
							+quizResult < 50 ? 'text-error-color' : +quizResult > 80 ? 't text-correctAnswer' : 'text-white'
						}`}>
						Twój wynik to: {quizResult}% ({numberOfCorrectAnswer}/{savedQuiz.length})
					</p>
				</div>
			</div>
		</div>
	)
}
