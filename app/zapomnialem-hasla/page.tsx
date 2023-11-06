'use client'

import React, { useState } from 'react'
import { IconArrowNarrowLeft } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { Loader } from '@/components'

type FormValues = {
	email: string
	password: string
}

export default function page() {
	const router = useRouter()
	const [emailIsActive, setEmailIsActive] = useState(false)

	const form = useForm<FormValues>({
		mode: 'onSubmit',
	})
	const { register, handleSubmit, formState, getValues } = form
	const { errors, isSubmitting } = formState

	const onSubmit = (data: FormValues) => {
		router.push(`/email-wyslany?email=${data.email}`)
	}
	return (
		<main className='flex h-[calc(100vh-404px)] w-full flex-col items-center justify-center gap-[20px]'>
			<h2 className='w-full max-w-[410px] text-3xl text-black dark:text-white'>Zapomniałeś hasła ?</h2>
			<p className='w-full max-w-[410px]'>Wprowadź swój adres e-mail, aby otrzymać instrukcje resetowania hasła.</p>
			<form className='w-full max-w-[410px]' onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className='relative mb-[20px] w-full max-w-[410px]'>
					<label
						htmlFor='email'
						className={`transition-top-left  pointer-events-none absolute bg-main-bgn-light px-[4px] dark:bg-main-bgn-dark
						${emailIsActive || getValues('email') ? 'left-[15px] top-[-10px]' : 'left-[20px] top-[12px]'} `}
					>
						Email*
					</label>
					<input
						className=' border-border-color h-[50px] w-full max-w-[410px] rounded-[20px] border-2 bg-main-bgn-light pl-[20px]  pr-[50px] text-black dark:bg-main-bgn-dark dark:text-white'
						type='text'
						id='email'
						autoComplete='off'
						{...register('email', {
							required: 'Email jest wymagany',
							pattern: {
								value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
								message: 'Nieprawidłowy format maila',
							},
						})}
						onFocus={() => setEmailIsActive(true)}
						onBlur={() => setEmailIsActive(false)}
					/>
					<span className='my-[4px] block  text-sm text-error-color'>{errors.email?.message}</span>
				</div>

				<Button
					variant={isSubmitting || Object.keys(errors).length > 0 ? 'disabled' : 'default'}
					disabled={isSubmitting || Object.keys(errors).length > 0}
				>
					{isSubmitting ? <Loader /> : 'Resetuj hasło'}
				</Button>
			</form>

			<Link href='/logowanie'>
				<span className='flex cursor-pointer gap-2 text-right  text-black underline transition-colors hover:text-light-text dark:text-white dark:hover:text-dark-text'>
					<IconArrowNarrowLeft /> Wróć do logowania
				</span>
			</Link>
		</main>
	)
}
