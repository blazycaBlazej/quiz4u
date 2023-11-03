import { cache } from 'react'
import prisma from './db/db'
import { quiz } from '@/types/types'

export const getRandomQuestion = cache(async (quizName: string) => {
	if (quizName) {
		try {
			const quiz = await prisma.quiz.findUnique({
				where: {
					name: quizName,
				},
				select: {
					id: true,
					randomize1Question: true,
					isActive: true,
				},
			})

			if (!quiz?.randomize1Question) {
				return { message: `W quizie: ${quizName} wyłączona jest opcja losowania jednego pytania.`, data: null }
			}

			if (!quiz?.isActive) {
				return { message: `Quiz: ${quizName} nie jest dostępny.`, data: null }
			}

			if (quiz?.id) {
				const randomQuestion: quiz[] | null =
					await prisma.$queryRaw`SELECT * FROM Question WHERE quizID = ${quiz.id} ORDER BY RAND() LIMIT 1;`

				if (randomQuestion) {
					if (randomQuestion.length > 0) return { message: 'ok', data: randomQuestion }
				}

				return { message: `Quiz nie posiada żadnych pytań.`, data: null }
			}
		} catch (e) {
			return { message: `Błąd serwera`, data: null }
		}
	}
	return { message: `Błąd serwera`, data: null }
})
