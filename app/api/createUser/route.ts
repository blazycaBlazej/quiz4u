import { NextRequest, NextResponse } from 'next/server'
import { FormValues } from '@/types/types'
import { redirect } from 'next/navigation'
import { hashPassword } from '@/lib/db/clientFunctions'
import prisma from '@/lib/db/db'

export async function POST(req: NextRequest) {
	const data = await req.json()

	const { login, email, password, confirmPassword, newslatter, rules } = data.data

	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

	if (login.length < 6 || !emailRegex.test(email) || password.length < 6 || password !== confirmPassword || !rules) {
		return NextResponse.json({ message: 'Podane dane są nieprawidłowe' }, { status: 422 })
	}

	const hashedPassword = await hashPassword(password)

	try {
		const user = await prisma.user.create({
			data: {
				login,
				email,
				password: hashedPassword,
				newslatter,
			},
		})
		console.log(user)
		return NextResponse.json({ message: 'Konto zostało założone' }, { status: 200 })
	} catch (e) {
		console.log('error: ' + e)
		return NextResponse.json({ message: 'Błąd serwera. Spróbuj założyć konto później' }, { status: 500 })
	}
}
