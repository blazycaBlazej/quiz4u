'use client'

import React, { useState } from 'react'
import { IconArrowNarrowLeft } from '@tabler/icons-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Button from '@/components/ui/Button'
import { Loader } from '@/components'

export default function page() {
	const [isLoading, setIsLoading] = useState(false)
	const clickHandler = async () => {
		const { notification } = await import('@/lib/lib')
		setIsLoading(true)
		const res = await fetch('/api/newActivateEmailByEmail', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		})

		const result = await res.json()

		res.status === 200
			? await notification('success', `${result.message}`)
			: await notification('error', `${result.message}`)

		setIsLoading(false)
	}
	const searchParams = useSearchParams()

	const email = searchParams.get('email')
	return (
		<main className='m-auto mt-[150px] flex w-full max-w-[410px] flex-col items-center justify-center gap-[20px]'>
			<h2 className='w-full text-3xl text-black dark:text-white '>Wiadomość została wysłana</h2>
			<p className='w-full'>
				Link do aktywacji konta otrzymasz na adrese: <span className='text-black dark:text-white'>{email}</span>
			</p>
			<p className='w-full'>Zobacz folder spam, jeśli nie otrzymałeś wiadomości !</p>
			<p className='w-full'>Nie dostałeś wiadomości ? - kliknij poniższy przycisk</p>

			<Button onClick={clickHandler} disabled={isLoading} variant={isLoading ? 'disabled' : 'default'}>
				{isLoading ? <Loader /> : 'Wyślij ponownie email'}
			</Button>

			<Link href='/logowanie'>
				<span className='flex cursor-pointer  gap-2 text-right  text-black underline transition-colors hover:text-light-text dark:text-white dark:hover:text-dark-text'>
					<IconArrowNarrowLeft /> Wróć do logowania
				</span>
			</Link>
		</main>
	)
}
