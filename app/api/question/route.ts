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

export async function PUT(req: NextRequest) {
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

export async function DELETE(req: NextRequest) {
	const { id } = await req.json()

	try {
		const isAdmin = await getIsAdmin()
		if (!isAdmin) return NextResponse.json({ message: 'Nie masz uprawnień do usunięcia pytania.' }, { status: 403 })

		await prisma.question.delete({
			where: {
				id,
			},
		})

		return NextResponse.json({ message: `Pytanie zostało usunięte.` }, { status: 200 })
	} catch (e) {
		return NextResponse.json({ message: `Wewnętrzny błąd serwera.` }, { status: 500 })
	}
}
