import prisma from '@/lib/db/db'
import { quiz } from '@/types/types'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const quizName = request.nextUrl.searchParams.get('quizName')
	const userID = request.nextUrl.searchParams.get('userID')

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
				WHERE SavedQuestions.userID = ${userID} AND Question.quizID = ${quiz.id}
				ORDER BY RAND()
				LIMIT 1;`

				if (savedQuestion) {
					if (savedQuestion.length > 0)
						return NextResponse.json({ message: 'ok', data: savedQuestion }, { status: 200 })
				}

				return NextResponse.json({ message: 'Quiz nie posiada żadnych pytań' }, { status: 422 })
			}
		} catch (e) {
			return NextResponse.json({ message: 'Błąd serwera' }, { status: 500 })
		}
	}
	return NextResponse.json({ message: 'Błędne dane' }, { status: 422 })
}
