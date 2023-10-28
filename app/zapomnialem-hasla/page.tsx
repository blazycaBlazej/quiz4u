'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { IconArrowNarrowLeft, IconLoader } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
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
		<main className='flex flex-col justify-center items-center gap-[20px] h-[calc(100vh-404px)] w-full'>
			<h2 className='max-w-[410px] w-full text-3xl text-white '>Zapomniałeś hasła ?</h2>
			<p className='max-w-[410px] w-full'>Wprowadź swój adres e-mail, aby otrzymać instrukcje resetowania hasła.</p>
			<form className='max-w-[410px] w-full' onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className='max-w-[410px] w-full relative mb-[20px]'>
					<label
						htmlFor='email'
						className={`absolute  pointer-events-none transition-top-left bg-main-backgorund px-[4px] ${
							emailIsActive || getValues('email') ? 'top-[-10px] left-[15px]' : 'top-[12px] left-[20px]'
						}`}>
						Email*
					</label>
					<input
						className=' h-[50px] max-w-[410px] w-full pl-[20px] pr-[50px] bg-main-backgorund border-2  border-border-color rounded-[20px] text-white'
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
					<span className='text-sm text-error-color  block my-[4px]'>{errors.email?.message}</span>
				</div>

				<Button
					variant={isSubmitting || Object.keys(errors).length > 0 ? 'disabled' : 'default'}
					disabled={isSubmitting || Object.keys(errors).length > 0}>
					{isSubmitting ? <Loader /> : 'Resetuj hasło'}
				</Button>
			</form>

			<Link href='/logowanie'>
				<span className='text-white underline cursor-pointer  flex gap-2 text-right transition-colors hover:text-main-font-color'>
					<IconArrowNarrowLeft /> Wróć do logowania
				</span>
			</Link>
		</main>
	)
}
