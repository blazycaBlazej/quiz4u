'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { useRouter } from 'next/navigation'
import { Loader } from './Loader'

type FormValues = {
	name: string
	description: string
}
export const NewQuizForm = () => {
	const [nameIsActive, setNameIsActive] = useState(false)
	const [descriptionIsActive, setDescriptionIsActive] = useState(false)
	const [submitingError, setSubmitingError] = useState('')

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
			}
			setSubmitingError(result.message)
		} catch (e) {
			setSubmitingError('Błąd serwera, spróbuj zalogować się później.')
		}
	}

	return (
		<main className='flex flex-col justify-center items-center gap-[20px] w-full'>
			<span className='text-3xl text-white'>Dodaj nowy Quiz</span>
			<form className='max-w-[410px] w-full' onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className='max-w-[410px] w-full relative mb-[20px]'>
					<label
						htmlFor='quizName'
						className={`absolute  pointer-events-none transition-top-left bg-main-backgorund px-[4px] ${
							nameIsActive || getValues('name') ? 'top-[-10px] left-[15px]' : 'top-[12px] left-[20px]'
						}`}>
						Nazwa quizu
					</label>
					<input
						className=' h-[50px] max-w-[410px] w-full pl-[20px] pr-[50px] bg-main-backgorund border-2  border-border-color rounded-[20px] text-white'
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
				<div className='max-w-[410px] w-full relative mb-[5px]'>
					<label
						htmlFor='description'
						className={`absolute  pointer-events-none transition-top-left bg-main-backgorund px-[4px] ${
							descriptionIsActive || getValues('description') ? 'top-[-10px] left-[15px]' : 'top-[12px] left-[20px]'
						}`}>
						Opis quizu*
					</label>
					<textarea
						className='resize-none overflow-auto h-[310px] max-w-[410px] w-full px-[20px] py-[10px] bg-main-backgorund border-2 border-border-color rounded-l-[20px] text-white'
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

				<button
					disabled={isSubmitting || Object.keys(errors).length > 0}
					className={`relative h-[50px] mt-[20px] max-w-[410px] w-full bg-btn-violet-color  rounded-[20px] text-white cursor-pointer ${
						isSubmitting || Object.keys(errors).length > 0
							? 'bg-gray-600 hover:cursor-not-allowed hover:bg-gray-600'
							: ''
					} transition-colors hover:bg-btn-violet-color-hover`}>
					{isSubmitting ? <Loader /> : 'Dodaj quiz'}
				</button>
			</form>
			{submitingError && <span className='text-sm text-error-color block my-[4px]'>{submitingError}</span>}

			{/* <DevTool control={control} /> */}
		</main>
	)
}
