import prisma from '@/lib/db/db'
import { getIsLogged } from '@/lib/getIsLogged'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	const { quizName, data, questionNumber, numberOfCorrectAnswer } = await request.json()
	try {
		const user = await getIsLogged()

		if (user?.id) {
			await prisma.savedQuiz.create({
				data: {
					userID: user.id,
					quizName,
					solvedQuizData: JSON.stringify({ data }),
					questionNumber,
					numberOfCorrectAnswer,
				},
			})

			return NextResponse.json({ message: 'Zapisano pytanie.' }, { status: 200 })
		} else {
			return NextResponse.json({ message: 'Musisz być zalogowany, aby zapisać test.' }, { status: 422 })
		}
	} catch (e) {
		console.log(e)
		return NextResponse.json({ message: 'Błąd serwera' }, { status: 500 })
	}
}
