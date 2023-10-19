import prisma from '@/lib/db/db'
import { getIsAdmin } from '@/lib/getIsAdmin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const { id } = await req.json()

	try {
		const isAdmin = await getIsAdmin()
		if (!isAdmin) return NextResponse.json({ message: 'Nie masz uprawnień do usunięcia pytania.' }, { status: 403 })

		await prisma.question.delete({
			where: {
				id,
			},
		})

		return NextResponse.json({ message: `Pytanie zostało usunięte.` }, { status: 200 })
	} catch (e) {
		return NextResponse.json({ message: `Wewnętrzny błąd serwera.` }, { status: 500 })
	}
}
