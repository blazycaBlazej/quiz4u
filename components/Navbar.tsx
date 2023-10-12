'use client'

import React from 'react'
import { Logo } from './Logo'
import Link from 'next/link'
import { NavbarElement } from './NavbarElement'
import { usePathname } from 'next/navigation'
import { NavbarElementProps } from '@/types/types'

export const Navbar = (item: NavbarElementProps[]) => {
	const pathname = usePathname()
	const menuElements = Object.values(item)

	return (
		<nav
			className={`w-[280px] h-screen min-h-screen px-4  bg-element-backgorund  white border-r border-solid border-border-color`}>
			<Logo />
			<ul>
				{menuElements.map((element, index) => {
					const isActive = pathname === element.pathname
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
		</nav>
	)
}
