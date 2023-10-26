import { cache } from 'react'
import prisma from './db/db'
import { getIsLogged } from './getIsLogged'

export const getSavedQuestionsWithPagination = cache(async (quizName: string, page: number, perPage: number) => {
	try {
		const user = await getIsLogged()

		if (user) {
			const quiz = await prisma.quiz.findUnique({
				where: {
					name: quizName,
				},
				select: {
					id: true,
				},
			})

			const questionsNumber = await prisma.savedQuestions.count({
				where: {
					quizID: quiz?.id,
					userID: user.id,
				},
			})

			const questionsID = await prisma.savedQuestions.findMany({
				where: {
					quizID: quiz?.id,
					userID: user.id,
				},
				select: {
					questionID: true,
				},
				orderBy: {
					id: 'asc',
				},
				take: perPage,
				skip: (page - 1) * perPage,
			})

			const questions = await prisma.question.findMany({
				where: {
					id: {
						in: questionsID.map(question => question.questionID),
					},
				},
			})

			const data = { questions, questionsNumber }

			if (questions.length > 0) return data
		}

		return null
	} catch (e) {
		return null
	}
})
