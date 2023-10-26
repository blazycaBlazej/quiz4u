import { cache } from 'react'
import prisma from './db/db'

export const getNumberQuestionInQuiz = cache(async (quizName: string) => {
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

		return questionsNumber
	} catch (e) {
		return null
	}
	return null
})
