'use client'
import { useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import useSWR, { mutate } from 'swr'
import { Loader } from '@/components'

import { CompleteQuiz } from '@/components/CompleteQuiz'

interface ChildComponentHandle {
	getColor: () => { answerA: string; answerB: string; answerC: string; answerD: string }
	getCheckedQuestion: () => boolean
	getMarkAnswer: () => string
	setMarkAnswer: (newState: string) => void
	setCheckedQuestion: (newState: boolean) => void
	setColor: (newState: { answerA: string; answerB: string; answerC: string; answerD: string }) => void
}

const oneQuestion = ({ params }: { params: { slug: string } }) => {
	const childRef = useRef<ChildComponentHandle>(null)

	const quizName = decodeURIComponent(params.slug)

	const fetcher = async (url: string) => {
		const res = await fetch(url)
		const result = await res.json()

		if (!res.ok) {
			const error = new Error(result.message)

			throw error
		}

		return result.data
	}
	const { data, error, isLoading } = useSWR(`/api/getRandomQuestion?quizName=${quizName}`, fetcher)

	const question = data?.[0]

	const [message, setMessage] = useState<string>('')

	const nextQuestion = async () => {
		childRef?.current?.setCheckedQuestion(false)
		childRef?.current?.setMarkAnswer('')
		childRef?.current?.setColor({
			answerA: '',
			answerB: '',
			answerC: '',
			answerD: '',
		})
		setMessage('')

		mutate(`/api/getRandomQuestion?quizName=${quizName}`)
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
			childRef?.current?.setCheckedQuestion(true)
			setMessage(InValidMessage[randomIndex])
			childRef?.current?.setMarkAnswer('')
			childRef?.current?.setColor({
				answerA:
					question.correctAnswer === 'answerA'
						? 'bg-correctAnswer opacity-20'
						: childRef?.current?.getMarkAnswer() !== 'answerA'
						? 'bg-incorrect-answer-quiz opacity-20'
						: 'bg-incorrect-answer-quiz',
				answerB:
					question.correctAnswer === 'answerB'
						? 'bg-correctAnswer opacity-20'
						: childRef?.current?.getMarkAnswer() !== 'answerB'
						? 'bg-incorrect-answer-quiz opacity-20'
						: 'bg-incorrect-answer-quiz',
				answerC:
					question.correctAnswer === 'answerC'
						? 'bg-correctAnswer opacity-20'
						: childRef?.current?.getMarkAnswer() !== 'answerC'
						? 'bg-incorrect-answer-quiz opacity-20'
						: 'bg-incorrect-answer-quiz',
				answerD:
					question.correctAnswer === 'answerD'
						? 'bg-correctAnswer opacity-20'
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
			childRef?.current?.setCheckedQuestion(true)
			setMessage(ValidMessage[randomIndex])
			childRef?.current?.setMarkAnswer('')
			childRef?.current?.setColor({
				answerA:
					childRef?.current?.getMarkAnswer() === 'answerA' ? 'bg-correctAnswer' : 'bg-incorrect-answer-quiz opacity-20',
				answerB:
					childRef?.current?.getMarkAnswer() === 'answerB' ? 'bg-correctAnswer' : 'bg-incorrect-answer-quiz opacity-20',
				answerC:
					childRef?.current?.getMarkAnswer() === 'answerC' ? 'bg-correctAnswer' : 'bg-incorrect-answer-quiz opacity-20',
				answerD:
					childRef?.current?.getMarkAnswer() === 'answerD' ? 'bg-correctAnswer' : 'bg-incorrect-answer-quiz opacity-20',
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
	if (isLoading) return <Loader />
	if (error) return <div>{error.message}</div>
	if (data)
		return (
			<div className='wrapper flex flex-col items-center justify-center w-full my-[50px]'>
				<CompleteQuiz ref={childRef} question={question} />
				<div className='min-h-[30px] text-lg mt-[10px] text-white'>{message && <span>{message}</span>}</div>
				<div className='flex justify-center items-center gap-[50px] max-w-[600px] w-full mt-[10px]'>
					<button
						onClick={() => checkQuestion()}
						disabled={childRef?.current?.getCheckedQuestion()}
						className={`flex justify-center px-[15px] py-[7px] text-lg text-white bg-[#FF5733] transition-colors ${
							childRef?.current?.getCheckedQuestion() ? ' cursor-not-allowed' : 'cursor-pointer'
						}  hover:bg-[#FF8D66]`}>
						Sprawdź pytanie
					</button>
					<button
						onClick={() => nextQuestion()}
						className='flex justify-center px-[15px] py-[7px] text-lg bg-btn-violet-color text-white cursor-pointer transition-colors hover:bg-btn-violet-color-hover'>
						Losuj następne pytanie
					</button>
				</div>
			</div>
		)
}

export default oneQuestion
