import { cache } from 'react'
import prisma from './db/db'
import { quiz } from '@/types/types'
import { getIsLogged } from './getIsLogged'

export const getRandomSavedQuestion = cache(async (quizName: string) => {
	const user = await getIsLogged()

	if (user.id) {
		if (quizName) {
			try {
				const quiz = await prisma.quiz.findUnique({
					where: {
						name: quizName,
					},
					select: {
						id: true,
					},
				})

				if (quiz?.id) {
					const savedQuestion: quiz[] | null = await prisma.$queryRaw`SELECT Question.* 
					FROM SavedQuestions
					JOIN Question ON SavedQuestions.questionID = Question.id
					WHERE SavedQuestions.userID = ${user.id} AND Question.quizID = ${quiz.id}
					ORDER BY RAND()
					LIMIT 1;`

					if (savedQuestion) {
						if (savedQuestion.length > 0) return { message: 'ok', data: savedQuestion }
					}

					return { message: `Nie posiadasz żadnych zapisanych pytań w quizie - ${quizName}.`, data: null }
				}
			} catch (e) {
				return { message: `Błąd serwera`, data: null }
			}
		}
	} else {
		return { message: `Użytkownik musi być zalogowany`, data: null }
	}

	return { message: `Błąd serwera`, data: null }
})
