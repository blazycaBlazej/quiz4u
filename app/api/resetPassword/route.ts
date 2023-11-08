import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db/db'
import jwt from 'jsonwebtoken'

interface DbObject {
	userId: string
	iat: number
	exp: number
}

export async function POST(req: NextRequest) {
	const { password, confirmPassword, token } = await req.json()

	if (password !== confirmPassword) {
		return NextResponse.json({ message: 'Hasła się nie zgadzają.' }, { status: 422 })
	}

	if (!process.env.JWT_SECRET) {
		return NextResponse.json({ message: 'Błąd serwera. Spróbuj później.' }, { status: 500 })
	}

	let decodedToken
	try {
		decodedToken = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload
	} catch (e) {
		console.log(e)
		return NextResponse.json(
			{ message: 'Token do zmiany hasła wygasł. Muszi rozpącząć proces zmiany hasła od nowa.' },
			{ status: 403 },
		)
	}

	try {
		const { hashPassword } = await import('@/lib/lib')
		const hasedPassword = await hashPassword(password)
		const user = await prisma.user.update({
			where: {
				id: decodedToken.userId,
			},
			data: {
				password: hasedPassword,
			},
		})

		return NextResponse.json({ message: 'Hasło zostało zmienione.' }, { status: 200 })
	} catch (e) {
		return NextResponse.json({ message: 'Błąd serwera. Spróbuj później.' }, { status: 500 })
	}
}
