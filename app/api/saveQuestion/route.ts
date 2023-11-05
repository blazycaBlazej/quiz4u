import prisma from '@/lib/db/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	const { questionID, userID, quizName } = await request.json()

	if (!userID) {
		return NextResponse.json({ message: 'Musisz być zalogowany, aby zapisać pytanie' }, { status: 403 })
	}
	if (questionID) {
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
				await prisma.savedQuestions.create({
					data: {
						userID,
						questionID,
						quizID: quiz.id,
					},
				})
			}

			return NextResponse.json({ message: 'Zapisano pytanie.' }, { status: 200 })
		} catch (e) {
			return NextResponse.json({ message: 'Błąd serwera' }, { status: 500 })
		}
	}
	return NextResponse.json({ message: 'Błędne dane' }, { status: 422 })
}
