import prisma from '@/lib/db/db'
import { quiz } from '@/types/types'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const quizName = request.nextUrl.searchParams.get('quizName')

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
				return NextResponse.json(
					{ message: `W quizie: ${quizName} wyłączona jest opcja losowania jednego pytania.` },
					{ status: 422 }
				)
			}

			if (!quiz?.isActive) {
				return NextResponse.json({ message: `Quiz: ${quizName} nie jest dostępny.` }, { status: 422 })
			}

			if (quiz?.id) {
				const randomQuestion: quiz[] | null =
					await prisma.$queryRaw`SELECT * FROM question WHERE quizID = ${quiz.id} ORDER BY RAND() LIMIT 1;`

				if (randomQuestion) {
					if (randomQuestion.length > 0)
						return NextResponse.json({ message: 'ok', data: randomQuestion }, { status: 200 })
				}

				return NextResponse.json({ message: 'Quiz nie posiada żadnych pytań' }, { status: 422 })
			}
		} catch (e) {
			return NextResponse.json({ message: 'Błąd serwera' }, { status: 500 })
		}
	}
	return NextResponse.json({ message: 'Błędne dane' }, { status: 422 })
}
