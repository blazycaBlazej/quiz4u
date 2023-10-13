'use client'

import React from 'react'
import { Logo } from './Logo'
import Link from 'next/link'
import { NavbarElement } from './NavbarElement'
import { usePathname } from 'next/navigation'
import { NavbarElementProps } from '@/types/types'
import { IconCirclePlus } from '@tabler/icons-react'

interface NavbarProps {
	item: NavbarElementProps[]
	isAdmin: boolean | null | undefined
}
export const Navbar = ({ item, isAdmin }: NavbarProps) => {
	const pathname = usePathname()
	const menuElements = Object.values(item)

	const replaceSpacesWithPercent = (inputString: string) => {
		return inputString.replace(/ /g, '%20')
	}

	return (
		<nav
			className={`w-[280px] h-screen min-h-screen px-4  bg-element-backgorund  white border-r border-solid border-border-color`}>
			<Logo />
			<ul>
				{menuElements.map((element, index) => {
					const isActive = pathname === replaceSpacesWithPercent(element.pathname as string)
					console.log(pathname)
					return (
						<Link key={index} href={`${element.pathname}`}>
							<NavbarElement
								index={index}
								name={element.name}
								isNew={element.isNew}
								isActive={isActive}
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
							className={`flex w-full gap-2 cursor-pointer py-[13px]  px-5 transition-colors hover:bg-element-hover-backgorund rounded-[12px] ${
								pathname === '/dodaj-nowy-quiz' ? `text-white bg-element-active-backgorund` : ``
							}`}>
							<IconCirclePlus />
							Dodaj nowy quiz
						</span>
					</Link>
				</div>
			)}
		</nav>
	)
}
