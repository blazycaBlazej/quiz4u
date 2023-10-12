import { nunito } from '@/fonts/fonts'
import { Footer, Navbar } from '../components'
import './globals.css'

import type { Metadata } from 'next'
import { UserSection } from '@/components/UserSection'
import AuthProvider from './context/AuthProvider'

import { getMenuItems } from '@/lib/getMenuItems'
import { getIsLogged } from '@/lib/getIsLogged'

export const metadata: Metadata = {
	title: 'quiz4u',
	description:
		'Quiz4u - Twoje źródło wiedzy przed egzaminem. Na Quiz4u znajdziesz bogatą kolekcję interaktywnych quizów ABCD, które pomogą Ci skutecznie przygotować się do egzaminów. Rozwiązywanie quizów to doskonały sposób na utrwalenie wiedzy i sprawdzenie swojego poziomu. Niezależnie od przedmiotu czy poziomu trudności, Quiz4u oferuje Ci dostęp do różnorodnych pytań, które pomogą Ci osiągnąć sukces na egzaminie. Zacznij teraz i podnieś swoje umiejętności dzięki Quiz4u!',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const menuElements = await getMenuItems()
	const userName = await getIsLogged()

	return (
		<html lang='en' className={nunito.className}>
			<body className={`flex bg-main-backgorund  min-h-screen text-main-font-color`}>
				<AuthProvider>
					<div className='fixed  left-0 top-0 z-[999]'>
						<Navbar {...menuElements} />
					</div>
					<div className='ml-[280px] flex flex-col w-full'>
						<div className='fixed w-full right-0 top-0 z-[998] bg-main-backgorund '>
							<UserSection userName={userName} />
						</div>

						<div className='max-w-[1200px] w-full mx-auto p-[40px] '>
							<div className='mt-[50px]'>
								{children}

								{/* <Footer /> */}
							</div>
						</div>
					</div>
				</AuthProvider>
			</body>
		</html>
	)
}
