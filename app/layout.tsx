import { nunito } from '@/fonts/fonts'
import { Footer, Navbar } from '../components'
import './globals.css'

import type { Metadata } from 'next'
import { UserSection } from '@/components/UserSection'
import AuthProvider from './context/AuthProvider'

import { getMenuItems } from '@/lib/getMenuItems'
import { getIsLogged } from '@/lib/getIsLogged'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { MenuProvider } from './context/MenuProvider'
import Overlay from '@/components/Overlay'
export const metadata: Metadata = {
	title: 'quiz4u',
	description:
		'Quiz4u - Twoje źródło wiedzy przed egzaminem. Na Quiz4u znajdziesz bogatą kolekcję interaktywnych quizów ABCD, które pomogą Ci skutecznie przygotować się do egzaminów. Rozwiązywanie quizów to doskonały sposób na utrwalenie wiedzy i sprawdzenie swojego poziomu. Niezależnie od przedmiotu czy poziomu trudności, Quiz4u oferuje Ci dostęp do różnorodnych pytań, które pomogą Ci osiągnąć sukces na egzaminie. Zacznij teraz i podnieś swoje umiejętności dzięki Quiz4u!',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const menuElements = await getMenuItems()
	const user = await getIsLogged()
	// console.log('menu: ', menuElements)
	return (
		<html lang='en' className={nunito.className}>
			<body className={`flex bg-main-backgorund min-h-screen text-main-font-color`}>
				<AuthProvider>
					<MenuProvider>
						<Overlay />
						<Navbar isAdmin={user?.isAdmin} item={...menuElements} />

						<div className='lg:ml-[280px] flex flex-col w-full'>
							<div className='fixed w-full right-0 top-0 z-[998] bg-main-backgorund '>
								<UserSection userName={user?.login} />
							</div>

							<div className='max-w-[1200px] w-full mx-auto m '>
								<div className='mt-[90px] mx-[20px] mb-[10px] '>
									{children}

									{/* <Footer /> */}
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
			</body>
		</html>
	)
}
