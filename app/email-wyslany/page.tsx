'use client'

import React from 'react'
import { IconArrowNarrowLeft, IconLoader } from '@tabler/icons-react'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

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
		<main className='flex flex-col justify-center items-center gap-[20px] h-[calc(100vh-404px)] w-full'>
			<h2 className='max-w-[410px] w-full text-3xl text-white '>Wiadomość została wysłana</h2>
			<p className='max-w-[410px] w-full'>
				Link do zresetowania hasła otrzymasz pod adresem: <span className='text-white'>{email}</span>
			</p>
			<p className='max-w-[410px] w-full'>Nie dostałeś wiadomości ? - kliknij poniższy przycisk</p>

			<button
				onClick={clickHandler}
				className={`h-[50px] max-w-[410px] w-full bg-btn-violet-color  rounded-[20px] text-white cursor-pointer transition-colors hover:bg-btn-violet-color-hover`}>
				Wyślij ponownie email
			</button>

			<Link href='/logowanie'>
				<span className='text-white underline cursor-pointer  flex gap-2 text-right transition-colors hover:text-main-font-color'>
					<IconArrowNarrowLeft /> Wróć do logowania
				</span>
			</Link>
		</main>
	)
}
