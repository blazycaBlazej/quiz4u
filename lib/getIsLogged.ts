import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { cache } from 'react'
import prisma from './db/db'

export const revalidate = 72480

export const getIsLogged = cache(async () => {
	const session = await getServerSession(authOptions)
	return session
		? { login: session?.user?.login, isAdmin: session?.user?.isAdmin, id: session?.user?.id }
		: { login: null, isAdmin: false }
})
