'use client'

import { Menu, Transition } from '@headlessui/react'
import {
	IconChevronLeft,
	IconChevronLeftPipe,
	IconChevronRight,
	IconChevronRightPipe,
	IconDotsVertical,
} from '@tabler/icons-react'
import {
	useReactTable,
	createColumnHelper,
	getCoreRowModel,
	flexRender,
	getPaginationRowModel,
	Row,
	ColumnDef,
	getExpandedRowModel,
} from '@tanstack/react-table'
import React, { useState } from 'react'
import { EditQuestionForm } from './EditQuestionForm'
import useSWR, { mutate } from 'swr'
import { Loader } from '.'

type Table = {
	id: number
	question: string
	answerA: string
	answerB: string
	answerC: string
	answerD: string
	correctAnswer: string
}

const columnHelper = createColumnHelper<Table>()

type TableProps<TData> = {
	data: TData[]
	columns: ColumnDef<TData>[]
	renderSubComponent: (props: { row: Row<TData> }) => React.ReactElement
	getRowCanExpand: (row: Row<TData>) => boolean
}

function Table({ data, columns, renderSubComponent, getRowCanExpand }: TableProps<Table>): JSX.Element {
	const table = useReactTable<Table>({
		data,
		columns,
		getRowCanExpand,
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	})

	return (
		<div className='my-[25px]' style={{ width: 'calc(100% - 30px)' }}>
			<span className='flex w-full justify-center text-3xl text-black dark:text-white'>Edytuj detale quizu</span>
			<div className='flex w-full justify-end'>
				<button
					className='cursor-pointer text-black transition-colors hover:text-light-text dark:text-white dark:hover:text-dark-text'
					onClick={() => table.setPageIndex(0)}
				>
					<IconChevronLeftPipe />
				</button>
				<button
					className='cursor-pointer text-black transition-colors hover:text-light-text dark:text-white dark:hover:text-dark-text'
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					<IconChevronLeft />
				</button>
				<button
					className='cursor-pointer text-black transition-colors hover:text-light-text dark:text-white dark:hover:text-dark-text'
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					<IconChevronRight />
				</button>
				<button
					className='cursor-pointer text-black transition-colors hover:text-light-text dark:text-white dark:hover:text-dark-text'
					onClick={() => table.setPageIndex(table.getPageCount() - 1)}
				>
					<IconChevronRightPipe />
				</button>
			</div>
			<div className='overflow-x-auto'>
				<table className='w-full'>
					<thead className='text-black dark:text-white'>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th key={header.id}>
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody className='text-base '>
						{table.getRowModel().rows.map((row) => (
							<>
								<tr
									key={row.id}
									className='border-t-[1px] hover:bg-element-backgorund-light dark:hover:dark:bg-element-backgorund-dark/90'
								>
									{row.getVisibleCells().map((cell) => (
										<td key={cell.id} className='p-[16px]'>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</td>
									))}
								</tr>
								{row.getIsExpanded() && (
									<tr>
										{/* 2nd row is a custom 1 cell row */}
										<td colSpan={row.getVisibleCells().length}>{renderSubComponent({ row })}</td>
									</tr>
								)}
							</>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

interface Question {
	id: number
	question: string
	answerA: string
	answerB: string
	answerC: string
	answerD: string
	correctAnswer: string
	quizID: number
}

interface TableComponentProps {
	quizName: string
}
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const TableComponent = ({ quizName }: TableComponentProps) => {
	const { data, error, isLoading } = useSWR(`/api/getQuestions?quizName=${quizName}`, fetcher)

	const delateElement = async (id: number) => {
		try {
			const res = await fetch('/api/deleteQuestion', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id }),
			})

			if (res.status === 200) {
				mutate(`/api/getQuestions?quizName=${quizName}`)
			}
		} catch (e) {
			console.log('Błąd serwera, spróbuj zalogować się później.')
		}
	}

	const renderSubComponent = ({ row }: { row: Row<Table> }) => {
		console.log(quizName)
		const { id, question, answerA, answerB, answerC, answerD, correctAnswer } = row.original
		return (
			<EditQuestionForm
				question={question}
				answerA={answerA}
				answerB={answerB}
				answerC={answerC}
				answerD={answerD}
				correctAnswer={correctAnswer}
				questionId={id}
				quizName={quizName}
			/>
		)
	}

	const columns: ColumnDef<Table>[] = [
		// {
		// 	id: 'deleate',
		// 	cell: ({ row }) => <input type='checkbox' id={`${row.id}`} />,
		// },
		{
			header: 'id',
			id: 'id',
			accessorKey: 'id',
		},
		{
			header: 'PYTANIE',
			accessorKey: 'question',
		},
		{
			header: 'A',
			accessorKey: 'answerA',
		},
		{
			header: 'B',
			accessorKey: 'answerB',
		},
		{
			header: 'C',
			accessorKey: 'answerC',
		},
		{
			header: 'D',
			accessorKey: 'answerD',
		},
		{
			header: 'Prawidłowa odpowiedź',
			accessorKey: 'correctAnswer',
		},
		{
			id: 'options',
			cell: ({ row }) => {
				const rowData = row.original
				return row.getCanExpand() ? (
					<Menu as='div' className=''>
						<Menu.Button>
							<IconDotsVertical className='z-[-1] cursor-pointer text-black transition-colors hover:text-btn-violet-color dark:text-white' />
						</Menu.Button>
						<Transition
							enter=' transition transform ease-out duration-200'
							enterFrom='opacity-0 scale-0'
							enterTo='opacity-100 scale-100'
							leave='transition transform ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-0'
						>
							<Menu.Items
								as='div'
								className={`absolute right-0 flex w-[110px] flex-col rounded border border-border-color-light bg-element-backgorund-light dark:border-border-color-dark dark:bg-element-backgorund-dark `}
							>
								<Menu.Item>
									<span
										onClick={row.getToggleExpandedHandler()}
										className='cursor-pointer p-[8px] text-black transition-colors hover:bg-element-hover-backgorund-light dark:text-white dark:hover:bg-element-hover-backgorund-dark'
									>
										{row.getIsExpanded() ? 'Pokaż mniej' : 'Pokaż więcej'}
									</span>
								</Menu.Item>
								<Menu.Item>
									<span className='cursor-pointer p-[8px]  text-sm text-black transition-colors hover:bg-element-hover-backgorund-light dark:text-white dark:hover:bg-element-hover-backgorund-dark'>
										Edytuj
									</span>
								</Menu.Item>
								<Menu.Item>
									<span
										onClick={() => delateElement(rowData.id)}
										className='cursor-pointer p-[8px]  text-sm text-black transition-colors hover:bg-element-hover-backgorund-light dark:text-white dark:hover:bg-element-hover-backgorund-dark'
									>
										Usuń
									</span>
								</Menu.Item>
							</Menu.Items>
						</Transition>
					</Menu>
				) : (
					<span>error</span>
				)
			},
		},
	]

	if (error) return <div>failed to load</div>
	if (isLoading) return <Loader />
	return data.data.length > 0 ? (
		<Table data={data.data} columns={columns} getRowCanExpand={() => true} renderSubComponent={renderSubComponent} />
	) : (
		<div>Nie ma pytań w bazie</div>
	)
}
