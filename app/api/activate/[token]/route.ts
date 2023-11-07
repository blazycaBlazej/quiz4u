import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/db/db'
import { NextRequest } from 'next/server'

interface DbObject {
	userId: string
	iat: number
	exp: number
}

export async function GET(req: NextRequest, { params }: { params: { token: string } }) {
	if (process.env.JWT_SECRET) {
		let decoded
		try {
			decoded = jwt.verify(params.token, process.env.JWT_SECRET) as jwt.JwtPayload
		} catch (e) {
			console.log(e)
			redirect(`/nowy-link-aktywacyjny?token=${params.token}`) // token wygasl
		}

		const dbObject = await prisma.verifyToken.findUnique({
			where: {
				userId: decoded.userId,
			},
			select: {
				token: true,
			},
		})

		if (!dbObject) {
			redirect('/error') //error
		} else {
			if (dbObject.token === params.token) {
				await prisma.verifyToken.delete({
					where: {
						userId: decoded.userId,
					},
				})

				await prisma.user.update({
					where: {
						id: decoded.userId,
					},
					data: {
						isActive: true,
					},
				})

				redirect(`/logowanie?isActived=true`) //ok
			} else {
				redirect('/error') //error token sie nie zgadza
			}
		}
	}
}
