'use client'

import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Loader } from './Loader'
import { mutate } from 'swr'
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

type EditQuestionsFormProps = {
	question: string
	answerA: string
	answerB: string
	answerC: string
	answerD: string
	correctAnswer: string
	questionId: number
	quizName: string
}

export const EditQuestionForm = ({
	questionId,
	question,
	answerA,
	answerB,
	answerC,
	answerD,
	correctAnswer,
	quizName,
}: EditQuestionsFormProps) => {
	const [questionIsActive, setQuestionIsActive] = useState(true)
	const [answerAIsActive, setAnswerAIsActive] = useState(true)
	const [answerBIsActive, setAnswerBIsActive] = useState(true)
	const [answerCIsActive, setAnswerCIsActive] = useState(true)
	const [answerDIsActive, setAnswerDIsActive] = useState(true)

	const form = useForm<FormValues>({
		mode: 'onSubmit',
	})

	const { register, control, handleSubmit, formState, getValues } = form
	const { errors, isSubmitting } = formState

	const onSubmit = async (data: FormValues) => {
		if (questionId) {
			try {
				const { question, answerA, answerB, answerC, answerD, correctAnswer } = data
				const res = await fetch('/api/editQuestion', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ questionId, question, answerA, answerB, answerC, answerD, correctAnswer }),
				})
				const result = await res.json()
				if (res.status === 200) {
					notification('success', result.message)
					mutate(`/api/getQuestions?quizName=${quizName}`)
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
		<main className='my-[25px] flex w-full flex-col items-center justify-center gap-[20px]'>
			<span className='text-3xl text-black dark:text-white '>Edytuj pytanie</span>
			<form className='flex w-full flex-col items-center' onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className='flex w-full items-center justify-center gap-[50px]'>
					<div className='w-full max-w-[410px]'>
						{/* question */}
						<div className='relative mb-[5px] w-full max-w-[410px]'>
							<label
								htmlFor='question'
								className={`transition-top-left  pointer-events-none absolute bg-main-bgn-light px-[4px] dark:bg-main-bgn-dark
								 ${questionIsActive || getValues('question') ? 'left-[15px] top-[-10px]' : 'left-[20px] top-[12px]'}`}
							>
								Pytanie*
							</label>
							<textarea
								className='h-[400px] w-full max-w-[410px] resize-none overflow-auto rounded-l-[20px] border-2 border-border-color-light bg-main-bgn-light px-[20px] py-[10px] text-black dark:border-border-color-dark dark:bg-main-bgn-dark dark:text-white'
								id='question'
								defaultValue={question}
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
						<div className='relative mb-[5px] w-full max-w-[410px]'>
							<Controller
								name='correctAnswer'
								control={control}
								defaultValue={correctAnswer}
								rules={{ required: 'Musisz podać poprawną odpowiedź' }}
								render={({ field: { onChange, value, ref } }) => (
									<select
										defaultValue={value}
										onChange={onChange}
										ref={ref}
										className='mt-[5px] bg-inherit text-black dark:text-white'
									>
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

					<div className='w-full max-w-[410px]'>
						{/* answer A */}
						<div className='relative mb-[5px] w-full max-w-[410px]'>
							<label
								htmlFor='answerA'
								className={`transition-top-left  pointer-events-none absolute bg-main-bgn-light px-[4px] dark:bg-main-bgn-dark 
								${answerAIsActive || getValues('answerA') ? 'left-[15px] top-[-10px]' : 'left-[20px] top-[12px]'}`}
							>
								Odpowiedź A*
							</label>
							<textarea
								className='h-[100px] w-full max-w-[410px] resize-none overflow-auto rounded-l-[20px] border-2 border-border-color-light bg-main-bgn-light px-[20px] py-[10px] text-black dark:border-border-color-dark dark:bg-main-bgn-dark dark:text-white '
								id='answerA'
								defaultValue={answerA}
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
						<div className='relative mb-[5px] w-full max-w-[410px]'>
							<label
								htmlFor='answerB'
								className={`transition-top-left  pointer-events-none absolute bg-main-bgn-light px-[4px] dark:bg-main-bgn-dark 
								${answerBIsActive || getValues('answerB') ? 'left-[15px] top-[-10px]' : 'left-[20px] top-[12px]'}`}
							>
								Odpowiedź B*
							</label>
							<textarea
								className='h-[100px] w-full max-w-[410px] resize-none overflow-auto rounded-l-[20px] border-2 border-border-color-light bg-main-bgn-light px-[20px] py-[10px] text-black dark:border-border-color-dark dark:bg-main-bgn-dark dark:text-white '
								id='answerB'
								defaultValue={answerB}
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
						<div className='relative mb-[5px] w-full max-w-[410px]'>
							<label
								htmlFor='answerC'
								className={`transition-top-left  pointer-events-none absolute bg-main-bgn-light px-[4px] dark:bg-main-bgn-dark 
								${answerCIsActive || getValues('answerC') ? 'left-[15px] top-[-10px]' : 'left-[20px] top-[12px]'}`}
							>
								Odpowiedź C*
							</label>
							<textarea
								className='h-[100px] w-full max-w-[410px] resize-none overflow-auto rounded-l-[20px] border-2 border-border-color-light bg-main-bgn-light px-[20px] py-[10px] text-black dark:border-border-color-dark dark:bg-main-bgn-dark dark:text-white '
								id='answerC'
								defaultValue={answerC}
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
						<div className='relative mb-[5px] w-full max-w-[410px]'>
							<label
								htmlFor='answerD'
								className={`transition-top-left  pointer-events-none absolute bg-main-bgn-light px-[4px] dark:bg-main-bgn-dark 
								${answerDIsActive || getValues('answerD') ? 'left-[15px] top-[-10px]' : 'left-[20px] top-[12px]'}`}
							>
								Odpowiedź D*
							</label>
							<textarea
								className='h-[100px] w-full max-w-[410px] resize-none overflow-auto rounded-l-[20px] border-2 border-border-color-light bg-main-bgn-light px-[20px] py-[10px] text-black dark:border-border-color-dark dark:bg-main-bgn-dark dark:text-white '
								id='answerD'
								defaultValue={answerD}
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

				<div className='mt-[20px] w-full max-w-[410px] '>
					<Button
						variant={isSubmitting || Object.keys(errors).length > 0 ? 'disabled' : 'default'}
						disabled={isSubmitting || Object.keys(errors).length > 0}
					>
						{isSubmitting ? <Loader /> : 'Edytuj pytanie'}
					</Button>
				</div>
			</form>
		</main>
	)
}
