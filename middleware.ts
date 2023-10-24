export { default } from 'next-auth/middleware'

export const config = {
	matcher: [
		'/profil',
		'/zapisane-pytania',
		'/dodaj-nowy-quiz',
		'/edytuj-quiz/:path*/detale',
		'/edytuj-quiz/:path*/dodaj-pytanie',
		'/edytuj-quiz/:path*/zarzadzaj-pytaniami',
	],
}
