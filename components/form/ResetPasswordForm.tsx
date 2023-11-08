'use client'

import React, { useState } from 'react'
import { IconArrowNarrowLeft, IconEye, IconEyeOff } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { Loader } from '../ui/Loader'
import Button from '../ui/Button'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export interface FormValues {
	password: string
	confirmPassword: string
}

export const ResetPasswordForm = () => {
	const form = useForm<FormValues>({
		mode: 'onSubmit',
	})

	const [showPassword, setShowPassword] = useState(false)
	const [passwordIsActive, setPasswordIsActive] = useState(false)
	const [confirmPasswordIsActive, setConfirmPasswordIsActive] = useState(false)

	const searchParams = useSearchParams()
	const token = searchParams.get('token') ?? ''

	const router = useRouter()

	const { register, handleSubmit, formState, getValues, setError, clearErrors } = form
	const { errors, isSubmitting } = formState

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

	const onSubmit = async (data: FormValues) => {
		const { notification } = await import('@/lib/lib')
		const { password, confirmPassword } = data
		if (password !== confirmPassword) {
			notification('error', 'Hasła się nie zgadzają.')
			return
		}
		if (token === '') {
			notification('error', 'Nie powinneś się tu znaleźć.')
			router.replace('/')
			return
		}

		try {
			const res = await fetch('/api/resetPassword', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ token, password, confirmPassword }),
			})
			const result = await res.json()
			if (res.status === 200) {
				form.reset()
				router.replace('/logowanie')
				await notification('success', `${result.message}`)
			} else if (res.status === 403) {
				form.reset()
				router.replace('/zapomnialem-hasla')
				await notification('success', `${result.message}`)
			} else {
				await notification('success', `${result.message}`)
			}
		} catch (e) {
			notification('error', 'Błąd serwera, spróbuj zalogować się później.')
		}
	}

	return (
		<main className='mt-[150px] flex w-full flex-col items-center justify-center gap-[20px]'>
			<span className='text-3xl text-black dark:text-white'>Resetuj hasło</span>
			<form className='w-full max-w-[410px]' onSubmit={handleSubmit(onSubmit)} noValidate>
				{/* password */}
				<div className='relative mb-[20px]'>
					<label
						htmlFor='password'
						className={`transition-top-left  pointer-events-none absolute bg-main-bgn-light px-[4px] dark:bg-main-bgn-dark 
						${passwordIsActive || getValues('password') ? 'left-[15px] top-[-10px]' : 'left-[20px] top-[12px]'}`}
					>
						Nowe hasło*
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
				<div className='relative'>
					<label
						htmlFor='confirmPassword'
						className={`transition-top-left  pointer-events-none absolute bg-main-bgn-light px-[4px] dark:bg-main-bgn-dark 
						${confirmPasswordIsActive || getValues('confirmPassword') ? 'left-[15px] top-[-10px]' : 'left-[20px] top-[12px]'}`}
					>
						Powtórz nowe hasło*
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

				<Button
					className='mt-[10px]'
					variant={isSubmitting || Object.keys(errors).length > 0 ? 'disabled' : 'default'}
					disabled={isSubmitting || Object.keys(errors).length > 0}
				>
					{isSubmitting ? <Loader /> : 'Zmień hasło'}
				</Button>

				<Link href='/logowanie'>
					<span className='mt-[15px] flex cursor-pointer gap-2 text-right text-black underline transition-colors hover:text-light-text dark:text-white dark:hover:text-dark-text'>
						<IconArrowNarrowLeft /> Wróć do logowania
					</span>
				</Link>
			</form>
		</main>
	)
}
