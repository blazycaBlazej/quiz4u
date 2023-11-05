import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { cache } from 'react'
import prisma from './db/db'

export const getMenuItems = cache(async () => {
	// try {
	const session = await getServerSession(authOptions)
	const menu = [{ name: 'Strona główna', isNew: false, pathname: '/' }]
	const quizzes = await prisma.quiz.findMany({
		select: {
			name: true,
			isNew: true,
			pathname: true,
			isActive: true,
		},
	})

	quizzes.map((quiz) => {
		if (quiz.isActive || session?.user?.isAdmin) {
			menu.push(quiz)
		}
	})

	if (!session) {
		menu.push(
			{ name: 'Rejestracja', isNew: false, pathname: '/rejestracja' },
			{ name: 'Logowanie', isNew: false, pathname: '/logowanie' },
		)
	}
	return menu
	// } catch {
	// 	return null
	// }
})
