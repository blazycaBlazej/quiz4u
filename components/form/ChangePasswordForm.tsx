'use client'

import React, { useState } from 'react'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { Loader } from '../ui/Loader'
import Button from '../ui/Button'
import { notification } from '@/lib/lib'

export interface FormValues {
	currentPasssword: string
	password: string
	confirmPassword: string
}

export const ChangePasswordForm = () => {
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
	const [showCurrentPassword, setShowCurrentPassword] = useState(false)
	const [currentPasswordIsActive, setCurrentPasswordIsActive] = useState(false)
	const [passwordIsActive, setPasswordIsActive] = useState(false)
	const [confirmPasswordIsActive, setConfirmPasswordIsActive] = useState(false)
	const [submitingError, setSubmitingError] = useState('')

	const form = useForm<FormValues>({
		mode: 'onSubmit',
	})
	const { register, handleSubmit, formState, getValues, setError, clearErrors } = form
	const { errors, isSubmitting } = formState

	const onSubmit = async (data: FormValues) => {
		if (data.password === data.confirmPassword) {
			try {
				const res = await fetch('/api/changePassword', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ data }),
				})

				const result = await res.json()
				if (res.status === 200) {
					setSubmitingError('')
					form.reset()
					notification('success', `${result.message}`)
				} else {
					setSubmitingError(result.message)
				}
			} catch (e) {
				setSubmitingError('Błąd serwera, spróbuj zalogować się później.')
			}
		} else {
			setSubmitingError('Hasła się nie zgadzają.')
		}
	}

	const inputChangeHandler = () => {
		if (submitingError !== '') {
			setSubmitingError('')
		}
	}

	return (
		<main className='flex min-h-[calc(100vh-404px)] w-full flex-col items-center justify-center gap-[20px]'>
			<span className='text-3xl text-black dark:text-white'>Zmeiń hasło</span>
			<form className='w-full max-w-[410px]' onSubmit={handleSubmit(onSubmit)} noValidate>
				{/* current password */}
				<div className='relative mb-[20px]'>
					<label
						htmlFor='currentPasssword'
						className={`transition-top-left  pointer-events-none absolute bg-main-bgn-light px-[4px] dark:bg-main-bgn-dark 
						${currentPasswordIsActive || getValues('currentPasssword') ? 'left-[15px] top-[-10px]' : 'left-[20px] top-[12px]'}`}
					>
						Aktualne hasło*
					</label>
					<input
						className=' h-[50px] w-full max-w-[410px] rounded-[20px] border-2 border-border-color-light bg-main-bgn-light pl-[20px] pr-[50px] text-black dark:border-border-color-dark dark:bg-main-bgn-dark dark:text-white'
						type={showCurrentPassword ? 'text' : 'password'}
						id='currentPasssword'
						{...register('currentPasssword', {
							required: 'Obecne hasło jest wymagane',
							minLength: {
								value: 6,
								message: 'Hasło jest za krótkie, minimalna ilość znaków to 6',
							},
							maxLength: {
								value: 20,
								message: 'Hasło jest za długie, maksymalna ilość znaków to 20',
							},
							onChange: inputChangeHandler,
						})}
						onFocus={() => setCurrentPasswordIsActive(true)}
						onBlur={() => setCurrentPasswordIsActive(false)}
					/>
					<span
						className='absolute right-[20px] top-[12px] block cursor-pointer text-black transition-colors hover:text-light-text dark:text-white dark:hover:text-dark-text'
						onClick={() => setShowCurrentPassword(!showCurrentPassword)}
					>
						{showCurrentPassword ? <IconEyeOff /> : <IconEye />}
					</span>
					<span className='my-[4px] block  text-sm text-error-color'>{errors.currentPasssword?.message}</span>
				</div>

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
							onChange: inputChangeHandler,
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
							onChange: inputChangeHandler,
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

				{submitingError && (
					<span className='block pt-[10px] text-center text-sm text-error-color'>{submitingError}</span>
				)}

				<Button
					className='mt-[10px]'
					variant={isSubmitting || Object.keys(errors).length > 0 ? 'disabled' : 'default'}
					disabled={isSubmitting || Object.keys(errors).length > 0}
				>
					{isSubmitting ? <Loader /> : 'Zmień hasło'}
				</Button>
			</form>
		</main>
	)
}
