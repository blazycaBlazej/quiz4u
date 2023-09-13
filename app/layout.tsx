import { nunito } from '@/fonts/fonts'
import { Navbar } from '../components/Navbar'
import './globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'quiz4u',
	description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className={nunito.className}>
			<body className={`bg-main-backgorund w-[1200px] min-h-full`}>
				<Navbar />
				{children}
			</body>
		</html>
	)
}
