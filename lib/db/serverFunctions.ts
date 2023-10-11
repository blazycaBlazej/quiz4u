'use server'

import prisma from './db'

export async function emailValidation(fieldValue: string): Promise<string | boolean> {
	try {
		const user = await prisma.user.findUnique({
			where: {
				email: fieldValue,
			},
			select: {
				email: true,
			},
		})

		return user ? 'Konto o podanym mailu już istnieje' : true
	} catch (e) {
		console.log('Error: ' + e)
		return 'Nie mozna sprawdzić czy użytkownik istnieje w bazie'
	}
}

export async function loginValidation(fieldValue: string): Promise<string | boolean> {
	try {
		const user = await prisma.user.findUnique({
			where: {
				login: fieldValue,
			},
			select: {
				login: true,
			},
		})

		return user ? 'Konto o podanym loginie już istnieje' : true
	} catch (e) {
		console.log('Error: ' + e)
		return 'Nie mozna sprawdzić czy użytkownik istnieje w bazie'
	}
}
