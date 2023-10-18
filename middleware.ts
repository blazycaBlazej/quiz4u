export { default } from 'next-auth/middleware'

export const config = {
	matcher: [
		'/profil',
		'/dodaj-nowy-quiz',
		'/edytuj-quiz/:path*/detale',
		'/edytuj-quiz/:path*/dodaj-pytanie',
		'/edytuj-quiz/:path*/zarzadzaj-pytaniami',
	],
}
