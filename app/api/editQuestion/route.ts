import prisma from '@/lib/db/db'
import { getIsAdmin } from '@/lib/getIsAdmin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		const isAdmin = await getIsAdmin()
		if (!isAdmin) return NextResponse.json({ message: 'Nie masz uprawnień do edycji pytania.' }, { status: 403 })
		const { questionId, question, answerA, answerB, answerC, answerD, correctAnswer } = await req.json()

		if (questionId && question && answerA && answerB && answerC && answerD && correctAnswer) {
			await prisma.question.update({
				where: {
					id: questionId,
				},
				data: {
					question,
					answerA,
					answerB,
					answerC,
					answerD,
					correctAnswer,
				},
			})
			return NextResponse.json({ message: 'Pytanie zostało zakutalizowane.' }, { status: 200 })
		} else return NextResponse.json({ message: 'Podane dane są nieprawidłowe.' }, { status: 422 })
	} catch (e) {
		return NextResponse.json({ message: 'Błąd serwera. Spróbuj później zedytować pytanie.' }, { status: 500 })
	}
}
