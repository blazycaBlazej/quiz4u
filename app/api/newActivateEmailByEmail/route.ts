import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db/db'
import { genereteJSWT } from '@/lib/lib'
import { sendCreateAccountMail } from '@/lib/sendCreateAccountMail'

export async function POST(req: NextRequest) {
	const { email } = await req.json()

	try {
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
			select: {
				id: true,
				login: true,
				isActive: true,
			},
		})

		if (user) {
			if (user.isActive) {
				return NextResponse.json({ message: 'Twoje konto jest aktywne.' }, { status: 403 })
			}

			const res = await prisma.verifyToken.findUnique({
				where: {
					userId: user.id,
				},
				select: {
					updateddAt: true,
				},
			})

			if (res) {
				const now = new Date()
				const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000)
				if (res.updateddAt <= fiveMinutesAgo) {
					const token = genereteJSWT(user.id)
					if (token) {
						await prisma.verifyToken.update({
							where: {
								userId: user.id,
							},
							data: {
								token,
							},
						})
						await sendCreateAccountMail(email, user.login, token)
						return NextResponse.json({ message: 'Nowy link został wysłany.' }, { status: 200 })
					} else {
						return NextResponse.json({ message: 'Błąd serwera. Spróbuj później.' }, { status: 500 })
					}
				} else {
					const timeToResend = new Date(res.updateddAt.getTime() + 5 * 60 * 1000)
					const localTime = timeToResend.toLocaleTimeString()
					return NextResponse.json({ message: `Ponowne wysłanie maila jest możliwe o: ${localTime}` }, { status: 500 })
				}
			} else {
				return NextResponse.json({ message: 'Błąd serwera. Spróbuj później.' }, { status: 500 })
			}
		} else {
			return NextResponse.json({ message: 'Takie konto nie istnieje.' }, { status: 500 })
		}
	} catch (e) {
		console.log(e)

		return NextResponse.json({ message: 'Błąd serwera. Spróbuj później.' }, { status: 500 })
	}
}
