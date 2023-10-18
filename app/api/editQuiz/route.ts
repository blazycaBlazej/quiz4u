import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db/db'
import { Prisma } from '@prisma/client'
import { getIsAdmin } from '@/lib/getIsAdmin'

export async function POST(req: NextRequest) {
	const {
		id,
		name,
		description,
		pathname,
		isNew,
		isActive,
		randomize1Question,
		randomize40Questions,
		randomizeXQuestions,
		rankedGame,
		showAllQuestions,
		printTest,
		competeWithFriends,
	} = await req.json()

	try {
		const isAdmin = await getIsAdmin()
		if (!isAdmin) return NextResponse.json({ message: 'Nie masz uprawnień do aktualizacji quizu.' }, { status: 403 })

		await prisma.quiz.update({
			where: {
				id,
			},
			data: {
				name,
				description,
				pathname: `/quiz/${name}`,
				isNew,
				isActive,
				randomize1Question,
				randomize40Questions,
				randomizeXQuestions,
				rankedGame,
				showAllQuestions,
				printTest,
				competeWithFriends,
			},
		})

		return NextResponse.json(
			{ message: 'Quiz został zaktualizowany.', pathname: `/edytuj-quiz/${name}/detale` },
			{ status: 200 }
		)
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2002') {
				return NextResponse.json(
					{ message: `Nie możesz zmienić nazwy quizu na '${name}', ponieważ quiz o tej nazwiie już istnieje` },
					{ status: 422 }
				)
			}
		}
		return NextResponse.json({ message: 'Błąd serwera. Spróbuj założyć konto później.' }, { status: 500 })
	}
}
