import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db/db'
import { genereteJSWT } from '@/lib/lib'
import { sendResetPasswordMai } from '@/lib/sendResetPasswordMail'

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
						const token = await genereteJSWT(user.id, '1h')
						if (token) {
							await prisma.verifyToken.update({
								where: {
									userId: user.id,
								},
								data: {
									token,
								},
							})
							await sendResetPasswordMai(email, user.login, token)
							return NextResponse.json(
								{ message: 'Instrukcja zmiany hasła została wysłana na maila.' },
								{ status: 200 },
							)
						} else {
							return NextResponse.json({ message: 'Błąd serwera. Spróbuj później.' }, { status: 500 })
						}
					} else {
						const timeToResend = new Date(res.updateddAt.getTime() + 5 * 60 * 1000)
						const localTime = timeToResend.toLocaleTimeString()
						return NextResponse.json(
							{ message: `Ponowne wysłanie maila jest możliwe o: ${localTime}` },
							{ status: 500 },
						)
					}
				} else {
					const token = await genereteJSWT(user.id, '1h')
					if (token) {
						await prisma.verifyToken.create({
							data: {
								userId: user.id,
								token,
							},
						})
						await sendResetPasswordMai(email, user.login, token)
						return NextResponse.json({ message: 'Instrukcja zmiany hasła została wysłana na maila.' }, { status: 200 })
					} else {
						return NextResponse.json({ message: 'Błąd serwera. Spróbuj później.' }, { status: 500 })
					}
				}
			} else {
				return NextResponse.json(
					{ message: 'Twoje konto nie jest aktywne, nie możesz zmienić hasła.' },
					{ status: 403 },
				)
			}
		} else {
			return NextResponse.json({ message: 'Konto o takim mailu nie istnieje.' }, { status: 500 })
		}
	} catch (e) {
		console.log(e)

		return NextResponse.json({ message: 'Błąd serwera. Spróbuj później.' }, { status: 500 })
	}
}
