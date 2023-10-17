export { default } from 'next-auth/middleware'

export const config = { matcher: ['/profil', '/dodaj-nowy-quiz', '/edit/:path*'] }
