import prisma from '@/lib/db/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const quizName = request.nextUrl.searchParams.get('quizName')
	if (quizName) {
		const questions = await prisma.quiz.findUnique({
			where: {
				name: quizName,
			},
			select: {
				questions: true,
			},
		})

		if (questions?.questions) return NextResponse.json({ messsage: 'ok', data: questions.questions }, { status: 200 })
		else return NextResponse.json({ messsage: 'Błąd serwera', data: null }, { status: 500 })
	}
	return NextResponse.json({ messsage: 'Błąd serwera', data: null }, { status: 500 })
}
