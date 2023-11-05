'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { IconMoon, IconSun } from '@tabler/icons-react'
import Button from './Button'
import { useMenu } from '@/app/context/MenuProvider'

const ThemeButton = () => {
	const { resolvedTheme, setTheme } = useTheme()
	const { closeMenu } = useMenu()
	const [mounted, setMounted] = useState(false)
	useEffect(() => {
		if (!('theme' in localStorage)) {
			localStorage.addItem = 'theme'
			localStorage.theme = 'dark'
		} else if (localStorage.theme === 'light') {
			setTheme('light')
		} else {
			setTheme('dark')
		}

		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	if (!('theme' in localStorage)) {
		localStorage.theme = 'dark'
	}

	const setLightTheme = () => {
		localStorage.theme = 'light'
		setTheme('light')
		closeMenu()
	}
	const setDarkTheme = () => {
		localStorage.theme = 'dark'
		setTheme('dark')
		closeMenu()
	}

	return (
		<div className='mb-[10px] mt-auto flex w-full  justify-end'>
			<div className='flex items-center justify-between gap-1 p-[5px] text-black dark:text-white'>
				<div
					onClick={setLightTheme}
					className={`cursor-pointer rounded-full p-2 transition-colors  
					${resolvedTheme === 'light' ? 'bg-btn-violet-color' : 'hover:bg-btn-violet-color-hover'}`}
				>
					<IconSun width={20} height={20} className='' />
				</div>
				<div
					onClick={setDarkTheme}
					className={`cursor-pointer rounded-full p-2 transition-colors 
					${resolvedTheme === 'dark' ? 'bg-btn-violet-color' : 'hover:bg-btn-violet-color-hover '}`}
				>
					<IconMoon width={20} height={20} className='' />
				</div>
			</div>
		</div>
	)
}

export default ThemeButton
