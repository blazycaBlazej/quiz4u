import prisma from '@/lib/db/db'
import { NextRequest, NextResponse } from 'next/server'

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
		return NextResponse.json({ messsage: 'Musisz być zalogowany, aby zapisać pytanie' }, { status: 403 })
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
					(question: savedQuestionsInterface) => question.questionID === +questionID
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
