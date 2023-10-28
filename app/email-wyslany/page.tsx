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
		<main className='flex flex-col justify-center items-center gap-[20px] h-[calc(100vh-404px)] w-full max-w-[410px] m-auto'>
			<h2 className='w-full text-3xl text-white '>Wiadomość została wysłana</h2>
			<p className='w-full'>
				Link do zresetowania hasła otrzymasz pod adresem: <span className='text-white'>{email}</span>
			</p>
			<p className='w-full'>Nie dostałeś wiadomości ? - kliknij poniższy przycisk</p>

			<Button onClick={clickHandler}>Wyślij ponownie email</Button>

			<Link href='/logowanie'>
				<span className='text-white underline cursor-pointer  flex gap-2 text-right transition-colors hover:text-main-font-color'>
					<IconArrowNarrowLeft /> Wróć do logowania
				</span>
			</Link>
		</main>
	)
}
