import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { cache } from 'react'
import prisma from './db/db'

export const revalidate = 72480

export const getMenuItems = cache(async () => {
	const menuItems = await prisma.menu.findMany()
	const session = await getServerSession(authOptions)

	if (session) {
		const filteredItems = menuItems.filter(item => item.shouldDisplayWhenLoggedIn)

		return filteredItems
	}

	return menuItems
})
