'use client'
import { usePathname } from 'next/navigation'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface MenuContextType {
	isMenuOpen: boolean
	isOverlay: boolean
	toggleMenu: () => void
	openMenu: () => void
	closeMenu: () => void
}
interface MenuProviderProps {
	children: React.ReactNode
}

const MenuContext = createContext<MenuContextType | undefined>(undefined)

export const MenuProvider = ({ children }: MenuProviderProps) => {
	const [isMenuOpen, setMenuOpen] = useState(false)
	const [isOverlay, setIsOverlay] = useState(false)
	const pathname = usePathname()

	useEffect(() => {
		if (isMenuOpen) {
			closeMenu()
		}
	}, [pathname])

	const toggleMenu = () => {
		if (isMenuOpen == false) {
			document.body.style.overflow = 'hidden'
			setIsOverlay(true)
		} else {
			document.body.style.overflow = 'auto'
			setIsOverlay(false)
		}

		setMenuOpen(prev => !prev)
	}

	const openMenu = () => {
		document.body.style.overflow = 'hidden'

		setIsOverlay(true)
		setMenuOpen(true)
	}

	const closeMenu = () => {
		document.body.style.overflow = 'auto'
		setIsOverlay(false)
		setMenuOpen(false)
	}

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				closeMenu()
			}
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<MenuContext.Provider value={{ isMenuOpen, toggleMenu, isOverlay, openMenu, closeMenu }}>
			{children}
		</MenuContext.Provider>
	)
}

export const useMenu = () => {
	const context = useContext(MenuContext)
	if (!context) {
		throw new Error('useMenu must be used within a MenuProvider')
	}
	return context
}
