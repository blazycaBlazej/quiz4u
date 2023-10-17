import { NextRequest, NextResponse } from 'next/server'
import { hashPassword } from '@/lib/db/clientFunctions'
import prisma from '@/lib/db/db'
import { Prisma } from '@prisma/client'

export async function POST(req: NextRequest) {
	const data = await req.json()

	const { login, email, password, confirmPassword, newslatter, rules } = data.data

	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

	if (login.length < 6 || !emailRegex.test(email) || password.length < 6 || password !== confirmPassword || !rules) {
		return NextResponse.json({ message: 'Podane dane są nieprawidłowe.' }, { status: 422 })
	}

	const hashedPassword = await hashPassword(password)

	try {
		const user = await prisma.user.create({
			data: {
				login,
				email,
				password: hashedPassword,
				newslatter,
				isAdmin: false,
			},
		})

		return NextResponse.json({ message: 'Konto zostało założone.' }, { status: 200 })
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2002') {
				return NextResponse.json({ message: 'Użytkownik o podanym loginie lub emaiku już istnieje.' }, { status: 422 })
			}
		}
		return NextResponse.json({ message: 'Błąd serwera. Spróbuj założyć konto później.' }, { status: 500 })
	}
}
