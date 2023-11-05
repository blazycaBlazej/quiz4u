import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db/db'
import { Prisma } from '@prisma/client'
import { getIsAdmin } from '@/lib/getIsAdmin'

export async function POST(req: NextRequest) {
	try {
		const { name, description } = await req.json()

		const isAdmin = await getIsAdmin()
		if (!isAdmin) return NextResponse.json({ message: 'Nie masz odppowiednich uprawnień.' }, { status: 403 })

		if (name === '' || name.length > 15 || name.length < 5)
			return NextResponse.json({ message: 'Nazwa Quizu jest nie poprawna.' }, { status: 422 })
		const pathname = `/quiz/${name}`
		await prisma.quiz.create({
			data: {
				name,
				isNew: true,
				pathname,
				description,
				isActive: false,
				randomize1Question: false,
				randomize20Questions: false,
				randomizeXQuestions: false,
				rankedGame: false,
				showAllQuestions: false,
				printTest: false,
				competeWithFriends: false,
			},
		})
		return NextResponse.json(
			{ message: 'Quiz został utworzony', pathname: `/edytuj-quiz/${name}/detale` },
			{ status: 200 },
		)
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2002') {
				return NextResponse.json({ message: 'Quiz o podanej nazwie już istnieje.' }, { status: 422 })
			}
		}
		console.log('errror: ', e)
		return NextResponse.json({ message: 'Wewnętrzny błąd serwera.' }, { status: 500 })
	}
}
