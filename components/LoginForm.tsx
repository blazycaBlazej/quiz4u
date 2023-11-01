'use client'

import React, { useState } from 'react'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader } from './Loader'
import Button from './Button'

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
			console.log(res)
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
	return (
		<main className='flex flex-col justify-center items-center gap-[20px] h-[calc(100vh-404px)] w-full'>
			<span className='text-3xl text-black dark:text-white '>Logowanie</span>
			<form className='max-w-[410px] w-full' onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className='max-w-[410px] w-full relative mb-[20px]'>
					<label
						htmlFor='email'
						className={`absolute  pointer-events-none transition-top-left bg-main-bgn-light dark:bg-main-bgn-dark px-[4px] ${
							emailIsActive || getValues('email') ? 'top-[-10px] left-[15px]' : 'top-[12px] left-[20px]'
						}`}>
						Email*
					</label>
					<input
						className=' h-[50px] max-w-[410px] w-full pl-[20px] pr-[50px] bg-main-bgn-light dark:bg-main-bgn-dark border-2  border-border-color-light dark:border-border-color-dark rounded-[20px] text-black dark:text-white '
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
						className={`absolute  pointer-events-none transition-top-left bg-main-bgn-light dark:bg-main-bgn-dark px-[4px] ${
							passwordIsActive || getValues('password') ? 'top-[-10px] left-[15px]' : 'top-[12px] left-[20px]'
						}`}>
						Hasło*
					</label>
					<input
						className=' h-[50px] max-w-[410px] w-full pl-[20px] pr-[50px] bg-main-bgn-light dark:bg-main-bgn-dark border-2 border-border-color-light dark:border-border-color-dark rounded-[20px] text-black dark:text-white '
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
						className='block absolute top-[12px] right-[20px] cursor-pointer text-black dark:text-white  transition-colors hover:text-light-text dark:hover:text-dark-text'
						onClick={() => setShowPassword(!showPassword)}>
						{showPassword ? <IconEyeOff /> : <IconEye />}
					</span>
					<span className='text-sm text-error-color  block my-[4px]'>{errors.password?.message}</span>
				</div>
				<Link href='/zapomnialem-hasla'>
					<span className='text-black dark:text-white  underline cursor-pointer block text-right my-[10px] transition-colors hover:text-light-text dark:hover:text-dark-text'>
						Zapomniałeś hasła ?
					</span>
				</Link>

				<Button
					variant={isSubmitting || Object.keys(errors).length > 0 ? 'disabled' : 'default'}
					disabled={isSubmitting || Object.keys(errors).length > 0}>
					{isSubmitting ? <Loader /> : 'Zaloguj się'}
				</Button>
			</form>
			{submitingError && <span className='text-sm text-error-color  block my-[4px]'>{submitingError}</span>}

			{/* <DevTool control={control} /> */}

			<Link href='/rejestracja'>
				<span className='text-black dark:text-white  underline cursor-pointer block text-right transition-colors hover:text-light-text dark:hover:text-dark-text'>
					Nie masz konta ? - Kliknji aby utworzyć konto
				</span>
			</Link>
		</main>
	)
}
