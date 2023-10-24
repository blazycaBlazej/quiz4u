'use client'
import { useEffect, useRef, useState } from 'react'
import useSWR, { mutate } from 'swr'
import { Loader } from '@/components'
import { QuizQuestion } from '@/components/QuizQuestion'
import { QuizAnswer } from '@/components/QuizAnswer'
import { useSearchParams } from 'next/navigation'
import { bigConfetti } from '@/lib/lib'

interface ChildComponentHandle {
	getColor: () => { answerA: string; answerB: string; answerC: string; answerD: string }
	getCheckedQuestion: () => boolean
	getMarkAnswer: () => string
	setMarkAnswer: (newState: string) => void
	setCheckedQuestion: (newState: boolean) => void
	setColor: (newState: { answerA: string; answerB: string; answerC: string; answerD: string }) => void
}

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

const fetcher = async (url: string) => {
	const res = await fetch(url)
	const result = await res.json()

	if (!res.ok) {
		const error = new Error(result.message)

		throw error
	}
	return result.data
}

const fortyQuestions = ({ params }: { params: { slug: string } }) => {
	const quizName = decodeURIComponent(params.slug)
	const searchParams = useSearchParams()
	const questionString: null | string = searchParams?.get('q')
	const quizType: null | string = searchParams?.get('t')
	let questionNumber: number = 0

	const [questionIndex, setQuestionIndex] = useState(0)
	const [numberOfCorrectAnswer, setNumberOfCorrectAnswer] = useState(0)

	if (questionString) {
		questionNumber = +questionString
	}

	const { data, error, isLoading } = useSWR(
		`/api/getXQuestions?quizName=${quizName}&numberQuestions=${questionNumber}&type=${quizType}`,
		fetcher,
		{ revalidateOnFocus: false, revalidateOnReconnect: false }
	)

	const questions = data

	const initialQuiz: QuizItemCheckerState = []

	for (let i = 0; i < questionNumber; i++) {
		initialQuiz.push({
			id: i,
			markAnswer: '',
			color: {
				answerA: '',
				answerB: '',
				answerC: '',
				answerD: '',
			},
			checkedQuestion: false,
			message: '',
			isCorrectAnswer: null,
		})
	}

	const [quiz, setQuiz] = useState<QuizItemCheckerState>(initialQuiz)

	const quizResult = ((numberOfCorrectAnswer / questionNumber) * 100).toFixed(2)

	const isFirstMount = useRef(true)

	useEffect(() => {
		if (isFirstMount.current) {
			isFirstMount.current = false
			return
		}
		if (+quizResult > 90) {
			bigConfetti()
		}
	}, [quizResult])

	const checkAnswer = (checkedAnswer: string) => {
		const updatedQuiz = quiz.map((item, index) => {
			if (index === questionIndex) {
				if (checkedAnswer === quiz[questionIndex].markAnswer) checkedAnswer = ''

				return {
					...item,
					markAnswer: checkedAnswer,
				}
			}
			return item
		})

		setQuiz(updatedQuiz)
	}

	const previousQuestion = () => {
		if (questionIndex > 0) {
			setQuestionIndex(questionIndex - 1)
		}
	}

	const nextQuestion = () => {
		if (questionIndex < questionNumber - 1) {
			setQuestionIndex(questionIndex + 1)
		}
	}

	const checkQuiz = () => {
		const updatedQuiz = quiz.map((item, index) => {
			if (item.markAnswer === questions[index].correctAnswer) {
				setNumberOfCorrectAnswer(prevState => prevState + 1)
				const newColor = {
					answerA: quiz[index].markAnswer === 'answerA' ? 'bg-correctAnswer' : 'bg-incorrect-answer-quiz opacity-20',
					answerB: quiz[index].markAnswer === 'answerB' ? 'bg-correctAnswer' : 'bg-incorrect-answer-quiz opacity-20',
					answerC: quiz[index].markAnswer === 'answerC' ? 'bg-correctAnswer' : 'bg-incorrect-answer-quiz opacity-20',
					answerD: quiz[index].markAnswer === 'answerD' ? 'bg-correctAnswer' : 'bg-incorrect-answer-quiz opacity-20',
				}

				return {
					...item,
					color: newColor,
					checkedQuestion: true,
					message: 'Gratulacje! To jest prawidłowa odpowiedź ',
					markAnswer: '',
					isCorrectAnswer: true,
				}
			} else if (item.markAnswer === '') {
				const newColor = {
					answerA:
						questions[index].correctAnswer === 'answerA'
							? 'bg-correctAnswer opacity-20'
							: 'bg-incorrect-answer-quiz opacity-20',

					answerB:
						questions[index].correctAnswer === 'answerB'
							? 'bg-correctAnswer opacity-20'
							: 'bg-incorrect-answer-quiz opacity-20',
					answerC:
						questions[index].correctAnswer === 'answerC'
							? 'bg-correctAnswer opacity-20'
							: 'bg-incorrect-answer-quiz opacity-20',
					answerD:
						questions[index].correctAnswer === 'answerD'
							? 'bg-correctAnswer opacity-20'
							: 'bg-incorrect-answer-quiz opacity-20',
				}

				return {
					...item,
					color: newColor,
					checkedQuestion: true,
					message: `Nie udzielono odpowiedzi na te pytanie. Poprawna odpowiedź to: ${questions[
						index
					].correctAnswer.replace('answer', '')}`,
					markAnswer: '',
					isCorrectAnswer: null,
				}
			} else if (item.markAnswer !== questions[index].correctAnswer) {
				const newColor = {
					answerA:
						questions[index].correctAnswer === 'answerA'
							? 'bg-correctAnswer opacity-20'
							: quiz[index].markAnswer !== 'answerA'
							? 'bg-incorrect-answer-quiz opacity-20'
							: 'bg-incorrect-answer-quiz',
					answerB:
						questions[index].correctAnswer === 'answerB'
							? 'bg-correctAnswer opacity-20'
							: quiz[index].markAnswer !== 'answerB'
							? 'bg-incorrect-answer-quiz opacity-20'
							: 'bg-incorrect-answer-quiz',
					answerC:
						questions[index].correctAnswer === 'answerC'
							? 'bg-correctAnswer opacity-20'
							: quiz[index].markAnswer !== 'answerC'
							? 'bg-incorrect-answer-quiz opacity-20'
							: 'bg-incorrect-answer-quiz',
					answerD:
						questions[index].correctAnswer === 'answerD'
							? 'bg-correctAnswer opacity-20'
							: quiz[index].markAnswer !== 'answerD'
							? 'bg-incorrect-answer-quiz opacity-20'
							: 'bg-incorrect-answer-quiz',
				}

				return {
					...item,
					color: newColor,
					checkedQuestion: true,
					message: `Niestety, to jest błędna odpowiedź. Poprawna odpowiedź to: ${questions[index].correctAnswer.replace(
						'answer',
						''
					)}`,
					markAnswer: '',
					isCorrectAnswer: false,
				}
			} else {
				return {
					...item,
					checkedQuestion: true,
				}
			}
		})

		setQuiz(updatedQuiz)
	}

	const quizReset = () => {
		isFirstMount.current = true
		setNumberOfCorrectAnswer(0)
		setQuestionIndex(0)
		mutate(`/api/getXQuestions?quizName=${quizName}&numberQuestions=${questionNumber}&type=${quizType}`)
		setQuiz(initialQuiz)
	}

	if (isLoading) return <Loader />
	if (error) return <div>{error.message}</div>
	if (data)
		return (
			<div className='flex flex-col items-center justify-center w-full my-[25px]'>
				<div className='w-full'>
					<div className='flex flex-wrap justify-start gap-2'>
						{Array.from({ length: questionNumber as number }, (_, index) => index + 1).map(number => (
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
								question={questions[questionIndex].question}
								questionID={questions[questionIndex].id}
								quizName={quizName}
							/>
							<QuizAnswer
								letter={'A'}
								answer={questions[questionIndex].answerA}
								id='answerA'
								marked={'answerA' === quiz[questionIndex].markAnswer}
								checkAnswer={checkAnswer}
								checkedQuestion={quiz[questionIndex].checkedQuestion}
								color={quiz[questionIndex].color}
							/>
							<QuizAnswer
								letter={'B'}
								answer={questions[questionIndex].answerB}
								id='answerB'
								marked={'answerB' === quiz[questionIndex].markAnswer}
								checkAnswer={checkAnswer}
								checkedQuestion={quiz[questionIndex].checkedQuestion}
								color={quiz[questionIndex].color}
							/>
							<QuizAnswer
								letter={'C'}
								answer={questions[questionIndex].answerC}
								id='answerC'
								marked={'answerC' === quiz[questionIndex].markAnswer}
								checkAnswer={checkAnswer}
								checkedQuestion={quiz[questionIndex].checkedQuestion}
								color={quiz[questionIndex].color}
							/>
							<QuizAnswer
								letter={'D'}
								answer={questions[questionIndex].answerD}
								id='answerD'
								marked={'answerD' === quiz[questionIndex].markAnswer}
								checkAnswer={checkAnswer}
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
						{!quiz[0].checkedQuestion ? (
							<button
								onClick={() => checkQuiz()}
								className='flex justify-center mt-[25px] px-[15px] py-[7px] text-lg bg-btn-violet-color text-white cursor-pointer transition-colors hover:bg-btn-violet-color-hover'>
								Sprawdź cały test
							</button>
						) : (
							<>
								<p
									className={`text-lg text-center w-full mt-[25px]  ${
										+quizResult < 50 ? 'text-error-color' : +quizResult > 80 ? 't text-correctAnswer' : 'text-white'
									}`}>
									Twój wynik to: {quizResult}% ({numberOfCorrectAnswer}/{questionNumber})
								</p>

								<button
									onClick={() => quizReset()}
									className='flex justify-center mt-[25px] px-[15px] py-[7px] text-lg bg-btn-violet-color text-white cursor-pointer transition-colors hover:bg-btn-violet-color-hover'>
									Rozwiąż ponownie
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		)
}

export default fortyQuestions
