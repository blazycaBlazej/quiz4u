'use client'

import React, { useEffect } from 'react'
import { Logo } from './Logo'
import Link from 'next/link'
import { NavbarElement } from './NavbarElement'
import { usePathname } from 'next/navigation'
import { NavbarElementProps } from '@/types/types'
import { IconCirclePlus, IconMenu2 } from '@tabler/icons-react'
import { useMenu } from '@/app/context/MenuProvider'
import FlipMove from 'react-flip-move'
import ThemeButton from './ThemeButton'

interface NavbarProps {
	item: NavbarElementProps[]
	isAdmin: boolean | null | undefined
}
export const Navbar = ({ item, isAdmin }: NavbarProps) => {
	const pathname = usePathname()
	const menuElements = Object.values(item)
	const { isMenuOpen, toggleMenu } = useMenu()

	return (
		<>
			{/* small screen menu */}
			<FlipMove
				duration={300}
				easing='linear'
				enterAnimation={{
					from: { transform: 'translateX(-100%)' },
					to: { transform: 'translateX(0)' },
				}}
				leaveAnimation={{
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(-100%)' },
				}}>
				{isMenuOpen && (
					<nav
						key='nav'
						className={` fixed left-0 top-0 z-[999] w-[280px] h-screen min-h-screen px-4 bg-element-backgorund-light dark:bg-element-backgorund-dark border-r border-solid border-border-color-light dark:border-border-color-dark flex flex-col
		`}>
						<div className='flex items-center gap-3'>
							<span
								onClick={toggleMenu}
								className='block p-[10px] rounded-full cursor-pointer transition-colors hover:bg-element-active-backgorund-light dark:hover:bg-element-active-backgorund-dark lg:hidden'>
								<IconMenu2 />
							</span>
							<span className='lg:ml-[56px]'>
								<Logo />
							</span>
						</div>

						<ul>
							{menuElements.map((element, index) => {
								const isActive =
									decodeURIComponent(pathname) === `${element.pathname}` ||
									decodeURIComponent(pathname) === `/quiz/${element.name}` ||
									decodeURIComponent(pathname) === `/edytuj-quiz/${element.name}/detale` ||
									decodeURIComponent(pathname) === `/edytuj-quiz/${element.name}/dodaj-pytanie` ||
									decodeURIComponent(pathname) === `/edytuj-quiz/${element.name}/zarzadzaj-pytaniami` ||
									decodeURIComponent(pathname) === `/quiz/${element.name}/1-pytanie` ||
									decodeURIComponent(pathname) === `/quiz/${element.name}/x-pytan` ||
									decodeURIComponent(pathname) === `/quiz/${element.name}/wszystkie-pytania` ||
									decodeURIComponent(pathname) === `/zapisane-pytania/${element.name}/1-pytanie` ||
									decodeURIComponent(pathname) === `/zapisane-pytania/${element.name}/x-pytan` ||
									decodeURIComponent(pathname) === `/zapisane-pytania/${element.name}/wszystkie-pytania` ||
									decodeURIComponent(pathname).includes(`/quiz/${element.name}/zapisane-quizy`)

								return (
									<Link key={index} href={`${element.pathname}`}>
										<NavbarElement
											index={index}
											name={element.name}
											isNew={element.isNew}
											isActive={isActive}
											isVisible={element.isActive}
											isAdmin={isAdmin}
											// icon={element.icon}
										/>
									</Link>
								)
							})}
						</ul>
						{isAdmin && (
							<div className='mt-5'>
								<span className='mb-2 block'>Panel administratora:</span>
								<Link href='/dodaj-nowy-quiz'>
									<span
										className={`flex w-full gap-2 cursor-pointer py-[13px]  px-5 transition-colors hover:bg-element-hover-backgorund-light dark:hover:bg-element-hover-backgorund-dark rounded-[12px] ${
											pathname === '/dodaj-nowy-quiz'
												? `text-black dark:text-white bg-element-active-backgorund-light dark:bg-element-active-backgorund-dark`
												: ``
										}`}>
										<IconCirclePlus />
										Dodaj nowy quiz
									</span>
								</Link>
							</div>
						)}
						<ThemeButton />
					</nav>
				)}
			</FlipMove>

			{/* //desktop */}
			<nav
				key='nav'
				className={` fixed left-0 top-0 z-[999] w-[280px] h-screen min-h-screen px-4 bg-element-backgorund-light dark:bg-element-backgorund-dark  white border-r border-solid border-border-color-light dark:border-border-color-dark hidden lg:flex lg:flex-col
		`}>
				<div className='flex items-center gap-3'>
					<span className='lg:ml-[56px]'>
						<Logo />
					</span>
				</div>

				<ul>
					{menuElements.map((element, index) => {
						const isActive =
							decodeURIComponent(pathname) === `${element.pathname}` ||
							decodeURIComponent(pathname) === `/quiz/${element.name}` ||
							decodeURIComponent(pathname) === `/edytuj-quiz/${element.name}/detale` ||
							decodeURIComponent(pathname) === `/edytuj-quiz/${element.name}/dodaj-pytanie` ||
							decodeURIComponent(pathname) === `/edytuj-quiz/${element.name}/zarzadzaj-pytaniami` ||
							decodeURIComponent(pathname) === `/quiz/${element.name}/1-pytanie` ||
							decodeURIComponent(pathname) === `/quiz/${element.name}/x-pytan` ||
							decodeURIComponent(pathname) === `/quiz/${element.name}/wszystkie-pytania` ||
							decodeURIComponent(pathname) === `/zapisane-pytania/${element.name}/1-pytanie` ||
							decodeURIComponent(pathname) === `/zapisane-pytania/${element.name}/x-pytan` ||
							decodeURIComponent(pathname) === `/zapisane-pytania/${element.name}/wszystkie-pytania` ||
							decodeURIComponent(pathname).includes(`/quiz/${element.name}/zapisane-quizy`)

						return (
							<Link key={index} href={`${element.pathname}`}>
								<NavbarElement
									index={index}
									name={element.name}
									isNew={element.isNew}
									isActive={isActive}
									isVisible={element.isActive}
									isAdmin={isAdmin}
									// icon={element.icon}
								/>
							</Link>
						)
					})}
				</ul>
				{isAdmin && (
					<div className='mt-5'>
						<span className='mb-2 block'>Panel administratora:</span>
						<Link href='/dodaj-nowy-quiz'>
							<span
								className={`flex w-full gap-2 cursor-pointer py-[13px]  px-5 transition-colors hover:bg-element-hover-backgorund-light dark:hover:bg-element-hover-backgorund-dark rounded-[12px] ${
									pathname === '/dodaj-nowy-quiz'
										? `text-black dark:text-white  bg-element-active-backgorund-light dark:bg-element-active-backgorund-dark`
										: ``
								}`}>
								<IconCirclePlus />
								Dodaj nowy quiz
							</span>
						</Link>
					</div>
				)}

				<ThemeButton />
			</nav>
		</>
	)
}
