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
				<div className='fixed  left-0 top-0 z-[999]'>
					<Navbar />
				</div>
				<div className='ml-[280px] flex flex-col w-full'>
					<div className='fixed w-full right-0 top-0 z-[998] bg-main-backgorund '>
						<UserSection />
					</div>
					<div className='mt-[50px]'>{children}</div>
				</div>
			</body>
		</html>
	)
}
