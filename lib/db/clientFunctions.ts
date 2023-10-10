import { hash, compare } from 'bcryptjs'

export async function hashPassword(password: string): Promise<string> {
	const heshedPassword = await hash(password, 12)
	return heshedPassword
}

export async function verifyPassword(password: string, heshedPassword: string) {
	const isValid = await compare(password, heshedPassword)
	return isValid
}
