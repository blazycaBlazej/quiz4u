import prisma from '@/lib/db/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	const { quizName, userID } = await request.json()

	if (!userID) {
		return NextResponse.json({ message: 'Musisz być zalogowany, aby usunąć zapisane pytania.' }, { status: 403 })
	}
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
				await prisma.savedQuestions.deleteMany({
					where: {
						userID,
						quizID: quiz.id,
					},
				})
				return NextResponse.json(
					{ message: `Wszystkie pytania z quizu: ${quizName} zostały usunięte.` },
					{ status: 200 }
				)
			}
		} catch (e) {
			return NextResponse.json({ message: 'Błąd serwera.' }, { status: 500 })
		}
	}
	return NextResponse.json({ message: 'Błędne dane.' }, { status: 422 })
}
