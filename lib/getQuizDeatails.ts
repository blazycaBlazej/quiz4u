import { cache } from 'react'
import prisma from './db/db'

export const getQuizDeatails = cache(async (quizName: string) => {
	const quizDeatails = await prisma.quiz.findUnique({
		where: {
			name: quizName,
		},
	})

	return quizDeatails
})
