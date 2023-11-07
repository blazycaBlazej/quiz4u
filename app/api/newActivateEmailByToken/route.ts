import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db/db'
import { genereteJSWT } from '@/lib/lib'
import { sendCreateAccountMail } from '@/lib/sendCreateAccountMail'

export async function POST(req: NextRequest) {
	const { token } = await req.json()
	try {
		const res = await prisma.verifyToken.findFirst({
			where: {
				token,
			},
			select: {
				updateddAt: true,
				userId: true,
				user: {
					select: {
						email: true,
						login: true,
					},
				},
			},
		})
		console.log(res)

		if (res) {
			const now = new Date()
			const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000)
			if (res.updateddAt <= fiveMinutesAgo) {
				const token = genereteJSWT(res.userId)
				if (token) {
					await prisma.verifyToken.update({
						where: {
							userId: res.userId,
						},
						data: {
							token,
						},
					})
					await sendCreateAccountMail(res.user.email, res.user.login, token)
					return NextResponse.json({ message: 'Nowy link został wysłany.', email: res.user.email }, { status: 200 })
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
	} catch (e) {
		console.log(e)

		return NextResponse.json({ message: 'Błąd serwera. Spróbuj później.' }, { status: 500 })
	}
}
