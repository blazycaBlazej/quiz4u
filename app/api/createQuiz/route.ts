import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import prisma from '@/lib/db/db'
import { Prisma } from '@prisma/client'

export async function POST(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions)
		const { quizName } = await req.json()

		if (!session?.user?.isAdmin)
			return NextResponse.json({ message: 'Nie masz odppowiednich uprawnień.' }, { status: 403 })

		if (quizName === '' || quizName.length > 15 || quizName.length < 5)
			return NextResponse.json({ message: 'Nazwa Quizu jest nie poprawna.' }, { status: 422 })

		await prisma.menu.create({
			data: {
				name: quizName,
				isNew: true,
				pathname: `/${quizName}`,
				icon: 'IconAbc',
				shouldDisplayWhenLoggedIn: true,
			},
		})
		return NextResponse.json({ message: 'Quiz został utworzony' }, { status: 200 })
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2002') {
				return NextResponse.json({ message: 'Quiz o podanej nazwie już istnieje.' }, { status: 422 })
			}
		}
		return NextResponse.json({ message: 'Wewnętrzny błąd serwera.' }, { status: 500 })
	}
}
