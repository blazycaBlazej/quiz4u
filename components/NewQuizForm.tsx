'use client'

import React, { useState } from 'react'
import { IconLoader } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import { useRouter } from 'next/navigation'
import { stringify } from 'querystring'

type FormValues = {
	quizName: string
}
export const NewQuizForm = () => {
	const [quizNameIsActive, setQuizNameIsActive] = useState(false)
	const [submitingError, setSubmitingError] = useState('')

	const form = useForm<FormValues>({
		mode: 'onSubmit',
	})

	const { register, control, handleSubmit, formState, getValues } = form
	const { errors, isSubmitting } = formState

	const router = useRouter()

	const onSubmit = async (data: FormValues) => {
		try {
			const { quizName } = data

			const res = await fetch('/api/createQuiz', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ quizName }),
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
		<main className='flex flex-col justify-center items-center gap-[20px] h-[calc(100vh-404px)] w-full'>
			<span className='text-3xl text-white'>Dodaj nowy Quiz</span>
			<form className='max-w-[410px] w-full' onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className='max-w-[410px] w-full relative mb-[20px]'>
					<label
						htmlFor='quizName'
						className={`absolute  pointer-events-none transition-top-left bg-main-backgorund px-[4px] ${
							quizNameIsActive || getValues('quizName') ? 'top-[-10px] left-[15px]' : 'top-[12px] left-[20px]'
						}`}>
						Nazwa quizu*
					</label>
					<input
						className=' h-[50px] max-w-[410px] w-full pl-[20px] pr-[50px] bg-main-backgorund border-2  border-border-color rounded-[20px] text-white'
						type='text'
						id='quizName'
						autoComplete='off'
						{...register('quizName', {
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
						onFocus={() => setQuizNameIsActive(true)}
						onBlur={() => setQuizNameIsActive(false)}
					/>
					<span className='text-sm text-error-color  block my-[4px]'>{errors.quizName?.message}</span>
				</div>

				<button
					disabled={isSubmitting || Object.keys(errors).length > 0}
					className={`h-[50px] max-w-[410px] w-full bg-btn-violet-color  rounded-[20px] text-white cursor-pointer ${
						isSubmitting || Object.keys(errors).length > 0
							? 'bg-gray-600 hover:cursor-not-allowed hover:bg-gray-600'
							: ''
					} transition-colors hover:bg-btn-violet-color-hover`}>
					{isSubmitting ? <IconLoader /> : 'Dodaj'}
				</button>
			</form>
			{submitingError && <span className='text-sm text-error-color  block my-[4px]'>{submitingError}</span>}

			{/* <DevTool control={control} /> */}
		</main>
	)
}
