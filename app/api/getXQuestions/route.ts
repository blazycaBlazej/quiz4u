import prisma from '@/lib/db/db'
import { NextRequest, NextResponse } from 'next/server'
import { quiz } from '@/types/types'

export async function POST(req: NextRequest) {
	try {
		const { quizName, numberQuestions } = await req.json()

		if (numberQuestions < 0) {
			return NextResponse.json({ message: `Liczba pytań nie może być mniejsza od 0.` }, { status: 422 })
		}

		const quiz = await prisma.quiz.findUnique({
			where: {
				name: quizName,
			},
			select: {
				id: true,
				printTest: true,
				isActive: true,
			},
		})

		if (quiz) {
			if (!quiz?.printTest) {
				return NextResponse.json(
					{ message: `W quizie: ${quizName} wyłączona jest opcja drukowania pytań.` },
					{ status: 422 }
				)
			}

			if (!quiz?.isActive) {
				return NextResponse.json({ message: `Quiz: ${quizName} nie jest dostępny.` }, { status: 422 })
			}

			const quizNumberQuestion = await prisma.question.count({
				where: {
					quizID: quiz.id,
				},
			})

			if (numberQuestions > quizNumberQuestion) {
				return NextResponse.json({ message: `Quiz nie posiada tyle pytań.` }, { status: 422 })
			}

			const randomQuestions: quiz[] =
				await prisma.$queryRaw`SELECT * FROM question WHERE quizID = ${quiz.id} ORDER BY RAND() LIMIT ${numberQuestions};`
			console.log(randomQuestions)
			return NextResponse.json({ message: 'ok', data: randomQuestions }, { status: 200 })
		}
	} catch (e) {
		return NextResponse.json({ message: `Błąd serwera.` }, { status: 500 })
	}
}
