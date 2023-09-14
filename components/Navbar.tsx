'use client'

import React from 'react'
import { Logo } from './Logo'
import { menuElements } from '@/constans/constans'
import Link from 'next/link'
import { NavbarElement } from './NavbarElement'
import { usePathname } from 'next/navigation'

export const Navbar = () => {
	const pathname = usePathname()

	return (
		<nav className={`w-[360px] px-4 bg-element-backgorund h-full white border-r border-solid border-border-color`}>
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
								icon={element.icon}
							/>
						</Link>
					)
				})}
			</ul>
		</nav>
	)
}
