import { cache } from 'react'
import prisma from './db/db'
import { getIsLogged } from './getIsLogged'

export const getSavedQuiz = cache(async (savedQuizID: number) => {
	try {
		const user = await getIsLogged()

		if (user?.id) {
			const savedQuiz = await prisma.savedQuiz.findUnique({
				where: {
					id: savedQuizID,
				},
			})

			if (typeof savedQuiz?.solvedQuizData === 'string') {
				const data = JSON.parse(savedQuiz?.solvedQuizData)
				let questionsID: number[] = []
				data.data.forEach((element: { id: number; markAnswer: string }) => {
					return questionsID.push(element.id)
				})

				const questionsUnSorted = await prisma.question.findMany({
					where: {
						id: {
							in: questionsID,
						},
					},
				})

				//sorting
				const questions = questionsID.map((id) => questionsUnSorted.find((question) => question.id === id))

				if (questions) {
					let array = []
					for (let i = 0; i < questions.length; i++) {
						array.push({ markAnswer: data.data[i].markAnswer, ...questions[i] })
					}
					console.log(array)
					return array
				}
			}
		} else {
			return null
		}
	} catch (e) {
		console.log('error: ', e)
		return null
	}
	return null
})
