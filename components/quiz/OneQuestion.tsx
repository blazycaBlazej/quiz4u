'use client'

import { useRef, useState, useLayoutEffect } from 'react'
import confetti from 'canvas-confetti'
import { CompleteQuiz } from '@/components/quiz/CompleteQuiz'
import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'

interface ChildComponentHandle {
	getColor: () => { answerA: string; answerB: string; answerC: string; answerD: string }
	getCheckedQuestion: () => boolean
	getMarkAnswer: () => string
	setMarkAnswer: (newState: string) => void
	setCheckedQuestion: (newState: boolean) => void
	setColor: (newState: { answerA: string; answerB: string; answerC: string; answerD: string }) => void
}

interface onQuestionProps {
	quizName: string
	question: any
}

const OneQuestion = ({ quizName, question }: onQuestionProps) => {
	const router = useRouter()
	const childRef = useRef<ChildComponentHandle>(null)
	const [message, setMessage] = useState<string>('')
	const [questionIsChecked, setQuestionIsChecked] = useState(false)

	const nextQuestion = async () => {
		setQuestionIsChecked(false)
		childRef?.current?.setCheckedQuestion(false)
		childRef?.current?.setMarkAnswer('')
		childRef?.current?.setColor({
			answerA: '',
			answerB: '',
			answerC: '',
			answerD: '',
		})
		setMessage('')

		router.refresh()
	}

	const checkQuestion = () => {
		if (childRef?.current?.getMarkAnswer() !== '' && childRef?.current?.getMarkAnswer() !== question.correctAnswer) {
			const InValidMessage = [
				'Ups! Ktoś tu chyba zgubił kompas wiedzy',
				'Ej, może chcesz spróbować jeszcze raz? Bez szpiegów z Internetu!',
				'Chyba Ci się przewróciło w głowie... ale nic się nie martw, spróbuj jeszcze raz!',
				'Hmmm... pewnie zgadłeś na chybił-trafił, prawda?',
				'Brawo za odwagę! Niestety, to nie ta odpowiedź.',
				'Ups! Ktoś tu chyba potrzebuje więcej kawy!',
				'Hmmm... pewnie chciałeś kliknąć inny przycisk, prawda?',
				'Brawo za próbę! Ale niestety, to nie ta odpowiedź.',
			]
			const randomIndex = Math.floor(Math.random() * InValidMessage.length)
			setQuestionIsChecked(true)
			childRef?.current?.setCheckedQuestion(true)
			setMessage(InValidMessage[randomIndex])
			childRef?.current?.setMarkAnswer('')
			childRef?.current?.setColor({
				answerA:
					question.correctAnswer === 'answerA'
						? 'bg-correctAnswerLight dark:bg-correctAnswerDark opacity-20'
						: childRef?.current?.getMarkAnswer() !== 'answerA'
						? 'bg-incorrect-answer-quiz opacity-20'
						: 'bg-incorrect-answer-quiz',
				answerB:
					question.correctAnswer === 'answerB'
						? 'bg-correctAnswerLight dark:bg-correctAnswerDark opacity-20'
						: childRef?.current?.getMarkAnswer() !== 'answerB'
						? 'bg-incorrect-answer-quiz opacity-20'
						: 'bg-incorrect-answer-quiz',
				answerC:
					question.correctAnswer === 'answerC'
						? 'bg-correctAnswerLight dark:bg-correctAnswerDark opacity-20'
						: childRef?.current?.getMarkAnswer() !== 'answerC'
						? 'bg-incorrect-answer-quiz opacity-20'
						: 'bg-incorrect-answer-quiz',
				answerD:
					question.correctAnswer === 'answerD'
						? 'bg-correctAnswerLight dark:bg-correctAnswerDark opacity-20'
						: childRef?.current?.getMarkAnswer() !== 'answerD'
						? 'bg-incorrect-answer-quiz opacity-20'
						: 'bg-incorrect-answer-quiz',
			})

			//question.correctAnswer === 'answerB' ? '##90EE90' : '#markAnswer !== 'answerA' ? '#FF7F7F' : #FF0000
			//question.correctAnswer === 'answerC' ? '##90EE90' : '#markAnswer !== 'answerA' ? '#FF7F7F' : #FF0000
			//question.correctAnswer === 'answerD' ? '##90EE90' : '#markAnswer !== 'answerA' ? '#FF7F7F' : #FF0000
		} else if (childRef?.current?.getMarkAnswer() === question.correctAnswer) {
			confetti({
				particleCount: 100,
				spread: 70,
				origin: { y: 0.6 },
			})

			const ValidMessage = [
				'Brawo! Chyba ktoś tu miał dobrą kawę przed quizem!',
				'Oj, strzelasz lepiej niż Robin Hood!',
				'Ta-daaa! Zgadza się, dajesz czadu!',
				'O kurczę, właśnie trafiłeś w dziesiątkę!',
				'Eureka! Ktoś tu jest na fali!',
				'A no widzisz! Czasem warto posłuchać nauczyciela na lekcji!',
				'Wow, ktoś tu chyba zjadał szpinak przed quizem!',
				'Bingo! Chyba masz supermoce, prawda?',
			]
			const randomIndex = Math.floor(Math.random() * ValidMessage.length)
			setQuestionIsChecked(true)
			childRef?.current?.setCheckedQuestion(true)
			setMessage(ValidMessage[randomIndex])
			childRef?.current?.setMarkAnswer('')
			childRef?.current?.setColor({
				answerA:
					childRef?.current?.getMarkAnswer() === 'answerA'
						? 'bg-correctAnswerLight dark:bg-correctAnswerDark'
						: 'bg-incorrect-answer-quiz opacity-20',
				answerB:
					childRef?.current?.getMarkAnswer() === 'answerB'
						? 'bg-correctAnswerLight dark:bg-correctAnswerDark'
						: 'bg-incorrect-answer-quiz opacity-20',
				answerC:
					childRef?.current?.getMarkAnswer() === 'answerC'
						? 'bg-correctAnswerLight dark:bg-correctAnswerDark'
						: 'bg-incorrect-answer-quiz opacity-20',
				answerD:
					childRef?.current?.getMarkAnswer() === 'answerD'
						? 'bg-correctAnswerLight dark:bg-correctAnswerDark'
						: 'bg-incorrect-answer-quiz opacity-20',
			})
			//markAnswer === 'answerA' ? '#008000' : '#FF7F7F'
			//markAnswer === 'answerB' ? '#008000' : '#FF7F7F
			//markAnswer === 'answerC' ? '#008000' : '#FF7F7F
			//markAnswer === 'answerD' ? '#008000' : '#FF7F7F
		} else if (childRef?.current?.getMarkAnswer() === '') {
			const UnselectedMessage = [
				'Hej! Wydaje się, że zapomniałeś wybrać odpowiedź. Chyba kawa jeszcze nie zadziałała?',
				'Ups! Chyba przegapiłeś coś ważnego. Może chcesz zaznaczyć odpowiedź?',
				'Zanim sprawdzisz, może warto coś zaznaczyć. Magiczna kula mówi, że to pomoże!',
				'No chyba nie chcesz zgadywać na ślepo? Wybierz odpowiedź!',
				'Ej, to nie jest test z telepatii! Zaznacz odpowiedź, proszę.',
				'Daj mi chwilę... Hmmm, chyba zapomniałeś coś zaznaczyć!',
				'Klik, klik! Zaznacz coś, zanim przejdziesz dalej.',
				'Magiczny detektor odpowiedzi mówi, że nic nie zaznaczyłeś. Spróbuj jeszcze raz!',
			]
			const randomIndex = Math.floor(Math.random() * UnselectedMessage.length)
			setMessage(UnselectedMessage[randomIndex])
		}
	}

	return (
		<div className='wrapper my-[50px] flex w-full flex-col items-center justify-center'>
			<CompleteQuiz ref={childRef} question={question} quizName={quizName} />
			<div className='mt-[10px] min-h-[30px] text-lg text-black dark:text-white'>
				{message && <span>{message}</span>}
			</div>
			<div className='mt-[10px] flex w-full max-w-[600px] items-center justify-center gap-[50px]'>
				<Button
					onClick={() => checkQuestion()}
					disabled={questionIsChecked}
					variant={questionIsChecked ? 'disabled' : 'orange'}
					rounded='none'
					size='sm'
				>
					Sprawdź pytanie
				</Button>

				<Button onClick={() => nextQuestion()} rounded='none' size='sm'>
					Losuj następne pytanie
				</Button>
			</div>
		</div>
	)
}

export default OneQuestion
