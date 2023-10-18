import prisma from '@/lib/db/db'
import { getIsAdmin } from '@/lib/getIsAdmin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const { quizID, question, answerA, answerB, answerC, answerD, correctAnswer } = await req.json()

	try {
		const isAdmin = await getIsAdmin()
		if (!isAdmin) return NextResponse.json({ message: 'Nie masz uprawnień do dodania pytania.' }, { status: 403 })

		if (quizID || question || answerA || answerB || answerC || answerD || correctAnswer) {
			await prisma.question.create({
				data: {
					question,
					answerA,
					answerB,
					answerC,
					answerD,
					correctAnswer,
					quizID,
				},
			})

			return NextResponse.json({ message: 'Pytanie zostało dodane.' }, { status: 200 })
		}
		return NextResponse.json({ message: 'Błędne dane.' }, { status: 422 })
	} catch (e) {
		console.log(e)
		return NextResponse.json({ message: 'Błąd serwera. Spróbuj dodać pyanie później.' }, { status: 500 })
	}
}
