import { getIsAdmin } from '@/lib/getIsAdmin'
import { getQuizDeatails } from '@/lib/getQuizDeatails'
import { IconPencil } from '@tabler/icons-react'
import Link from 'next/link'

export default async function QuizPage({ params }: { params: { slug: string } }) {
	const quizName = decodeURIComponent(params.slug)
	const quizDeatails = await getQuizDeatails(quizName)
	const isAdmin = await getIsAdmin()
	//min-h-[calc(100vh-130px)]
	return (
		<main className='flex flex-col w-full rounded-[20px] border border-solid border-border-color'>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl text-white m-[33px] '>Quiz: {quizName}</h1>
				{isAdmin && (
					<div className='mr-[33px]'>
						<Link href={`/edytuj-quiz/${quizName}/detale`}>
							<span className='block  cursor-pointer text-white transition-colors hover:text-main-font-color'>
								<IconPencil width='40' height='40' />
							</span>
						</Link>
					</div>
				)}
			</div>
			<div className='border-b border-solid border-border-color'></div>
			<div className='cointiner flex flex-col  m-[33px]'>
				<p className='my-[20px]'>{quizDeatails?.description}</p>
				<div className='flex justify-between'>
					<div className=''>
						<h2 className='text-white text-2xl'>Dostępn opcje nauki:</h2>
						{quizDeatails?.randomize1Question ||
						quizDeatails?.randomize40Questions ||
						quizDeatails?.randomizeXQuestions ||
						quizDeatails?.rankedGame ||
						quizDeatails?.showAllQuestions ||
						quizDeatails?.printTest ||
						quizDeatails?.competeWithFriends ? (
							<>
								<ul>
									{quizDeatails?.randomize1Question && <li>Losuj 1 pytanie</li>}
									{quizDeatails?.randomize40Questions && <li>Losuj 40 pytań</li>}
									{quizDeatails?.randomizeXQuestions && <li>Losuj x pytań</li>}
									{quizDeatails?.rankedGame && <li>Losuj 40 pytań - gra rankingowa</li>}
									{quizDeatails?.showAllQuestions && <li>Pokaż wszystkie pytania</li>}
									{quizDeatails?.printTest && <li>Drukuj test z losowymi pytaniami</li>}
									{quizDeatails?.competeWithFriends && <li>Rywalizuj ze znajomymi</li>}
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
				<span className='text-white text-2xl mt-[20px]'>Komentarze: </span>
			</div>
		</main>
	)
}
