'use client'

import React from 'react'
import { IconArrowNarrowLeft, IconLoader } from '@tabler/icons-react'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Button from '@/components/Button'

type FormValues = {
	email: string
	password: string
}

export default function page() {
	const router = useRouter()

	const clickHandler = () => {
		//resend email
	}
	const searchParams = useSearchParams()

	const email = searchParams.get('email')
	return (
		<main className='m-auto flex h-[calc(100vh-404px)] w-full max-w-[410px] flex-col items-center justify-center gap-[20px]'>
			<h2 className='w-full text-3xl text-black dark:text-white '>Wiadomość została wysłana</h2>
			<p className='w-full'>
				Link do zresetowania hasła otrzymasz pod adresem: <span className='text-black dark:text-white'>{email}</span>
			</p>
			<p className='w-full'>Nie dostałeś wiadomości ? - kliknij poniższy przycisk</p>

			<Button onClick={clickHandler}>Wyślij ponownie email</Button>

			<Link href='/logowanie'>
				<span className='flex cursor-pointer  gap-2 text-right  text-black underline transition-colors hover:text-light-text dark:text-white dark:hover:text-dark-text'>
					<IconArrowNarrowLeft /> Wróć do logowania
				</span>
			</Link>
		</main>
	)
}
