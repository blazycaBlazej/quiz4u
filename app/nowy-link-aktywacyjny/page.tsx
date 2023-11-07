'use client'

import React, { useState } from 'react'
import Button from '@/components/ui/Button'
import { Loader } from '@/components'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function page() {
	const [isLoading, setIsLoading] = useState(false)
	const searchParams = useSearchParams()
	const token = searchParams.get('token')
	const router = useRouter()

	const clickHandler = async () => {
		setIsLoading(true)

		const { notification } = await import('@/lib/lib')

		if (!token) {
			notification('error', 'Nie powinneś tutaj być!')
			setIsLoading(false)
			router.replace('/')
		} else {
			const res = await fetch('/api/newActivateEmailByToken', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ token }),
			})

			const result = await res.json()

			if (res.status === 200) {
				notification('success', `${result.message}`)
				router.replace(`/email-wyslany?email=${result.email}`)
			} else {
				notification('error', `${result.message}`)
			}
		}

		setIsLoading(false)
	}

	return (
		<main className='m-auto mt-[150px] w-full max-w-[410px] flex-col items-center justify-center gap-[20px]'>
			<h2 className='w-full text-3xl text-black dark:text-white '>Upss Twój link rejestracyjny wygasł</h2>

			<p className='my-[20px] w-full'>
				Link rejestracyjny jest ważny tylko przez ograniczony czas. Wydaje się, że ten czas minął. Aby uzyskać nowy
				link, naciśnij przycisk poniżej.
			</p>

			<Button onClick={clickHandler} disabled={isLoading} variant={isLoading ? 'disabled' : 'default'}>
				{isLoading ? <Loader /> : 'Wyślij nowy link!'}
			</Button>
		</main>
	)
}
