'use client'
import Image from 'next/image'
import React, { useState, useRef } from 'react'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import Link from 'next/link'

type FormValues = {
	email: string
	password: string
}

export default function page() {
	const [showPassword, setShowPassword] = useState(false)
	const [emailIsActive, setEmailIsActive] = useState(false)

	const [passwordIsActive, setPasswordIsActive] = useState(false)

	const form = useForm<FormValues>({
		mode: 'onSubmit',
	})
	const { register, control, handleSubmit, formState, getValues } = form
	const { errors, isDirty, isValid, isSubmitting } = formState

	const onSubmit = (data: FormValues) => {
		console.log('form sumbitted', data)
	}
	return (
		<main className='flex flex-col justify-center items-center gap-[20px] h-[calc(100vh-404px)] w-full'>
			<span className='text-3xl text-white'>Logowanie</span>
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
						className=' h-[50px] max-w-[410px] w-full pl-[20px] pr-[50px] bg-main-backgorund border-2  border-border-color rounded-[20px]'
						type='text'
						id='email'
						autoComplete='off'
						{...register('email', {
							required: 'email jest wymagany',
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
				<div className='relative'>
					<label
						htmlFor='password'
						className={`absolute  pointer-events-none transition-top-left bg-main-backgorund px-[4px] ${
							passwordIsActive || getValues('password') ? 'top-[-10px] left-[15px]' : 'top-[12px] left-[20px]'
						}`}>
						Hasło*
					</label>
					<input
						className=' h-[50px] max-w-[410px] w-full pl-[20px] pr-[50px] bg-main-backgorund border-2  border-border-color rounded-[20px]'
						type={showPassword ? 'text' : 'password'}
						id='password'
						{...register('password', {
							required: 'Hasło jest wymagane',
							minLength: {
								value: 6,
								message: 'Hasło jest za krótkie',
							},
						})}
						onFocus={() => setPasswordIsActive(true)}
						onBlur={() => setPasswordIsActive(false)}
					/>
					<span
						className='block absolute top-[12px] right-[20px] cursor-pointer'
						onClick={() => setShowPassword(!showPassword)}>
						{showPassword ? <IconEyeOff /> : <IconEye />}
					</span>
					<span className='text-sm text-error-color  block my-[4px]'>{errors.password?.message}</span>
				</div>
				<Link href='/zmien-haslo'>
					<span className='text-white underline cursor-pointer block text-right my-[10px]'>Zapomniałeś hasła ?</span>
				</Link>

				<button
					disabled={isSubmitting || Object.keys(errors).length > 0}
					className={`h-[50px] max-w-[410px] w-full bg-btn-violet-color  rounded-[20px] text-white cursor-pointer ${
						isSubmitting || Object.keys(errors).length > 0 ? 'bg-gray-600 cursor-not-allowed' : ''
					}`}>
					Zaloguj się
				</button>
			</form>
			{/* <DevTool control={control} /> */}

			<Link href='/rejestracja'>
				<span className='text-white underline cursor-pointer block text-right'>
					Nie masz konta ? - Kliknji aby utworzyć konto
				</span>
			</Link>
		</main>
	)
}
