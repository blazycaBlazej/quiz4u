'use client'
import { ThemeProvider as ThemeProvideres } from 'next-themes'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvideres attribute='class' defaultTheme='dark'>
			{children}
		</ThemeProvideres>
	)
}
