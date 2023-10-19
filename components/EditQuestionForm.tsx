'use client'

import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { Loader } from './Loader'
import { mutate } from 'swr'
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

	const [submitingError, setSubmitingError] = useState<{ message: string; error: boolean }>({
		message: '',
		error: true,
	})

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
					setSubmitingError({ message: result.message, error: false })
					mutate(`/api/getQuestions?quizName=${quizName}`)
					return
				}
				setSubmitingError({ message: result.message, error: true })
			} catch (e) {
				setSubmitingError({ message: 'Coś poszło nie tak.', error: true })
			}
		} else {
			setSubmitingError({ message: 'Coś poszło nie tak.', error: true })
		}
	}

	return (
		<main className='flex flex-col justify-center items-center gap-[20px] w-full my-[25px]'>
			<span className='text-3xl text-white'>Edytuj pytanie</span>
			<form className='w-full flex flex-col items-center' onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className='flex justify-center items-center w-full gap-[50px]'>
					<div className='max-w-[410px] w-full'>
						{/* question */}
						<div className='max-w-[410px] w-full relative mb-[5px]'>
							<label
								htmlFor='question'
								className={`absolute  pointer-events-none transition-top-left bg-main-backgorund px-[4px] ${
									questionIsActive || getValues('question') ? 'top-[-10px] left-[15px]' : 'top-[12px] left-[20px]'
								}`}>
								Pytanie*
							</label>
							<textarea
								className='resize-none overflow-auto h-[400px] max-w-[410px] w-full px-[20px] py-[10px] bg-main-backgorund border-2 border-border-color rounded-l-[20px] text-white'
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
							<span className='text-sm text-error-color  block'>{errors.question?.message}</span>
						</div>
						{/* correct Answer */}
						<div className='max-w-[410px] w-full relative mb-[5px]'>
							<Controller
								name='correctAnswer'
								control={control}
								defaultValue={correctAnswer}
								rules={{ required: 'Musisz podać poprawną odpowiedź' }}
								render={({ field: { onChange, value, ref } }) => (
									<select defaultValue={value} onChange={onChange} ref={ref} className='mt-[5px] bg-inherit text-white'>
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

					<div className='max-w-[410px] w-full'>
						{/* answer A */}
						<div className='max-w-[410px] w-full relative mb-[5px]'>
							<label
								htmlFor='answerA'
								className={`absolute  pointer-events-none transition-top-left bg-main-backgorund px-[4px] ${
									answerAIsActive || getValues('answerA') ? 'top-[-10px] left-[15px]' : 'top-[12px] left-[20px]'
								}`}>
								Odpowiedź A*
							</label>
							<textarea
								className='resize-none overflow-auto h-[100px] max-w-[410px] w-full px-[20px] py-[10px] bg-main-backgorund border-2 border-border-color rounded-l-[20px] text-white'
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
							<span className='text-sm text-error-color  block'>{errors.answerA?.message}</span>
						</div>
						{/* answer B */}
						<div className='max-w-[410px] w-full relative mb-[5px]'>
							<label
								htmlFor='answerB'
								className={`absolute  pointer-events-none transition-top-left bg-main-backgorund px-[4px] ${
									answerBIsActive || getValues('answerB') ? 'top-[-10px] left-[15px]' : 'top-[12px] left-[20px]'
								}`}>
								Odpowiedź B*
							</label>
							<textarea
								className='resize-none overflow-auto h-[100px] max-w-[410px] w-full px-[20px] py-[10px] bg-main-backgorund border-2 border-border-color rounded-l-[20px] text-white'
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
							<span className='text-sm text-error-color  block'>{errors.answerB?.message}</span>
						</div>
						{/* answer C */}
						<div className='max-w-[410px] w-full relative mb-[5px]'>
							<label
								htmlFor='answerC'
								className={`absolute  pointer-events-none transition-top-left bg-main-backgorund px-[4px] ${
									answerCIsActive || getValues('answerC') ? 'top-[-10px] left-[15px]' : 'top-[12px] left-[20px]'
								}`}>
								Odpowiedź C*
							</label>
							<textarea
								className='resize-none overflow-auto h-[100px] max-w-[410px] w-full px-[20px] py-[10px] bg-main-backgorund border-2 border-border-color rounded-l-[20px] text-white'
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
							<span className='text-sm text-error-color  block'>{errors.answerC?.message}</span>
						</div>
						{/* answer D */}
						<div className='max-w-[410px] w-full relative mb-[5px]'>
							<label
								htmlFor='answerD'
								className={`absolute  pointer-events-none transition-top-left bg-main-backgorund px-[4px] ${
									answerDIsActive || getValues('answerD') ? 'top-[-10px] left-[15px]' : 'top-[12px] left-[20px]'
								}`}>
								Odpowiedź D*
							</label>
							<textarea
								className='resize-none overflow-auto h-[100px] max-w-[410px] w-full px-[20px] py-[10px] bg-main-backgorund border-2 border-border-color rounded-l-[20px] text-white'
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
							<span className='text-sm text-error-color block '>{errors.answerD?.message}</span>
						</div>
					</div>
				</div>

				{submitingError.message && (
					<span className={`text-sm block my-[4px] ${submitingError.error ? 'text-error-color' : 'text-green-700'}`}>
						{submitingError.message}
					</span>
				)}
				<button
					disabled={isSubmitting || Object.keys(errors).length > 0}
					className={`relative h-[50px] mt-[20px] max-w-[410px] w-full bg-btn-violet-color  rounded-[20px] text-white cursor-pointer ${
						isSubmitting || Object.keys(errors).length > 0
							? 'bg-gray-600 hover:cursor-not-allowed hover:bg-gray-600'
							: ''
					} transition-colors hover:bg-btn-violet-color-hover`}>
					{isSubmitting ? <Loader /> : 'Edytuj Pytanie'}
				</button>
			</form>

			{/* <DevTool control={control} /> */}
		</main>
	)
}
