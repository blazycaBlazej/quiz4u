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

interface savedQuestionsInterface {
	id: number
	userID: string
	questionID: number
}
interface savedQuestionsArray {
	savedQuestions: savedQuestionsInterface[]
}

export async function GET(request: NextRequest) {
	const questionID = request.nextUrl.searchParams.get('questionID')
	const userID = request.nextUrl.searchParams.get('userID')

	if (!userID) {
		return NextResponse.json({ messsage: 'Musisz być zalogowany' }, { status: 403 })
	}
	if (questionID) {
		try {
			const userWithSavedQuestions: savedQuestionsArray | null = await prisma.user.findUnique({
				where: {
					id: userID,
				},
				select: {
					savedQuestions: true,
				},
			})

			if (userWithSavedQuestions) {
				const questionIsSaved = userWithSavedQuestions.savedQuestions.find(
					(question: savedQuestionsInterface) => question.questionID === +questionID,
				)

				if (questionIsSaved) {
					return NextResponse.json({ messsage: 'Znaleziono', isSaved: true }, { status: 200 })
				} else {
					return NextResponse.json({ messsage: 'Nie znaleziono', isSaved: false }, { status: 200 })
				}
			}
		} catch (e) {
			return NextResponse.json({ messsage: 'Błąd serwera' }, { status: 500 })
		}
	}
	return NextResponse.json({ messsage: 'Błędne dane' }, { status: 422 })
}

export async function DELETE(request: NextRequest) {
	const { questionID, userID } = await request.json()

	if (!userID) {
		return NextResponse.json({ message: 'Musisz być zalogowany, aby usunąć pytanie' }, { status: 403 })
	}
	if (questionID) {
		try {
			const savedQuestion = await prisma.savedQuestions.findFirst({
				where: {
					userID,
					questionID,
				},
				select: {
					id: true,
				},
			})

			await prisma.savedQuestions.delete({
				where: {
					id: savedQuestion?.id,
				},
			})

			return NextResponse.json({ message: 'Pytanie, zostało usunięte z zapisanych pytań.' }, { status: 200 })
		} catch (e) {
			return NextResponse.json({ message: 'Błąd serwera' }, { status: 500 })
		}
	}
	return NextResponse.json({ message: 'Błędne dane' }, { status: 422 })
}
