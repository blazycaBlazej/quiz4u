import { cache } from 'react'
import prisma from './db/db'
import { getIsLogged } from './getIsLogged'

export const get3SummarySavedQuizzes = cache(async (quizName: string) => {
	try {
		const user = await getIsLogged()
		if (user.id) {
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
			const savedQuizziesCount = await prisma.savedQuiz.count({
				where: {
					userID: user.id,
					quizName,
				},
			})

			if (savedQuizziesSummary.length > 0) {
				return { isLogged: true, savedQuizziesSummary: savedQuizziesSummary, savedQuizziesCount: savedQuizziesCount }
			} else {
				return { isLogged: true, savedQuizziesSummary: null, savedQuizziesCount: 0 }
			}
		}
		return { isLogged: false, savedQuizziesSummary: null, savedQuizziesCount: 0 }
	} catch (e) {
		console.log('error: ', e)
		return null
	}
})
