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
			<body className={`flex bg-main-backgorund  min-h-screen text-main-font-color`}>
				<div className='sticky  h-1 left-0 top-0 z-[1]'>
					<Navbar />
				</div>
				<div className='flex flex-col w-full'>
					<div className='sticky bg-main-backgorund top-0 z-[1]'>
						<UserSection />
					</div>
					{children}
				</div>
			</body>
		</html>
	)
}
