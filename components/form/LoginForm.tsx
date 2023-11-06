'use client'

import React, { useState } from 'react'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader } from '../ui/Loader'
import Button from '../ui/Button'

type FormValues = {
	email: string
	password: string
}
export const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [emailIsActive, setEmailIsActive] = useState(false)
	const [passwordIsActive, setPasswordIsActive] = useState(false)
	const [submitingError, setSubmitingError] = useState('')

	const form = useForm<FormValues>({
		mode: 'onSubmit',
	})
	const { register, handleSubmit, formState, getValues } = form
	const { errors, isSubmitting } = formState

	const router = useRouter()

	const onSubmit = async (data: FormValues) => {
		const { email, password } = data

		try {
			const res = await signIn('credentials', {
				email,
				password,
				redirect: false,
			})

			if (res?.error === 'error') {
				setSubmitingError('Błąd serwera, spróbuj zalogować się później.')
				return
			}
			if (!res?.ok) {
				setSubmitingError('Dane logowania są nieprawidłowe.')
				return
			}

			router.replace('/')
			router.refresh()
		} catch (e) {
			setSubmitingError('Błąd serwera, spróbuj zalogować się później.')
		}
	}

	const inputChangeHandler = () => {
		if (submitingError !== '') {
			setSubmitingError('')
		}
	}

	return (
		<main className='flex w-full flex-col items-center justify-center gap-[20px]'>
			<span className='text-3xl text-black dark:text-white '>Logowanie</span>
			<form className='w-full max-w-[410px]' onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className='relative mb-[20px] w-full max-w-[410px]'>
					<label
						htmlFor='email'
						className={`transition-top-left  pointer-events-none absolute bg-main-bgn-light px-[4px] dark:bg-main-bgn-dark 
						${emailIsActive || getValues('email') ? 'left-[15px] top-[-10px]' : 'left-[20px] top-[12px]'}`}
					>
						Email*
					</label>
					<input
						className=' h-[50px] w-full max-w-[410px] rounded-[20px] border-2 border-border-color-light bg-main-bgn-light pl-[20px]  pr-[50px] text-black dark:border-border-color-dark dark:bg-main-bgn-dark dark:text-white '
						type='text'
						id='email'
						autoComplete='off'
						{...register('email', {
							required: 'email jest wymagany',
							pattern: {
								value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
								message: 'Nieprawidłowy format maila',
							},
							onChange: inputChangeHandler,
						})}
						onFocus={() => setEmailIsActive(true)}
						onBlur={() => setEmailIsActive(false)}
					/>
					<span className='my-[4px] block  text-sm text-error-color'>{errors.email?.message}</span>
				</div>
				<div className='relative'>
					<label
						htmlFor='password'
						className={`transition-top-left  pointer-events-none absolute bg-main-bgn-light px-[4px] dark:bg-main-bgn-dark
						 ${passwordIsActive || getValues('password') ? 'left-[15px] top-[-10px]' : 'left-[20px] top-[12px]'}`}
					>
						Hasło*
					</label>
					<input
						className=' h-[50px] w-full max-w-[410px] rounded-[20px] border-2 border-border-color-light bg-main-bgn-light pl-[20px] pr-[50px] text-black dark:border-border-color-dark dark:bg-main-bgn-dark dark:text-white '
						type={showPassword ? 'text' : 'password'}
						id='password'
						{...register('password', {
							required: 'Hasło jest wymagane',
							minLength: {
								value: 6,
								message: 'Hasło jest za krótkie',
							},
							onChange: inputChangeHandler,
						})}
						onFocus={() => setPasswordIsActive(true)}
						onBlur={() => setPasswordIsActive(false)}
					/>
					<span
						className='absolute right-[20px] top-[12px] block cursor-pointer text-black transition-colors  hover:text-light-text dark:text-white dark:hover:text-dark-text'
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? <IconEyeOff /> : <IconEye />}
					</span>
					<span className='my-[4px] block  text-sm text-error-color'>{errors.password?.message}</span>
				</div>
				<Link href='/zapomnialem-hasla'>
					<span className='my-[10px] block  cursor-pointer text-right text-black underline transition-colors hover:text-light-text dark:text-white dark:hover:text-dark-text'>
						Zapomniałeś hasła ?
					</span>
				</Link>

				{submitingError && (
					<span className='my-[10px] block text-center text-sm text-error-color'>{submitingError}</span>
				)}

				<Button
					variant={isSubmitting || Object.keys(errors).length > 0 || submitingError !== '' ? 'disabled' : 'default'}
					disabled={isSubmitting || Object.keys(errors).length > 0 || submitingError !== ''}
				>
					{isSubmitting ? <Loader /> : 'Zaloguj się'}
				</Button>
			</form>

			{/* <DevTool control={control} /> */}

			<Link href='/rejestracja'>
				<span className='block cursor-pointer  text-right text-black underline transition-colors hover:text-light-text dark:text-white dark:hover:text-dark-text'>
					Nie masz konta ? - Kliknji aby utworzyć konto
				</span>
			</Link>
		</main>
	)
}
