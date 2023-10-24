import { cache } from 'react'
import prisma from './db/db'
import { getIsLogged } from './getIsLogged'

export const getSavedQuestionsSummary = cache(async () => {
	try {
		const user = await getIsLogged()

		if (user) {
			const savedQuestions = await prisma.savedQuestions.findMany({
				where: {
					userID: user.id,
				},
				include: {
					question: {
						select: {
							quiz: {
								select: {
									name: true,
								},
							},
						},
					},
				},
			})

			// Record = {
			// 	'string': number
			// }
			// np.
			// filmy: 2
			// gry: 6
			const savedQuestionsSummary: Record<string, number> = {}

			savedQuestions.forEach(element => {
				const quizName = element.question.quiz.name
				if (!savedQuestionsSummary[quizName]) {
					savedQuestionsSummary[quizName] = 0
				}
				savedQuestionsSummary[quizName]++
			})

			return savedQuestionsSummary
		}

		return null
	} catch {
		return null
	}
})
