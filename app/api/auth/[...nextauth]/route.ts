import prisma from '@/lib/db/db'
import { verifyPassword } from '@/lib/lib'
import { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {},

			// @ts-ignore
			async authorize(credentials: { email: string; password: string }) {
				if (credentials) {
					const { email, password } = credentials

					let user
					try {
						user = await prisma.user.findUnique({
							where: {
								email,
							},
						})
					} catch (e) {
						throw new Error('Błąd serwera, spróbuj zalogować się później.')
					}

					if (user) {
						if (!user.isActive) {
							throw new Error('Twoje konto nie zostało zweryfikowane.')
						}
						const isValid = await verifyPassword(password, user.password)
						if (isValid) {
							return user
						} else throw new Error('Dane do logowania są nieprawidłowe')
					} else {
						throw new Error('Dane do logowania są nieprawidłowe')
					}
				}

				return null
			},
		}),
	],
	callbacks: {
		session: async ({ session, token }) => {
			if (session?.user) {
				session.user.id = token.uid as string
				session.user.newslatter = token.newslatter as boolean
				session.user.isAdmin = token.isAdmin as boolean
				session.user.login = token.login as string
			}
			return session
		},
		jwt: async ({ user, token }) => {
			if (user) {
				token.uid = user.id
				// @ts-ignore
				token.newslatter = user.newslatter
				// @ts-ignore
				token.isAdmin = user.isAdmin
				// @ts-ignore
				token.login = user.login
			}
			return token
		},
	},
	session: {
		strategy: 'jwt',
	},

	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/logowanie',
	},
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
