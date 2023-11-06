'use client'

import Link from 'next/link'
import { useState } from 'react'

import { PrintQuizModal } from '@/components/modal/PrintQuizModal'
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
import { NumberQuestionsModal } from '../../modal/NumberQuestionsModal'

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
		<div className='cointiner m-[0px] mt-[20px] flex flex-col md:m-[33px]'>
			<h3 className='text-3xl text-black dark:text-white'>Opis:</h3>
			<p className='my-[6px]'>
				{quizDeatails?.description === '' ? 'Quiz nie posiada opisu.' : quizDeatails?.description}
			</p>
			<div className='my-[20px] border-b border-solid border-border-color-light dark:border-border-color-dark'></div>
			<div className='flex h-[100%] w-full flex-col items-stretch justify-between gap-5 sm:flex-row '>
				<div className='box flex h-auto w-[100%] grow flex-col gap-4 bg-light-box p-[24px] dark:bg-dark-box sm:w-[50%]'>
					<h2 className='text-2xl text-black  dark:text-white'>Dostępn opcje nauki:</h2>
					{quizDeatails?.randomize1Question ||
					quizDeatails?.randomize20Questions ||
					quizDeatails?.randomizeXQuestions ||
					quizDeatails?.rankedGame ||
					quizDeatails?.showAllQuestions ||
					quizDeatails?.printTest ||
					quizDeatails?.competeWithFriends ? (
						<>
							<ul className='mt-[8px] flex flex-col gap-2'>
								{quizDeatails?.randomize1Question && (
									<Link href={`/quiz/${quizName}/1-pytanie`}>
										<li className='flex cursor-pointer gap-2 transition-colors hover:text-btn-violet-color'>
											<IconDice1 className='text-black dark:text-white ' />
											<span>Losuj 1 pytanie</span>
										</li>
									</Link>
								)}
								{quizDeatails?.randomize20Questions && (
									<Link href={`/quiz/${quizName}/x-pytan?q=20&t=randomize20Questions`}>
										<li className='flex cursor-pointer gap-2 transition-colors hover:text-btn-violet-color'>
											<IconNumber20Small className='text-black dark:text-white ' />
											<span>Losuj 20 pytań</span>
										</li>
									</Link>
								)}
								{quizDeatails?.randomizeXQuestions && (
									<li
										onClick={openQuestionsModal}
										className='flex cursor-pointer gap-2 transition-colors hover:text-btn-violet-color'
									>
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
									<li className='flex cursor-pointer gap-2 transition-colors hover:text-btn-violet-color'>
										<IconMedal className='text-black dark:text-white ' />
										<span>Losuj 20 pytań - gra rankingowa</span>
									</li>
								)}
								{quizDeatails?.showAllQuestions && (
									<Link href={`/quiz/${quizName}/wszystkie-pytania`}>
										<li className='flex cursor-pointer gap-2 transition-colors hover:text-btn-violet-color'>
											<IconEye className='text-black dark:text-white ' />
											<span>Pokaż wszystkie pytania</span>
										</li>
									</Link>
								)}
								{quizDeatails?.printTest && (
									<li
										className='flex cursor-pointer gap-2 transition-colors hover:text-btn-violet-color'
										onClick={openPrintModal}
									>
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
									<li className='flex cursor-pointer gap-2 transition-colors hover:text-btn-violet-color'>
										<IconDeviceGamepad className='text-black dark:text-white ' />
										<span>Rywalizuj ze znajomymi</span>
									</li>
								)}
								<Link href={`/zapisane-pytania`}>
									<li className='flex cursor-pointer gap-2 transition-colors hover:text-btn-violet-color'>
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
			<div className='my-[20px] w-full border-b border-solid border-border-color-light dark:border-border-color-dark'></div>
			<p className='flex gap-2 text-black dark:text-white'>
				<IconBoxMultiple />
				Liczba pytań: {questionsNumber}
			</p>
			<div className='my-[20px] border-b border-solid border-border-color-light dark:border-border-color-dark'></div>

			<span className='flex items-center gap-2 text-2xl text-black dark:text-white'>
				<IconMessage2 />
				Komentarze:
			</span>
		</div>
	)
}

export default QuizDeatails
