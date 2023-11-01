'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Loader } from './Loader'
import Button from './Button'
import { notification } from '@/lib/lib'

type FormValues = {
	name: string
	description: string
}
export const NewQuizForm = () => {
	const [nameIsActive, setNameIsActive] = useState(false)
	const [descriptionIsActive, setDescriptionIsActive] = useState(false)

	const form = useForm<FormValues>({
		mode: 'onSubmit',
	})

	const { register, control, handleSubmit, formState, getValues } = form
	const { errors, isSubmitting } = formState

	const router = useRouter()

	const onSubmit = async (data: FormValues) => {
		try {
			const { name, description } = data

			const res = await fetch('/api/createQuiz', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, description }),
			})

			const result = await res.json()
			if (res.status === 200) {
				router.replace(result.pathname)
				router.refresh()
				notification('success', result.message)
			} else {
				notification('error', result.message)
			}
		} catch (e) {
			notification('error', 'Błąd serwera, spróbuj zalogować się później.')
		}
	}

	return (
		<main className='flex flex-col justify-center items-center gap-[20px] w-full'>
			<span className='text-3xl text-black dark:text-white '>Dodaj nowy Quiz</span>
			<form className='max-w-[410px] w-full' onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className='max-w-[410px] w-full relative mb-[20px]'>
					<label
						htmlFor='quizName'
						className={`absolute  pointer-events-none transition-top-left bg-main-bgn-light dark:bg-main-bgn-dark px-[4px] ${
							nameIsActive || getValues('name') ? 'top-[-10px] left-[15px]' : 'top-[12px] left-[20px]'
						}`}>
						Nazwa quizu
					</label>
					<input
						className=' h-[50px] max-w-[410px] w-full pl-[20px] pr-[50px] bg-main-bgn-light dark:bg-main-bgn-dark border-2 border-border-color-light dark:border-border-color-dark rounded-[20px] text-black dark:text-white '
						type='text'
						id='quizName'
						autoComplete='off'
						{...register('name', {
							required: 'Nazwa quizu jest wymagana',
							maxLength: {
								value: 15,
								message: 'Maksymalna długość nazwy to 15',
							},
							minLength: {
								value: 5,
								message: 'Minimalna długość nazwy to 5',
							},
						})}
						onFocus={() => setNameIsActive(true)}
						onBlur={() => setNameIsActive(false)}
					/>
					<span className='text-sm text-error-color  block my-[4px]'>{errors.name?.message}</span>
				</div>

				{/* description */}
				<div className='max-w-[410px] w-full relative mb-[15px]'>
					<label
						htmlFor='description'
						className={`absolute  pointer-events-none transition-top-left bg-main-bgn-light dark:bg-main-bgn-dark px-[4px] ${
							descriptionIsActive || getValues('description') ? 'top-[-10px] left-[15px]' : 'top-[12px] left-[20px]'
						}`}>
						Opis quizu*
					</label>
					<textarea
						className='resize-none overflow-auto h-[310px] max-w-[410px] w-full px-[20px] py-[10px] bg-main-bgn-light dark:bg-main-bgn-dark border-2 border-border-color-light dark:border-border-color-dark rounded-l-[20px] text-black dark:text-white '
						id='description'
						{...register('description', {
							maxLength: {
								value: 450,
								message: 'Maksymalna długość opisy to 450',
							},
						})}
						onFocus={() => setDescriptionIsActive(true)}
						onBlur={() => setDescriptionIsActive(false)}
					/>
					<span className='text-sm text-error-color  block my-[4px]'>{errors.description?.message}</span>
				</div>

				<Button
					variant={isSubmitting || Object.keys(errors).length > 0 ? 'disabled' : 'default'}
					disabled={isSubmitting || Object.keys(errors).length > 0}>
					{isSubmitting ? <Loader /> : 'Dodaj quiz'}
				</Button>
			</form>
		</main>
	)
}
