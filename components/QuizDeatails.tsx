'use client'
import { NumberQuestionsModal } from '@/components/NumberQuestionsModal'
import { PrintQuizModal } from '@/components/PrintQuizModal'
import { QuizDataDeatails } from '@/types/types'
import { IconDeviceFloppy, IconPrinter } from '@tabler/icons-react'

import {
	IconDeviceGamepad,
	IconDice1,
	IconEye,
	IconNumber20Small,
	IconMedal,
	IconBoxMultiple,
	IconMessage2,
	IconGrain,
} from '@tabler/icons-react'
import Link from 'next/link'
import { Children, useState } from 'react'
import { LatestQuizzesWrapper } from './LatestQuizzesWrapper'
import { useMenu } from '@/app/context/MenuProvider'

interface QuizDeatailsProps {
	quizDeatails: QuizDataDeatails
	quizName: string
	questionsNumber: number
	savedQuizzes: React.ReactNode
}

const QuizDeatails = ({ quizDeatails, quizName, questionsNumber, savedQuizzes }: QuizDeatailsProps) => {
	//question modal
	const [isQuestionsModalOpen, setQuestionsModalOpen] = useState(false)

	function closeQuestionsModal() {
		setQuestionsModalOpen(false)
	}

	function openQuestionsModal() {
		setQuestionsModalOpen(true)
	}

	//print modal
	const [isPrintModalOpen, setPrintModalOpen] = useState(false)

	function closePrintModal() {
		setPrintModalOpen(false)
	}

	function openPrintModal() {
		setPrintModalOpen(true)
	}

	return (
		<div className='cointiner flex flex-col mt-[20px] m-[0px] md:m-[33px]'>
			<h3 className='text-black dark:text-white text-3xl'>Opis:</h3>
			<p className='my-[6px]'>
				{quizDeatails?.description === '' ? 'Quiz nie posiada opisu.' : quizDeatails?.description}
			</p>
			<div className='border-b border-solid border-border-color-light dark:border-border-color-dark my-[20px]'></div>
			<div className='flex flex-col w-full items-stretch h-[100%] justify-between gap-5 sm:flex-row '>
				<div className='w-[100%] h-auto grow box bg-light-box dark:bg-dark-box p-[24px] flex flex-col gap-4 sm:w-[50%]'>
					<h2 className='text-black dark:text-white  text-2xl'>Dostępn opcje nauki:</h2>
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
										<li className='flex gap-2 transition-colors cursor-pointer hover:text-btn-violet-color'>
											<IconDice1 className='text-black dark:text-white ' />
											<span>Losuj 1 pytanie</span>
										</li>
									</Link>
								)}
								{quizDeatails?.randomize20Questions && (
									<Link href={`/quiz/${quizName}/x-pytan?q=20&t=randomize20Questions`}>
										<li className='flex gap-2 transition-colors cursor-pointer hover:text-btn-violet-color'>
											<IconNumber20Small className='text-black dark:text-white ' />
											<span>Losuj 20 pytań</span>
										</li>
									</Link>
								)}
								{quizDeatails?.randomizeXQuestions && (
									<li
										onClick={openQuestionsModal}
										className='flex gap-2 transition-colors cursor-pointer hover:text-btn-violet-color'>
										<IconGrain className='text-black dark:text-white' />
										<span>Losuj x pytań</span>
										<NumberQuestionsModal
											quizName={quizName}
											questionsNumber={questionsNumber}
											isOpen={isQuestionsModalOpen}
											closeModal={closeQuestionsModal}
											type='normal'
										/>
									</li>
								)}
								{quizDeatails?.rankedGame && (
									<li className='flex gap-2 transition-colors cursor-pointer hover:text-btn-violet-color'>
										<IconMedal className='text-black dark:text-white ' />
										<span>Losuj 20 pytań - gra rankingowa</span>
									</li>
								)}
								{quizDeatails?.showAllQuestions && (
									<Link href={`/quiz/${quizName}/wszystkie-pytania`}>
										<li className='flex gap-2 transition-colors cursor-pointer hover:text-btn-violet-color'>
											<IconEye className='text-black dark:text-white ' />
											<span>Pokaż wszystkie pytania</span>
										</li>
									</Link>
								)}
								{quizDeatails?.printTest && (
									<li
										className='flex gap-2 transition-colors hover:text-btn-violet-color cursor-pointer'
										onClick={openPrintModal}>
										<IconPrinter className='text-black dark:text-white ' />
										<span>Drukuj test z losowymi pytaniami</span>
										<PrintQuizModal
											quizName={quizName}
											questionsNumber={questionsNumber}
											isOpen={isPrintModalOpen}
											closeModal={closePrintModal}
											type='normal'
										/>
									</li>
								)}
								{quizDeatails?.competeWithFriends && (
									<li className='flex gap-2 transition-colors cursor-pointer hover:text-btn-violet-color'>
										<IconDeviceGamepad className='text-black dark:text-white ' />
										<span>Rywalizuj ze znajomymi</span>
									</li>
								)}
								<Link href={`/zapisane-pytania`}>
									<li className='flex gap-2 transition-colors cursor-pointer hover:text-btn-violet-color'>
										<IconDeviceFloppy className='text-black dark:text-white ' />
										<span>Pokaż zapisane pytania</span>
									</li>
								</Link>
							</ul>
						</>
					) : (
						<span>Nie ma dostępnej żadnej opcji nauki</span>
					)}
				</div>

				{savedQuizzes}
			</div>
			<div className='border-b border-solid border-border-color-light dark:border-border-color-dark my-[20px] w-full'></div>
			<p className='flex gap-2 text-black dark:text-white'>
				<IconBoxMultiple />
				Liczba pytań: {questionsNumber}
			</p>
			<div className='border-b border-solid border-border-color-light dark:border-border-color-dark my-[20px]'></div>

			<span className='flex gap-2 items-center text-black dark:text-white text-2xl'>
				<IconMessage2 />
				Komentarze:{' '}
			</span>
		</div>
	)
}

export default QuizDeatails
