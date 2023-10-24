'use server'
import { NumberQuestionsModal } from '@/components/NumberQuestionsModal'
import { PrintQuiz } from '@/components/PrintQuiz'
import { getIsAdmin } from '@/lib/getIsAdmin'
import { getNumberQuestionInQuiz } from '@/lib/getNumberQuestionsInQuiz'
import { getQuizDeatails } from '@/lib/getQuizDeatails'
import {
	IconDeviceGamepad,
	IconDice1,
	IconEye,
	IconNumber20Small,
	IconMedal,
	IconBoxMultiple,
	IconMessage2,
} from '@tabler/icons-react'
import Link from 'next/link'

export default async function QuizPage({ params }: { params: { slug: string } }) {
	const quizName = decodeURIComponent(params.slug)
	const quizDeatails = await getQuizDeatails(quizName)
	const questionsNumber = await getNumberQuestionInQuiz(quizName)
	//min-h-[calc(100vh-130px)]
	return (
		<main className='flex flex-col w-full'>
			<div className='cointiner flex flex-col mt-[20px] m-[33px]'>
				<h3 className='text-white text-3xl'>Opis:</h3>
				<p className='my-[6px]'>
					{quizDeatails?.description === '' ? 'Quiz nie posiada opisu.' : quizDeatails?.description}
				</p>
				<div className='border-b border-solid border-border-color my-[20px]'></div>
				<div className='flex justify-between'>
					<div className=''>
						<h2 className='text-white text-2xl'>Dostępn opcje nauki:</h2>
						{quizDeatails?.randomize1Question ||
						quizDeatails?.randomize20Questions ||
						quizDeatails?.randomizeXQuestions ||
						quizDeatails?.rankedGame ||
						quizDeatails?.showAllQuestions ||
						quizDeatails?.printTest ||
						quizDeatails?.competeWithFriends ? (
							<>
								<ul className='flex flex-col gap-2 mt-[8px]'>
									{quizDeatails?.randomize1Question && (
										<Link href={`/quiz/${quizName}/1-pytanie`}>
											<li className='flex gap-2 transition-colors cursor-pointer hover:text-white'>
												<IconDice1 className='text-white' />
												<span>Losuj 1 pytanie</span>
											</li>
										</Link>
									)}
									{quizDeatails?.randomize20Questions && (
										<Link href={`/quiz/${quizName}/x-pytan?q=20&t=randomize20Questions`}>
											<li className='flex gap-2 transition-colors cursor-pointer hover:text-white'>
												<IconNumber20Small className='text-white' />
												<span>Losuj 20 pytań</span>
											</li>
										</Link>
									)}
									{quizDeatails?.randomizeXQuestions && (
										<NumberQuestionsModal quizName={quizName} questionsNumber={questionsNumber} />
									)}
									{quizDeatails?.rankedGame && (
										<li className='flex gap-2 transition-colors cursor-pointer hover:text-white'>
											<IconMedal className='text-white' />
											<span>Losuj 20 pytań - gra rankingowa</span>
										</li>
									)}
									{quizDeatails?.showAllQuestions && (
										<li className='flex gap-2 transition-colors cursor-pointer hover:text-white'>
											<IconEye className='text-white' />
											<span>Pokaż wszystkie pytania</span>
										</li>
									)}
									{quizDeatails?.printTest && <PrintQuiz quizName={quizName} />}
									{quizDeatails?.competeWithFriends && (
										<li className='flex gap-2 transition-colors cursor-pointer hover:text-white'>
											<IconDeviceGamepad className='text-white' />
											<span>Rywalizuj ze znajomymi</span>
										</li>
									)}
								</ul>
							</>
						) : (
							<span>Nie ma dostępnej żadnej opcji nauki</span>
						)}
					</div>
					<div className=''>
						<span className='text-white text-2xl'>Twoje ostatnie testy:</span>
					</div>
				</div>
				<div className='border-b border-solid border-border-color my-[20px] w-full'></div>
				<p className='flex gap-2 text-white'>
					<IconBoxMultiple />
					Liczba pytań: {questionsNumber}
				</p>
				<div className='border-b border-solid border-border-color my-[20px]'></div>

				<span className='flex gap-2 items-center text-white text-2xl'>
					<IconMessage2 />
					Komentarze:{' '}
				</span>
			</div>
		</main>
	)
}
