'use client'

import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Loader } from './Loader'
import Button from './Button'
import { notification } from '@/lib/lib'

type FormValues = {
	question: string
	answerA: string
	answerB: string
	answerC: string
	answerD: string
	correctAnswer: string
}

interface AddQuestionForm {
	quizID: number | undefined
}

export const AddQuestionForm = ({ quizID }: AddQuestionForm) => {
	const [questionIsActive, setQuestionIsActive] = useState(false)
	const [answerAIsActive, setAnswerAIsActive] = useState(false)
	const [answerBIsActive, setAnswerBIsActive] = useState(false)
	const [answerCIsActive, setAnswerCIsActive] = useState(false)
	const [answerDIsActive, setAnswerDIsActive] = useState(false)

	const form = useForm<FormValues>({
		mode: 'onSubmit',
	})

	const { register, control, handleSubmit, formState, getValues, reset } = form
	const { errors, isSubmitting } = formState

	const onSubmit = async (data: FormValues) => {
		if (quizID) {
			try {
				const { question, answerA, answerB, answerC, answerD, correctAnswer } = data
				const res = await fetch('/api/addQuestion', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ quizID, question, answerA, answerB, answerC, answerD, correctAnswer }),
				})
				const result = await res.json()
				if (res.status === 200) {
					reset()
					setQuestionIsActive(false)
					setAnswerAIsActive(false)
					setAnswerBIsActive(false)
					setAnswerCIsActive(false)
					setAnswerDIsActive(false)

					notification('success', result.message)
					return
				}
				notification('error', result.message)
			} catch (e) {
				notification('error', 'Coś poszło nie tak.')
			}
		} else {
			notification('error', 'Coś poszło nie tak.')
		}
	}

	return (
		<main className='flex flex-col justify-center items-center gap-[20px] w-full my-[25px]'>
			<span className='text-3xl text-white'>Dodaj nowe pytanie</span>
			<form className='w-full flex flex-col items-center' onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className='flex flex-col justify-center items-center w-full px-[15px] gap-[10px] sm:flex-row sm:gap-[50px]'>
					<div className='w-full sm:max-w-[410px]'>
						{/* question */}
						<div className='w-full relative mb-[5px] sm:max-w-[410px]'>
							<label
								htmlFor='question'
								className={`absolute  pointer-events-none transition-top-left bg-main-backgorund px-[4px] ${
									questionIsActive || getValues('question') ? 'top-[-10px] left-[15px]' : 'top-[12px] left-[20px]'
								}`}>
								Opis quizu*
							</label>
							<textarea
								className='resize-none overflow-auto h-[400px]  w-full px-[20px] py-[10px] bg-main-backgorund border-2 border-border-color rounded-l-[20px] text-white'
								id='question'
								{...register('question', {
									required: 'Musisz podać pytanie.',
									maxLength: {
										value: 450,
										message: 'Maksymalna długość opisy to 450',
									},
								})}
								onFocus={() => setQuestionIsActive(true)}
								onBlur={() => setQuestionIsActive(false)}
							/>
							<span className='text-sm text-error-color  block'>{errors.question?.message}</span>
						</div>
						{/* correct Answer */}
						<div className='w-full mb-[5px]'>
							<Controller
								name='correctAnswer'
								control={control}
								rules={{ required: 'Musisz podać poprawną odpowiedź' }}
								render={({ field }) => (
									<select className='mt-[5px] bg-inherit text-white' {...field}>
										<option className='text-main-backgorund' value=''>
											Wybierz prawidłową odpowiedź
										</option>
										<option className='text-main-backgorund' value='answerA'>
											Prawidłowa odpowiedź A
										</option>
										<option className='text-main-backgorund' value='answerB'>
											Prawidłowa odpowiedź B
										</option>
										<option className='text-main-backgorund' value='answerC'>
											Prawidłowa odpowiedź C
										</option>
										<option className='text-main-backgorund' value='answerD'>
											Prawidłowa odpowiedź D
										</option>
									</select>
								)}
							/>
							<span className='text-sm text-error-color  block'>{errors.correctAnswer?.message}</span>
						</div>
					</div>

					<div className='w-full sm:max-w-[410px]'>
						{/* answer A */}
						<div className='w-full relative mb-[5px]'>
							<label
								htmlFor='answerA'
								className={`absolute  pointer-events-none transition-top-left bg-main-backgorund px-[4px] ${
									answerAIsActive || getValues('answerA') ? 'top-[-10px] left-[15px]' : 'top-[12px] left-[20px]'
								}`}>
								Odpowiedź A*
							</label>
							<textarea
								className='resize-none overflow-auto h-[100px] w-full px-[20px] py-[10px] bg-main-backgorund border-2 border-border-color rounded-l-[20px] text-white'
								id='answerA'
								{...register('answerA', {
									required: 'Musisz podać odpowiedź A.',
									maxLength: {
										value: 450,
										message: 'Maksymalna długość odpowiedzi A to 450.',
									},
								})}
								onFocus={() => setAnswerAIsActive(true)}
								onBlur={() => setAnswerAIsActive(false)}
							/>
							<span className='text-sm text-error-color  block'>{errors.answerA?.message}</span>
						</div>
						{/* answer B */}
						<div className='w-full relative mb-[5px]'>
							<label
								htmlFor='answerB'
								className={`absolute  pointer-events-none transition-top-left bg-main-backgorund px-[4px] ${
									answerBIsActive || getValues('answerB') ? 'top-[-10px] left-[15px]' : 'top-[12px] left-[20px]'
								}`}>
								Odpowiedź B*
							</label>
							<textarea
								className='resize-none overflow-auto h-[100px] w-full px-[20px] py-[10px] bg-main-backgorund border-2 border-border-color rounded-l-[20px] text-white'
								id='answerB'
								{...register('answerB', {
									required: 'Musisz podać odpowiedź B.',
									maxLength: {
										value: 450,
										message: 'Maksymalna długość odpowiedzi B to 450.',
									},
								})}
								onFocus={() => setAnswerBIsActive(true)}
								onBlur={() => setAnswerBIsActive(false)}
							/>
							<span className='text-sm text-error-color  block'>{errors.answerB?.message}</span>
						</div>
						{/* answer C */}
						<div className='w-full relative mb-[5px]'>
							<label
								htmlFor='answerC'
								className={`absolute  pointer-events-none transition-top-left bg-main-backgorund px-[4px] ${
									answerCIsActive || getValues('answerC') ? 'top-[-10px] left-[15px]' : 'top-[12px] left-[20px]'
								}`}>
								Odpowiedź C*
							</label>
							<textarea
								className='resize-none overflow-auto h-[100px] w-full px-[20px] py-[10px] bg-main-backgorund border-2 border-border-color rounded-l-[20px] text-white'
								id='answerC'
								{...register('answerC', {
									required: 'Musisz podać odpowiedź C.',
									maxLength: {
										value: 450,
										message: 'Maksymalna długość odpowiedzi C to 450.',
									},
								})}
								onFocus={() => setAnswerCIsActive(true)}
								onBlur={() => setAnswerCIsActive(false)}
							/>
							<span className='text-sm text-error-color  block'>{errors.answerC?.message}</span>
						</div>
						{/* answer D */}
						<div className='w-full relative mb-[5px]'>
							<label
								htmlFor='answerD'
								className={`absolute  pointer-events-none transition-top-left bg-main-backgorund px-[4px] ${
									answerDIsActive || getValues('answerD') ? 'top-[-10px] left-[15px]' : 'top-[12px] left-[20px]'
								}`}>
								Odpowiedź D*
							</label>
							<textarea
								className='resize-none overflow-auto h-[100px] w-full px-[20px] py-[10px] bg-main-backgorund border-2 border-border-color rounded-l-[20px] text-white'
								id='answerD'
								{...register('answerD', {
									required: 'Musisz podać odpowiedź D',
									maxLength: {
										value: 450,
										message: 'Maksymalna długość odpowiedzi D to 450.',
									},
								})}
								onFocus={() => setAnswerDIsActive(true)}
								onBlur={() => setAnswerDIsActive(false)}
							/>
							<span className='text-sm text-error-color block '>{errors.answerD?.message}</span>
						</div>
					</div>
				</div>

				<div className='max-w-[410px] w-full mt-[20px] px-[15px]'>
					<Button
						variant={isSubmitting || Object.keys(errors).length > 0 ? 'disabled' : 'default'}
						disabled={isSubmitting || Object.keys(errors).length > 0}>
						{isSubmitting ? <Loader /> : 'Dodaj pytanie'}
					</Button>
				</div>
			</form>
		</main>
	)
}
