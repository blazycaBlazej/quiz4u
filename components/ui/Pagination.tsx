'use client'

import Button from '@/components/ui/Button'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { ChangeEvent, FC } from 'react'

interface PaginationProps {
	questionsNumber: number
	perPage: number
	currentPage: number
}

const Pagination: FC<PaginationProps> = ({ questionsNumber, perPage, currentPage }) => {
	const lastPage = typeof questionsNumber === 'number' ? Math.ceil(questionsNumber / perPage) : 10
	const router = useRouter()
	const pathname = usePathname()

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
		router.push(`${pathname}?strona=${1}&na-stronie=${e.target.value}`)
	}

	return (
		<div className='flex w-full flex-col items-center justify-center'>
			<div className='my-[20px] flex w-full max-w-[600px] flex-col items-center justify-center gap-[10px]'>
				<div className='flex gap-2 '>
					<span className='text-black dark:text-white'>Pytań na stronie: </span>
					<select onChange={(e) => changeHandler(e)} name='' id=''>
						<option defaultValue='10'>10</option>
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
					href={`${pathname}?strona=${currentPage === 1 ? currentPage : currentPage - 1}&na-stronie=${perPage}`}
					variant={currentPage === 1 ? 'disabled' : 'default'}
					disabled={currentPage === 1}
					rounded='sm'
					size='sm'
				>
					<IconChevronLeft />
				</Button>
				<div className='flex items-center'>
					{pagination.map((element, index) =>
						element === '...' ? (
							<span key={index} className='p-[5px]'>
								{element}
							</span>
						) : (
							<Link key={index} href={`${pathname}?strona=${element}&na-stronie=${perPage}`}>
								<span
									className={`ml-[3px] cursor-pointer rounded-md px-[9px] py-[4px] transition-colors hover:bg-element-active-backgorund-light/30 dark:hover:bg-element-active-backgorund-dark/30	${
										element === currentPage ? 'bg-element-active-backgorund-dark/30 text-black dark:text-white' : ''
									}`}
								>
									{element}
								</span>
							</Link>
						),
					)}
				</div>

				<Button
					href={`${pathname}?strona=${currentPage === lastPage ? currentPage : currentPage + 1}&na-stronie=${perPage}`}
					variant={currentPage === lastPage ? 'disabled' : 'default'}
					disabled={currentPage === lastPage}
					rounded='sm'
					size='sm'
				>
					<IconChevronRight />
				</Button>
			</div>
		</div>
	)
}

export default Pagination
