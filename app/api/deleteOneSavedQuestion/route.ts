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

export async function POST(request: NextRequest) {
	const { questionID, userID } = await request.json()

	if (!userID) {
		return NextResponse.json({ message: 'Musisz być zalogowany, aby zapisać pytanie' }, { status: 403 })
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
