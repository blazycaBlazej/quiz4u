import { nunito } from '@/fonts/fonts'
import { Footer, Navbar } from '../components'
import './globals.css'

import type { Metadata } from 'next'
import { UserSection } from '@/components/layout/UserSection'
import AuthProvider from './context/AuthProvider'

import { getMenuItems } from '@/lib/getMenuItems'
import { getIsLogged } from '@/lib/getIsLogged'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { MenuProvider } from './context/MenuProvider'
import Overlay from '@/components/ui/Overlay'
import ThemeProvider from './context/ThemeProvider'

export const metadata: Metadata = {
	title: 'quiz4u',
	description:
		'Quiz4u - Twoje źródło wiedzy przed egzaminem. Na Quiz4u znajdziesz bogatą kolekcję interaktywnych quizów ABCD, które pomogą Ci skutecznie przygotować się do egzaminów. Rozwiązywanie quizów to doskonały sposób na utrwalenie wiedzy i sprawdzenie swojego poziomu. Niezależnie od przedmiotu czy poziomu trudności, Quiz4u oferuje Ci dostęp do różnorodnych pytań, które pomogą Ci osiągnąć sukces na egzaminie. Zacznij teraz i podnieś swoje umiejętności dzięki Quiz4u!',
	manifest: '/manifest.json',
	icons: '/icon-512x512.png',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const menu = await getMenuItems()
	const user = await getIsLogged()

	return (
		<html lang='en' className={`${nunito.className} dark`} style={{ colorScheme: 'dark' }}>
			<body>
				<ThemeProvider>
					<AuthProvider>
						<MenuProvider>
							<Overlay />
							<div
								className={`flex min-h-screen bg-main-bgn-light text-light-text dark:bg-main-bgn-dark dark:text-dark-text`}
							>
								<Navbar isAdmin={user?.isAdmin} item={menu.menu} areQuizzesIsfetched={menu.areQuizzesIsfetched} />

								<div className='flex w-full flex-col lg:ml-[280px]'>
									<div className='fixed right-0 top-0 z-[998] w-full bg-main-bgn-light dark:bg-main-bgn-dark '>
										<UserSection userName={user?.login} />
									</div>

									<div className='m mx-auto w-full max-w-[1200px] '>
										<div className='mx-[20px] mb-[10px] mt-[90px] '>
											{children}

											{/* <Footer /> */}
										</div>
									</div>
								</div>
							</div>
						</MenuProvider>

						<ToastContainer
							position='top-right'
							autoClose={1000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme='dark'
						/>
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
