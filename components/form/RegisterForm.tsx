'use client'

import React, { useState } from 'react'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import Link from 'next/link'
import {
	emailValidation as emailValidationFunc,
	loginValidation as loginValidationFunc,
} from '@/lib/db/serverFunctions'
import { FormValues } from '@/types/types'
import { Loader } from '../ui/Loader'
import Button from '../ui/Button'
import { useRouter } from 'next/navigation'

export const RegisterForm = () => {
	const checkConfirmPassword = () => {
		const passwrod = getValues('password')
		const confirmPassword = getValues('confirmPassword')

		if (passwrod !== confirmPassword) {
			setError('confirmPassword', {
				type: 'manual',
				message: 'Hasła nie zgadzają się',
			})

			return 'Hasła nie zgadzają się'
		}

		clearErrors('confirmPassword')
		clearErrors('password')
		return true
	}

	const [showPassword, setShowPassword] = useState(false)
	const [emailIsActive, setEmailIsActive] = useState(false)
	const [loginIsActive, setLoginIsActive] = useState(false)
	const [passwordIsActive, setPasswordIsActive] = useState(false)
	const [confirmPasswordIsActive, setConfirmPasswordIsActive] = useState(false)
	const [submitingError, setSubmitingError] = useState('')

	const form = useForm<FormValues>({
		mode: 'onSubmit',
	})
	const { register, handleSubmit, formState, getValues, setError, clearErrors } = form
	const { errors, isSubmitting } = formState

	const router = useRouter()

	const onSubmit = async (data: FormValues) => {
		try {
			const res = await fetch('/api/createUser', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ data }),
			})

			const result = await res.json()

			if (res.status === 200) {
				router.push(`/email-wyslany?email=${data.email}`)
				setSubmitingError('')
				form.reset()
				const { notification } = await import('@/lib/lib')
				await notification('success', `${result.message}`)
			} else {
				setSubmitingError(result.message)
			}
		} catch (e) {
			setSubmitingError('Błąd serwera, spróbuj zalogować się później.')
		}
	}
	return (
		<main className='mt-[100px] flex w-full flex-col items-center justify-center gap-[20px]'>
			<span className='text-3xl text-black dark:text-white'>Rejestracja</span>
			<form className='w-full max-w-[410px]' onSubmit={handleSubmit(onSubmit)} noValidate>
				{/* login */}
				<div className='relative mb-[20px] w-full max-w-[410px]'>
					<label
						htmlFor='login'
						className={`transition-top-left  pointer-events-none absolute bg-main-bgn-light px-[4px] dark:bg-main-bgn-dark 
						${loginIsActive || getValues('login') ? 'left-[15px] top-[-10px]' : 'left-[20px] top-[12px]'}`}
					>
						Login*
					</label>
					<input
						className=' h-[50px] w-full max-w-[410px] rounded-[20px] border-2 border-border-color-light bg-main-bgn-light pl-[20px] pr-[50px] text-black dark:border-border-color-dark dark:bg-main-bgn-dark dark:text-white'
						type='text'
						id='login'
						autoComplete='off'
						{...register('login', {
							required: 'Login jest wymagany',
							minLength: {
								value: 6,
								message: 'Login jest za krótki, minimalna ilość znaków to 6',
							},
							maxLength: {
								value: 15,
								message: 'Login jest za długi, maksymalna ilość znaków to 15',
							},
							validate: {
								loginValidation: async (fieldValue) => {
									const result = await loginValidationFunc(fieldValue)
									return result
								},
							},
						})}
						onFocus={() => setLoginIsActive(true)}
						onBlur={() => setLoginIsActive(false)}
					/>
					<span className='my-[4px] block  text-sm text-error-color'>{errors.login?.message}</span>
				</div>
				{/* email */}
				<div className='relative mb-[20px] w-full max-w-[410px]'>
					<label
						htmlFor='email'
						className={`transition-top-left  pointer-events-none absolute bg-main-bgn-light px-[4px] dark:bg-main-bgn-dark 
						${emailIsActive || getValues('email') ? 'left-[15px] top-[-10px]' : 'left-[20px] top-[12px]'}`}
					>
						Email*
					</label>
					<input
						className=' h-[50px] w-full max-w-[410px] rounded-[20px] border-2 border-border-color-light bg-main-bgn-light pl-[20px] pr-[50px] text-black dark:border-border-color-dark dark:bg-main-bgn-dark dark:text-white'
						type='text'
						id='email'
						autoComplete='off'
						{...register('email', {
							required: 'Email jest wymagany',
							pattern: {
								value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
								message: 'Nieprawidłowy format maila',
							},
							validate: {
								emailValidation: async (fieldValue) => {
									const result = await emailValidationFunc(fieldValue)
									return result
								},
							},
						})}
						onFocus={() => setEmailIsActive(true)}
						onBlur={() => setEmailIsActive(false)}
					/>
					<span className='my-[4px] block  text-sm text-error-color'>{errors.email?.message}</span>
				</div>

				{/* password */}
				<div className='relative mb-[20px]'>
					<label
						htmlFor='password'
						className={`transition-top-left  pointer-events-none absolute bg-main-bgn-light px-[4px] dark:bg-main-bgn-dark 
						${passwordIsActive || getValues('password') ? 'left-[15px] top-[-10px]' : 'left-[20px] top-[12px]'}`}
					>
						Hasło*
					</label>
					<input
						className=' h-[50px] w-full max-w-[410px] rounded-[20px] border-2 border-border-color-light bg-main-bgn-light pl-[20px] pr-[50px] text-black dark:border-border-color-dark dark:bg-main-bgn-dark dark:text-white'
						type={showPassword ? 'text' : 'password'}
						id='confirmPassword'
						{...register('password', {
							required: 'Hasło jest wymagane',
							minLength: {
								value: 6,
								message: 'Hasło jest za krótkie, minimalna ilość znaków to 6',
							},
							maxLength: {
								value: 20,
								message: 'Hasło jest za długie, maksymalna ilość znaków to 20',
							},

							validate: {
								checkConfirmPassword,
							},
						})}
						onFocus={() => setPasswordIsActive(true)}
						onBlur={() => setPasswordIsActive(false)}
					/>
					<span
						className='absolute right-[20px] top-[12px] block cursor-pointer text-black transition-colors hover:text-light-text dark:text-white dark:hover:text-dark-text'
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? <IconEyeOff /> : <IconEye />}
					</span>
					<span className='my-[4px] block  text-sm text-error-color'>{errors.password?.message}</span>
				</div>

				{/*confirm password */}
				<div className='relative mb-[20px]'>
					<label
						htmlFor='confirmPassword'
						className={`transition-top-left  pointer-events-none absolute bg-main-bgn-light px-[4px] dark:bg-main-bgn-dark 
						${confirmPasswordIsActive || getValues('confirmPassword') ? 'left-[15px] top-[-10px]' : 'left-[20px] top-[12px]'}`}
					>
						Powtórz hasło*
					</label>
					<input
						className=' h-[50px] w-full max-w-[410px] rounded-[20px] border-2 border-border-color-light bg-main-bgn-light pl-[20px]  pr-[50px] text-black dark:border-border-color-dark dark:bg-main-bgn-dark dark:text-white'
						type={showPassword ? 'text' : 'password'}
						id='password'
						{...register('confirmPassword', {
							required: 'Powtórzenie hasła jest wymagane',
							validate: {
								checkConfirmPassword,
							},
						})}
						onFocus={() => setConfirmPasswordIsActive(true)}
						onBlur={() => setConfirmPasswordIsActive(false)}
					/>
					<span
						className='absolute right-[20px] top-[12px] block cursor-pointer text-black transition-colors hover:text-light-text dark:text-white dark:hover:text-dark-text'
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? <IconEyeOff /> : <IconEye />}
					</span>
					<span className='my-[4px] block  text-sm text-error-color'>{errors.confirmPassword?.message}</span>
				</div>

				<label className='flex gap-2'>
					<div className='flex items-center justify-center gap-2'>
						<input
							className='h-[16px] w-[16px] cursor-pointer'
							type='checkbox'
							id='newsletter'
							{...register('newsletter')}
						/>{' '}
						<span>Chcę otrzymwać wiadomości o nowościach.</span>
					</div>
				</label>

				<label className='flex gap-2'>
					<div className='flex items-center justify-center gap-2'>
						<input
							className='h-[16px] w-[16px] cursor-pointer'
							type='checkbox'
							id='rules'
							{...register('rules', {
								required: 'Akceptacja regulaminu jest wymagana.',
							})}
						/>
						<span>Akceptuję Regulamin i Politykę prywatności *.</span>
					</div>
				</label>
				<span className='my-[4px] block  text-sm text-error-color'>{errors.rules?.message}</span>

				<Button
					variant={isSubmitting || Object.keys(errors).length > 0 ? 'disabled' : 'default'}
					disabled={isSubmitting || Object.keys(errors).length > 0}
				>
					{isSubmitting ? <Loader /> : 'Zarejstruj się'}
				</Button>
			</form>
			{submitingError && <span className='my-[4px] block  text-sm text-error-color'>{submitingError}</span>}
			{/* <DevTool control={control} /> */}

			<Link href='/logowanie'>
				<span className='block cursor-pointer text-right text-black underline transition-colors hover:text-light-text dark:text-white dark:hover:text-dark-text'>
					Masz konto ? - Kliknji aby zalogować się
				</span>
			</Link>
		</main>
	)
}
