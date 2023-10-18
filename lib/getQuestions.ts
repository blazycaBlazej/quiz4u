import { cache } from 'react'
import prisma from './db/db'

export const getQuestions = cache(async (quizName: string) => {
	const questions = await prisma.quiz.findUnique({
		where: {
			name: quizName,
		},
		select: {
			questions: true,
		},
	})

	if (questions?.questions) return questions?.questions
	else return null
})
