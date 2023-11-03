import prisma from '@/lib/db/db'
import { NextRequest, NextResponse } from 'next/server'
import { quiz } from '@/types/types'

interface questionID {
	questionID: number
}

type questionIDArray = questionID[]

export async function GET(req: NextRequest) {
	try {
		const quizName = req.nextUrl.searchParams.get('quizName')
		let numberQuestions: string | null | number = req.nextUrl.searchParams.get('numberQuestions')

		if (numberQuestions && quizName) {
			numberQuestions = +numberQuestions
		} else {
			return NextResponse.json({ message: `Zle dane` }, { status: 422 })
		}

		if (!numberQuestions || numberQuestions < 0) {
			return NextResponse.json({ message: `Liczba pytań nie może być mniejsza od 0.` }, { status: 422 })
		}

		const quiz = await prisma.quiz.findUnique({
			where: {
				name: quizName,
			},
			select: {
				id: true,
			},
		})

		if (quiz) {
			const quizNumberQuestion = await prisma.savedQuestions.count({
				where: {
					quizID: quiz.id,
				},
			})

			if (numberQuestions > quizNumberQuestion) {
				return NextResponse.json({ message: `Quiz nie posiada tyle pytań.` }, { status: 422 })
			}

			const randomIDQuestions: questionIDArray =
				await prisma.$queryRaw`SELECT questionID FROM SavedQuestions WHERE quizID = ${quiz.id} ORDER BY RAND() LIMIT ${numberQuestions};`

			const randomQuestions: quiz[] = await prisma.question.findMany({
				where: {
					id: {
						in: randomIDQuestions.map(question => question.questionID),
					},
				},
			})

			return NextResponse.json({ message: 'ok', data: randomQuestions }, { status: 200 })
		}
	} catch (e) {
		return NextResponse.json({ message: `Błąd serwera.` }, { status: 500 })
	}
}
