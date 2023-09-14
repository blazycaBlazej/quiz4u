import { nunito } from '@/fonts/fonts'
import { Navbar } from '../components'
import './globals.css'

import type { Metadata } from 'next'
import { UserSection } from '@/components/UserSection'

export const metadata: Metadata = {
	title: 'quiz4u',
	description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className={nunito.className}>
			<body className={`flex z-10 bg-main-backgorund  min-h-full text-main-font-color`}>
				<Navbar />
				<UserSection />
				{children}
			</body>
		</html>
	)
}
