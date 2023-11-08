'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Loader } from '../ui/Loader'
import Button from '../ui/Button'

type FormValues = {
	name: string
	description: string
}
export default function NewQuizForm() {
	const [nameIsActive, setNameIsActive] = useState(false)
	const [descriptionIsActive, setDescriptionIsActive] = useState(false)

	const form = useForm<FormValues>({
		mode: 'onSubmit',
	})

	const { register, handleSubmit, formState, getValues } = form
	const { errors, isSubmitting } = formState

	const router = useRouter()

	const onSubmit = async (data: FormValues) => {
		const { notification } = await import('@/lib/lib')
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
				await notification('success', result.message)
			} else {
				await notification('error', result.message)
			}
		} catch (e) {
			await notification('error', 'Błąd serwera, spróbuj zalogować się później.')
		}
	}

	return (
		<main className='flex w-full flex-col items-center justify-center gap-[20px]'>
			<span className='text-3xl text-black dark:text-white '>Dodaj nowy Quiz</span>
			<form className='w-full max-w-[410px]' onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className='relative mb-[20px] w-full max-w-[410px]'>
					<label
						htmlFor='quizName'
						className={`transition-top-left pointer-events-none absolute bg-main-bgn-light px-[4px] dark:bg-main-bgn-dark
						 ${nameIsActive || getValues('name') ? 'left-[15px] top-[-10px]' : 'left-[20px] top-[12px]'}`}
					>
						Nazwa quizu
					</label>
					<input
						className=' h-[50px] w-full max-w-[410px] rounded-[20px] border-2 border-border-color-light bg-main-bgn-light pl-[20px] pr-[50px] text-black dark:border-border-color-dark dark:bg-main-bgn-dark dark:text-white '
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
					<span className='my-[4px] block  text-sm text-error-color'>{errors.name?.message}</span>
				</div>

				{/* description */}
				<div className='relative mb-[15px] w-full max-w-[410px]'>
					<label
						htmlFor='description'
						className={`transition-top-left  pointer-events-none absolute bg-main-bgn-light px-[4px] dark:bg-main-bgn-dark ${
							descriptionIsActive || getValues('description') ? 'left-[15px] top-[-10px]' : 'left-[20px] top-[12px]'
						}`}
					>
						Opis quizu*
					</label>
					<textarea
						className='h-[310px] w-full max-w-[410px] resize-none overflow-auto rounded-l-[20px] border-2 border-border-color-light bg-main-bgn-light px-[20px] py-[10px] text-black dark:border-border-color-dark dark:bg-main-bgn-dark dark:text-white '
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
					<span className='my-[4px] block  text-sm text-error-color'>{errors.description?.message}</span>
				</div>

				<Button
					variant={isSubmitting || Object.keys(errors).length > 0 ? 'disabled' : 'default'}
					disabled={isSubmitting || Object.keys(errors).length > 0}
				>
					{isSubmitting ? <Loader /> : 'Dodaj quiz'}
				</Button>
			</form>
		</main>
	)
}
