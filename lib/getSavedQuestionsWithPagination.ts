import { cache } from 'react'
import prisma from './db/db'

export const getQuestionsWithPagination = cache(async (quizName: string, page: number, perPage: number) => {
	try {
		const quiz = await prisma.quiz.findUnique({
			where: {
				name: quizName,
			},
			select: {
				id: true,
			},
		})

		const questionsNumber = await prisma.question.count({
			where: {
				quizID: quiz?.id,
			},
		})

		const questions = await prisma.question.findMany({
			where: {
				quizID: quiz?.id,
			},
			orderBy: {
				id: 'asc',
			},
			take: perPage,
			skip: (page - 1) * perPage,
		})

		const data = { questions, questionsNumber }

		if (questions.length > 0) return data
		else return null
	} catch (e) {
		return null
	}
})
