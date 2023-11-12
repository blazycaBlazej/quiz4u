import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db/db'
import { getIsAdmin } from '@/lib/getIsAdmin'

//create
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
		const { Prisma } = await import('@prisma/client')
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2002') {
				return NextResponse.json({ message: 'Quiz o podanej nazwie już istnieje.' }, { status: 422 })
			}
		}
		console.log('errror: ', e)
		return NextResponse.json({ message: 'Wewnętrzny błąd serwera.' }, { status: 500 })
	}
}

//edit
export async function PUT(req: NextRequest) {
	const {
		id,
		name,
		description,
		pathname,
		isNew,
		isActive,
		randomize1Question,
		randomize20Questions,
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
				randomize20Questions,
				randomizeXQuestions,
				rankedGame,
				showAllQuestions,
				printTest,
				competeWithFriends,
			},
		})

		return NextResponse.json(
			{ message: 'Quiz został zaktualizowany.', pathname: `/edytuj-quiz/${name}/detale` },
			{ status: 200 },
		)
	} catch (e) {
		console.log('errror: ', e)
		const { Prisma } = await import('@prisma/client')
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2002') {
				return NextResponse.json(
					{ message: `Nie możesz zmienić nazwy quizu na '${name}', ponieważ quiz o tej nazwiie już istnieje` },
					{ status: 422 },
				)
			}
		}
		return NextResponse.json({ message: 'Błąd serwera. Spróbuj później zedytować quiz.' }, { status: 500 })
	}
}

//delete
export async function DELETE(req: NextRequest) {
	const { quizName } = await req.json()
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
