'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { IconEye, IconEyeOff, IconLoader } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import Link from 'next/link'

type FormValues = {
	email: string
	login: string
	password: string
	confirmPassword: string
	rules: boolean
	newslatter: boolean
}

export default function page() {
	const [showPassword, setShowPassword] = useState(false)

	const [emailIsActive, setEmailIsActive] = useState(false)
	const [loginIsActive, setLoginIsActive] = useState(false)
	const [passwordIsActive, setPasswordIsActive] = useState(false)
	const [confirmPasswordIsActive, setConfirmPasswordIsActive] = useState(false)

	const form = useForm<FormValues>({
		mode: 'onSubmit',
	})
	const { register, control, handleSubmit, formState, getValues } = form
	const { errors, isSubmitting } = formState

	const onSubmit = (data: FormValues) => {
		console.log('form sumbitted', data)
	}
	return (
		<main className='flex flex-col justify-center items-center gap-[20px] min-h-[calc(100vh-404px)] w-full'>
			<span className='text-3xl text-white'>Rejestracja</span>
			<form className='max-w-[410px] w-full' onSubmit={handleSubmit(onSubmit)} noValidate>
				{/* login */}
				<div className='max-w-[410px] w-full relative mb-[20px]'>
					<label
						htmlFor='login'
						className={`absolute  pointer-events-none transition-top-left bg-main-backgorund px-[4px] ${
							loginIsActive || getValues('login') ? 'top-[-10px] left-[15px]' : 'top-[12px] left-[20px]'
						}`}>
						Login*
					</label>
					<input
						className=' h-[50px] max-w-[410px] w-full pl-[20px] pr-[50px] bg-main-backgorund border-2  border-border-color rounded-[20px] text-white'
						type='text'
						id='login'
						autoComplete='off'
						{...register('login', {
							required: 'Login jest wymagany',
							minLength: {
								value: 6,
								message: 'Login jest za krótki, minimalna ilość znaków to 6',
							},
						})}
						onFocus={() => setLoginIsActive(true)}
						onBlur={() => setLoginIsActive(false)}
					/>
					<span className='text-sm text-error-color  block my-[4px]'>{errors.login?.message}</span>
				</div>
				{/* email */}
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

				{/* password */}
				<div className='relative mb-[20px]'>
					<label
						htmlFor='password'
						className={`absolute  pointer-events-none transition-top-left bg-main-backgorund px-[4px] ${
							passwordIsActive || getValues('password') ? 'top-[-10px] left-[15px]' : 'top-[12px] left-[20px]'
						}`}>
						Hasło*
					</label>
					<input
						className=' h-[50px] max-w-[410px] w-full pl-[20px] pr-[50px] bg-main-backgorund border-2  border-border-color rounded-[20px] text-white'
						type={showPassword ? 'text' : 'password'}
						id='confirmPassword'
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
						className='block absolute top-[12px] right-[20px] cursor-pointer text-white transition-colors hover:text-main-font-color'
						onClick={() => setShowPassword(!showPassword)}>
						{showPassword ? <IconEyeOff /> : <IconEye />}
					</span>
					<span className='text-sm text-error-color  block my-[4px]'>{errors.password?.message}</span>
				</div>

				{/*confirm password */}
				<div className='relative mb-[20px]'>
					<label
						htmlFor='confirmPassword'
						className={`absolute  pointer-events-none transition-top-left bg-main-backgorund px-[4px] ${
							confirmPasswordIsActive || getValues('confirmPassword')
								? 'top-[-10px] left-[15px]'
								: 'top-[12px] left-[20px]'
						}`}>
						Powtórz hasło*
					</label>
					<input
						className=' h-[50px] max-w-[410px] w-full pl-[20px] pr-[50px] bg-main-backgorund border-2  border-border-color rounded-[20px] text-white'
						type={showPassword ? 'text' : 'password'}
						id='password'
						{...register('confirmPassword', {
							required: 'Powtórzenie hasła jest wymagane',
							validate: {
								passwordsEqual: fieldValue => {
									return fieldValue === getValues('password') || 'Hasła nie zgadzają się'
								},
							},
						})}
						onFocus={() => setConfirmPasswordIsActive(true)}
						onBlur={() => setConfirmPasswordIsActive(false)}
					/>
					<span
						className='block absolute top-[12px] right-[20px] cursor-pointer text-white transition-colors hover:text-main-font-color'
						onClick={() => setShowPassword(!showPassword)}>
						{showPassword ? <IconEyeOff /> : <IconEye />}
					</span>
					<span className='text-sm text-error-color  block my-[4px]'>{errors.confirmPassword?.message}</span>
				</div>

				<label className='flex gap-2'>
					<input className='cursor-pointer' type='checkbox' id='newslatter' {...register('newslatter')} /> Chcę
					otrzymwać wiadomości o nowościach.
				</label>

				<label className='flex gap-2'>
					<input
						className='cursor-pointer'
						type='checkbox'
						id='rules'
						{...register('rules', {
							required: 'Akceptacja regulaminu jest wymagana.',
						})}
					/>
					Akceptuję Regulamin i Politykę prywatności *.
				</label>
				<span className='text-sm text-error-color  block my-[4px]'>{errors.rules?.message}</span>

				<button
					disabled={isSubmitting || Object.keys(errors).length > 0}
					className={`h-[50px] max-w-[410px] w-full bg-btn-violet-color  rounded-[20px] text-white cursor-pointer ${
						isSubmitting || Object.keys(errors).length > 0
							? 'bg-gray-600 hover:cursor-not-allowed hover:bg-gray-600'
							: ''
					} transition-colors hover:bg-btn-violet-color-hover`}>
					{isSubmitting ? <IconLoader /> : 'Zarejstruj się'}
				</button>
			</form>
			{/* <DevTool control={control} /> */}

			<Link href='/logowanie'>
				<span className='text-white underline cursor-pointer block text-right transition-colors hover:text-main-font-color'>
					Masz konto ? - Kliknji aby zalogować się
				</span>
			</Link>
		</main>
	)
}