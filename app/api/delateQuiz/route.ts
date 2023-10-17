import prisma from '@/lib/db/db'
import { getIsAdmin } from '@/lib/getIsAdmin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const { quizName } = await req.json()
	console.log(quizName)
	try {
		const isAdmin = await getIsAdmin()
		if (!isAdmin) return NextResponse.json({ message: 'Nie masz uprawnień do usunięcia quizu.' }, { status: 403 })

		await prisma.quiz.delete({
			where: {
				name: quizName,
			},
		})

		return NextResponse.json({ message: `Quiz: ${quizName} został usunięty.` }, { status: 200 })
	} catch (e) {
		return NextResponse.json({ message: `Wewnętrzny błąd serwera.` }, { status: 500 })
	}
}
