import { cache } from 'react'
import prisma from './db/db'
import { getIsLogged } from './getIsLogged'

export const get3SummarySavedQuizzes = cache(async (quizName: string) => {
	try {
		const user = await getIsLogged()

		if (user) {
			const savedQuizziesSummary = await prisma.savedQuiz.findMany({
				where: {
					userID: user.id,
					quizName,
				},
				orderBy: {
					createdAt: 'desc',
				},
				take: 3,
				select: {
					questionNumber: true,
					numberOfCorrectAnswer: true,
					createdAt: true,
					id: true,
				},
			})

			if (savedQuizziesSummary.length > 0) {
				return savedQuizziesSummary
			}
		}
		return null
	} catch (e) {
		console.log('error: ', e)
		return null
	}
})
