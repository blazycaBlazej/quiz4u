'use client'
import React, { FC, useState } from 'react'
import ManagerOptions from './QuestionsManagerOptions'
import { EditQuestionForm } from './EditQuestionForm'
import { quiz } from '@/types/types'

interface QuestionsManagerTableProps {
	questions: quiz[]
}

const QuestionsManagerTable: FC<QuestionsManagerTableProps> = ({ questions }) => {
	const [optionIsOpen, setOptionIsOpen] = useState<null | number>(null)
	const [editIsOpen, setEditIsOpen] = useState<null | number>(null)

	const toggleEditHandler = (id: number) => {
		setOptionIsOpen(null)
		if (editIsOpen === id) {
			setEditIsOpen(null)
		} else if (editIsOpen === null) {
			setEditIsOpen(id)
		} else {
			setEditIsOpen(id)
		}
	}
	return (
		<div className='overflow-x-auto'>
			<table className='w-full'>
				<thead className='text-black dark:text-white'>
					<tr>
						<th className='px-[16px] text-left'>ID</th>
						<th className='px-[16px] text-left'>PYTANIE</th>
						<th className='px-[16px] text-left'>A</th>
						<th className='px-[16px] text-left'>B</th>
						<th className='px-[16px] text-left'>C</th>
						<th className='px-[16px] text-left'>D</th>
						<th className='px-[16px] text-left'>PRAWIDŁOWA ODPOWIEDŹ</th>
						<th className='px-[16px] text-left'></th>
					</tr>
				</thead>
				<tbody className='text-base'>
					{questions.map((row: quiz) => (
						<React.Fragment key={row.id}>
							<tr className='border-t-[1px] hover:bg-element-backgorund-light dark:hover:dark:bg-element-backgorund-dark/90'>
								<td className='p-[16px]'>{row.id}</td>
								<td className='p-[16px]'>{row.question}</td>
								<td className='p-[16px]'>{row.answerA}</td>
								<td className='p-[16px]'>{row.answerB}</td>
								<td className='p-[16px]'>{row.answerC}</td>
								<td className='p-[16px]'>{row.answerD}</td>
								<td className='p-[16px]'>{row.correctAnswer.replace('answer', '')}</td>
								<td className='p-[16px]'>
									<ManagerOptions
										rowId={row.id}
										optionIsOpen={optionIsOpen}
										setOptionIsOpen={setOptionIsOpen}
										toggleEditHandler={toggleEditHandler}
									/>
								</td>
							</tr>
							<tr>
								<td colSpan={8}>
									<EditQuestionForm
										questionId={row.id}
										question={row.question}
										answerA={row.answerA}
										answerB={row.answerB}
										answerC={row.answerC}
										answerD={row.answerD}
										correctAnswer={row.correctAnswer}
										editIsOpen={editIsOpen}
										toggleEditHandler={toggleEditHandler}
									/>
								</td>
							</tr>
						</React.Fragment>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default QuestionsManagerTable
