import prisma from '@/lib/db/db'
import { getIsLogged } from '@/lib/getIsLogged'
import { hashPassword, verifyPassword } from '@/lib/lib'

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		const { data } = await req.json()
		const { currentPasssword, password, confirmPassword } = data

		console.log(currentPasssword, password, confirmPassword)
		if (password !== confirmPassword)
			return NextResponse.json({ message: `Nowe hasła się nie zgadzają.` }, { status: 422 })

		const user = await getIsLogged()

		if (!user.id) return NextResponse.json({ message: 'Musisz być zalogowany, aby zmienić hasło.' }, { status: 403 })

		const oldPasswordDB = await prisma.user.findUnique({
			where: {
				id: user.id,
			},
			select: {
				password: true,
			},
		})

		if (oldPasswordDB) {
			const passwordIsMatch = await verifyPassword(currentPasssword, oldPasswordDB?.password)

			if (!passwordIsMatch) {
				return NextResponse.json({ message: `Aktualne hasło jest błędne.` }, { status: 422 })
			} else {
				const hashedPassword = await hashPassword(password)

				await prisma.user.update({
					where: {
						id: user.id,
					},
					data: {
						password: hashedPassword,
					},
				})
				return NextResponse.json({ message: `Hasło zostało zmienione.` }, { status: 200 })
			}
		}
	} catch (e) {
		return NextResponse.json({ message: `Wewnętrzny błąd serwera.` }, { status: 500 })
	}
}
