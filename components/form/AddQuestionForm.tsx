'use client'

import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Loader } from '../ui/Loader'
import Button from '../ui/Button'

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
		const { notification } = await import('@/lib/lib')
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

					await notification('success', result.message)
					return
				}
				await notification('error', result.message)
			} catch (e) {
				await notification('error', 'Coś poszło nie tak.')
			}
		} else {
			await notification('error', 'Coś poszło nie tak.')
		}
	}

	return (
		<main className='my-[25px] flex w-full flex-col items-center justify-center gap-[20px]'>
			<span className='text-3xl text-black dark:text-white '>Dodaj nowe pytanie</span>
			<form className='flex w-full flex-col items-center' onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className='flex w-full flex-col items-center justify-center gap-[10px] px-[15px] sm:flex-row sm:gap-[50px]'>
					<div className='w-full sm:max-w-[410px]'>
						{/* question */}
						<div className='relative mb-[5px] w-full sm:max-w-[410px]'>
							<label
								htmlFor='question'
								className={`transition-top-left  pointer-events-none absolute bg-main-bgn-light px-[4px] dark:bg-main-bgn-dark 
								${questionIsActive || getValues('question') ? 'left-[15px] top-[-10px]' : 'left-[20px] top-[12px]'}`}
							>
								Opis quizu*
							</label>
							<textarea
								className='h-[400px] w-full resize-none  overflow-auto rounded-l-[20px] border-2 border-border-color-light bg-main-bgn-light px-[20px] py-[10px] text-black dark:border-border-color-dark dark:bg-main-bgn-dark dark:text-white'
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
							<span className='block text-sm  text-error-color'>{errors.question?.message}</span>
						</div>
						{/* correct Answer */}
						<div className='mb-[5px] w-full'>
							<Controller
								name='correctAnswer'
								control={control}
								rules={{ required: 'Musisz podać poprawną odpowiedź' }}
								render={({ field }) => (
									<select className='mt-[5px] bg-inherit text-black dark:text-white ' {...field}>
										<option className='text-main-bgn-light dark:text-main-bgn-dark' value=''>
											Wybierz prawidłową odpowiedź
										</option>
										<option className='text-main-bgn-light dark:text-main-bgn-dark' value='answerA'>
											Prawidłowa odpowiedź A
										</option>
										<option className='text-main-bgn-light dark:text-main-bgn-dark' value='answerB'>
											Prawidłowa odpowiedź B
										</option>
										<option className='text-main-bgn-light dark:text-main-bgn-dark' value='answerC'>
											Prawidłowa odpowiedź C
										</option>
										<option className='text-main-bgn-light dark:text-main-bgn-dark' value='answerD'>
											Prawidłowa odpowiedź D
										</option>
									</select>
								)}
							/>
							<span className='block text-sm  text-error-color'>{errors.correctAnswer?.message}</span>
						</div>
					</div>

					<div className='w-full sm:max-w-[410px]'>
						{/* answer A */}
						<div className='relative mb-[5px] w-full'>
							<label
								htmlFor='answerA'
								className={`transition-top-left  pointer-events-none absolute bg-main-bgn-light px-[4px] dark:bg-main-bgn-dark 
								${answerAIsActive || getValues('answerA') ? 'left-[15px] top-[-10px]' : 'left-[20px] top-[12px]'}`}
							>
								Odpowiedź A*
							</label>
							<textarea
								className='h-[100px] w-full resize-none overflow-auto rounded-l-[20px] border-2 border-border-color-light bg-main-bgn-light px-[20px] py-[10px] text-black dark:border-border-color-dark dark:bg-main-bgn-dark dark:text-white'
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
							<span className='block text-sm  text-error-color'>{errors.answerA?.message}</span>
						</div>
						{/* answer B */}
						<div className='relative mb-[5px] w-full'>
							<label
								htmlFor='answerB'
								className={`transition-top-left pointer-events-none absolute bg-main-bgn-light px-[4px] dark:bg-main-bgn-dark 
								${answerBIsActive || getValues('answerB') ? 'left-[15px] top-[-10px]' : 'left-[20px] top-[12px]'}`}
							>
								Odpowiedź B*
							</label>
							<textarea
								className='h-[100px] w-full resize-none overflow-auto rounded-l-[20px] border-2 border-border-color-light bg-main-bgn-light px-[20px] py-[10px] text-black dark:border-border-color-dark dark:bg-main-bgn-dark dark:text-white'
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
							<span className='block text-sm  text-error-color'>{errors.answerB?.message}</span>
						</div>
						{/* answer C */}
						<div className='relative mb-[5px] w-full'>
							<label
								htmlFor='answerC'
								className={`transition-top-left pointer-events-none absolute bg-main-bgn-light px-[4px] dark:bg-main-bgn-dark 
								${answerCIsActive || getValues('answerC') ? 'left-[15px] top-[-10px]' : 'left-[20px] top-[12px]'}`}
							>
								Odpowiedź C*
							</label>
							<textarea
								className='h-[100px] w-full resize-none overflow-auto rounded-l-[20px] border-2 border-border-color-light bg-main-bgn-light px-[20px] py-[10px] text-black dark:border-border-color-dark dark:bg-main-bgn-dark dark:text-white '
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
							<span className='block text-sm  text-error-color'>{errors.answerC?.message}</span>
						</div>
						{/* answer D */}
						<div className='relative mb-[5px] w-full'>
							<label
								htmlFor='answerD'
								className={`transition-top-left  pointer-events-none absolute bg-main-bgn-light px-[4px] dark:bg-main-bgn-dark 
								${answerDIsActive || getValues('answerD') ? 'left-[15px] top-[-10px]' : 'left-[20px] top-[12px]'}`}
							>
								Odpowiedź D*
							</label>
							<textarea
								className='h-[100px] w-full resize-none overflow-auto rounded-l-[20px] border-2 border-border-color-light bg-main-bgn-light px-[20px] py-[10px] text-white dark:border-border-color-dark dark:bg-main-bgn-dark dark:text-black'
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
							<span className='block text-sm text-error-color '>{errors.answerD?.message}</span>
						</div>
					</div>
				</div>

				<div className='mt-[20px] w-full max-w-[410px] px-[15px]'>
					<Button
						variant={isSubmitting || Object.keys(errors).length > 0 ? 'disabled' : 'default'}
						disabled={isSubmitting || Object.keys(errors).length > 0}
					>
						{isSubmitting ? <Loader /> : 'Dodaj pytanie'}
					</Button>
				</div>
			</form>
		</main>
	)
}
