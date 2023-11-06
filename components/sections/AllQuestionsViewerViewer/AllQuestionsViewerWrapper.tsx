'use client'

import Link from 'next/link'
import { QuestionView } from './QuestionLView'
import { ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import Button from '../../ui/Button'

type dataPromise = {
	questions: {
		id: number
		question: string
		answerA: string
		answerB: string
		answerC: string
		answerD: string
		correctAnswer: string
		quizID: number
	}[]
	questionsNumber: number
} | null

interface AllQuestionsListWrapper {
	data: dataPromise
	quizName: string
	currentPage: number
	perPage: number
	type: string
}
export const AllQuestionsViewerWrapper = ({ data, quizName, currentPage, perPage, type }: AllQuestionsListWrapper) => {
	const lastPage = typeof data?.questionsNumber === 'number' ? Math.ceil(data?.questionsNumber / perPage) : 10

	const router = useRouter()

	const getPagination = (currentPage: number, lastPage: number) => {
		let pages: (number | string)[] = []
		if (lastPage === 1) {
			return [1]
		}
		pages.push(1)
		if (currentPage - 2 > 2) pages.push('...')
		if (currentPage - 2 > 1) pages.push(currentPage - 2)
		if (currentPage - 1 > 1) pages.push(currentPage - 1)

		if (currentPage !== 1 && currentPage !== lastPage) pages.push(currentPage)

		if (currentPage + 1 < lastPage) pages.push(currentPage + 1)
		if (currentPage + 2 < lastPage) pages.push(currentPage + 2)

		if (currentPage + 2 < lastPage - 1) pages.push('...')
		if (lastPage !== 1) pages.push(lastPage)

		return pages
	}

	const pagination = getPagination(currentPage, lastPage)

	const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		router.push(
			`/${type === 'normal' ? 'quiz' : 'zapisane-pytania'}/${quizName}/wszystkie-pytania?strona=${1}&na-stronie=${
				e.target.value
			}`,
		)
	}

	return (
		<div className='flex w-full flex-col items-center'>
			{data ? (
				<>
					<div className='my-[20px] flex w-full max-w-[600px] flex-col items-center justify-center gap-[10px]'>
						<div className='flex gap-2 '>
							<span className='text-black dark:text-white'>Pytań na stronie: </span>
							<select onChange={(e) => changeHandler(e)} name='' id=''>
								<option value='5'>5</option>
								<option value='10' selected>
									10
								</option>
								<option value='15'>15</option>
								<option value='20'>20</option>
								<option value='30'>30</option>
								<option value='40'>40</option>
								<option value='50'>50</option>
							</select>
						</div>
					</div>
					<div className='flex items-center gap-[20px]'>
						<Button
							href={`/${type === 'normal' ? 'quiz' : 'zapisane-pytania'}/${quizName}/wszystkie-pytania?strona=${
								currentPage === 1 ? currentPage : currentPage - 1
							}&na-stronie=${perPage}`}
							variant={currentPage === 1 ? 'disabled' : 'default'}
							disabled={currentPage === 1}
							rounded='sm'
							size='sm'
						>
							<IconChevronLeft />
						</Button>
						<div className='flex items-center'>
							{pagination.map((element) =>
								element === '...' ? (
									<span className='p-[5px]'>{element}</span>
								) : (
									<Link
										href={`/${
											type === 'normal' ? 'quiz' : 'zapisane-pytania'
										}/${quizName}/wszystkie-pytania?strona=${element}&na-stronie=${perPage}`}
									>
										<span
											className={`ml-[3px] cursor-pointer rounded-md px-[9px] py-[4px] transition-colors hover:bg-element-active-backgorund-light/30 dark:hover:bg-element-active-backgorund-dark/30	
											${element === currentPage ? 'bg-element-active-backgorund-dark/30 text-black dark:text-white ' : ''}`}
										>
											{element}
										</span>
									</Link>
								),
							)}
						</div>

						<Button
							href={`/${type === 'normal' ? 'quiz' : 'zapisane-pytania'}/${quizName}/wszystkie-pytania?strona=${
								currentPage === lastPage ? currentPage : currentPage + 1
							}&na-stronie=${perPage}`}
							variant={currentPage === lastPage ? 'disabled' : 'default'}
							disabled={currentPage === lastPage}
							rounded='sm'
							size='sm'
						>
							<IconChevronRight />
						</Button>
					</div>

					<div className='flex flex-col'>
						<div className='mt-[25px] border-b border-solid border-border-color-light dark:border-border-color-dark'></div>
						{data.questions.map((element, index) => (
							<div key={index}>
								<QuestionView
									id={index + 1 + (currentPage - 1) * perPage}
									quizName={quizName}
									questionID={element.id}
									question={element.question}
									answerA={element.answerA}
									answerB={element.answerB}
									answerC={element.answerC}
									answerD={element.answerD}
									correctAnswer={element.correctAnswer}
								/>

								<div className='mt-[45px] border-b border-solid border-border-color-light dark:border-border-color-dark'></div>
							</div>
						))}
					</div>
				</>
			) : (
				'error'
			)}
		</div>
	)
}