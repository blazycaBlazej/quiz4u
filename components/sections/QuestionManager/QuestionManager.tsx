import React, { FC } from 'react'
import Pagination from '../../ui/Pagination'
import QuestionsManagerTable from './QuestionsManagerTable'
import { quiz } from '@/types/types'

type dataPromise = {
	questions: quiz[]
	questionsNumber: number
} | null

interface QuestionManagerProps {
	data: dataPromise
	quizName: string
	currentPage: number
	perPage: number
}

const QuestionManager: FC<QuestionManagerProps> = ({ data, quizName, currentPage, perPage }) => {
	if (!data || data.questions.length === 0) return <p>Quiz nie posiada pytań</p>
	else
		return (
			<div className='mb-[25px]' style={{ width: 'calc(100% - 30px)' }}>
				<Pagination questionsNumber={data.questionsNumber} perPage={perPage} currentPage={currentPage} />
				<QuestionsManagerTable questions={data.questions} />
			</div>
		)
}

export default QuestionManager
