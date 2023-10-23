'use server'
import { NumberQuestionsModal } from '@/components/NumberQuestionsModal'
import { PrintQuiz } from '@/components/PrintQuiz'
import { getIsAdmin } from '@/lib/getIsAdmin'
import { getNumberQuestionInQuiz } from '@/lib/getNumberQuestionsInQuiz'
import { getQuizDeatails } from '@/lib/getQuizDeatails'
import { IconPencil } from '@tabler/icons-react'
import Link from 'next/link'

export default async function QuizPage({ params }: { params: { slug: string } }) {
	const quizName = decodeURIComponent(params.slug)
	const quizDeatails = await getQuizDeatails(quizName)
	const questionsNumber = await getNumberQuestionInQuiz(quizName)
	//min-h-[calc(100vh-130px)]
	return (
		<main className='flex flex-col w-full'>
			<div className='cointiner flex flex-col  m-[33px]'>
				<p className='my-[20px]'>{quizDeatails?.description}</p>
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
								<ul>
									{quizDeatails?.randomize1Question && (
										<Link href={`/quiz/${quizName}/1-pytanie`}>
											<li>Losuj 1 pytanie</li>
										</Link>
									)}
									{quizDeatails?.randomize20Questions && (
										<Link href={`/quiz/${quizName}/20-pytan?q=20&t=randomize20Questions`}>
											<li>Losuj 20 pytań</li>
										</Link>
									)}
									{quizDeatails?.randomizeXQuestions && (
										<NumberQuestionsModal quizName={quizName} questionsNumber={questionsNumber} />
									)}
									{quizDeatails?.rankedGame && <li>Losuj 20 pytań - gra rankingowa</li>}
									{quizDeatails?.showAllQuestions && <li>Pokaż wszystkie pytania</li>}
									{quizDeatails?.printTest && <PrintQuiz quizName={quizName} />}
									{quizDeatails?.competeWithFriends && <li>Rywalizuj ze znajomymi</li>}
								</ul>
							</>
						) : (
							<span>Nie ma dostępnej żadnej opcji nauki</span>
						)}

						<p className='text-white mt-[20px]'>Liczba pytań: {questionsNumber}</p>
					</div>
					<div className=''>
						<span className='text-white text-2xl'>Twoje ostatnie testy:</span>
					</div>
				</div>
				<span className='text-white text-2xl mt-[20px]'>Komentarze: </span>
			</div>
		</main>
	)
}
