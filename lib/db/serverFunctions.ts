'use server'

import { FormValues } from '@/types/types'
import prisma from './db'
import { redirect } from 'next/navigation'
import { hashPassword } from './clientFunctions'

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

export async function createUser(user: FormValues): Promise<{ error: boolean; message: string }> {
	const { login, email, password, confirmPassword, newslatter, rules } = user

	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

	if (login.length < 6 || !emailRegex.test(email) || password.length < 6 || password !== confirmPassword || !rules) {
		return { error: true, message: 'Podane dane są niepoprawne' }
	}

	const hashedPassword = await hashPassword(password)

	try {
		await prisma.user.create({
			data: {
				login,
				email,
				password: hashedPassword,
				newslatter,
			},
		})
	} catch (e) {
		console.log('error: ' + e)
		return { error: true, message: 'Coś poszło nie tak' }
	}
	redirect('/')
}
