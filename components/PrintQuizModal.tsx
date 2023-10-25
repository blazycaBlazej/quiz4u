'use client'

import { useState } from 'react'
import { Loader, Modal } from '.'
import { useForm } from 'react-hook-form'
import { quiz } from '@/types/types'

interface PrintQuizProps {
	quizName: string
	questionsNumber: number
	isOpen: boolean
	closeModal: () => void
	type: string
}

interface FormValues {
	numberQuestions: number
}

export const PrintQuizModal = ({ quizName, questionsNumber, isOpen, closeModal, type }: PrintQuizProps) => {
	const handlePrint = (questionsData: quiz[]) => {
		questionsData.map(question => {
			if (question.correctAnswer === 'answerA') question.correctAnswer = 'A'
			else if (question.correctAnswer === 'answerB') question.correctAnswer = 'B'
			else if (question.correctAnswer === 'answerC') question.correctAnswer = 'C'
			else if (question.correctAnswer === 'answerD') question.correctAnswer = 'D'
		})
		const printWindow = window.open('')
		printWindow?.document.open()
		printWindow?.document.write(`
          <div style="font-family: 'Roboto', sans-serif; line-height: 1; display: flex; flex-direction: column; gap: 0px; color: black; padding-top: 26px; padding-bottom: 18px; text-align: center; letter-spacing: normal;">
	<span style="font-size: 32px;">
		Quiz<span style="color: #5721f2;">4</span>u
	</span>

	<span style="font-size: 11px;">- zdaj za pierwszym -</span>
	<span style="font-size: 11px;">www.quiz4u.pl</span>
	<span style="font-size: 11px;">Test - ${quizName}</span>
</div>

          `)

		questionsData.forEach((question: quiz, index: number) => {
			printWindow?.document.write(`
                    <div style="page-break-inside: avoid;">
                          <strong>${index + 1}. ${question.question}</strong> 
                         <li style="list-style: none; margin-left: 15px;">A. ${question.answerA}</li>
                         <li style="list-style: none; margin-left: 15px;">B. ${question.answerB}</li>
                         <li style="list-style: none; margin-left: 15px;">C. ${question.answerC}</li>
                         <li style="list-style: none; margin-left: 15px;">D. ${question.answerD}</li>
                         <br/>
                    </div>
               `)
		})

		printWindow?.document.write(`
          <div style=" page-break-before: always; font-family: 'Roboto', sans-serif; line-height: 1; display: flex; flex-direction: column; gap: 0px; color: black; padding-top: 26px; padding-bottom: 18px; text-align: center; letter-spacing: normal;">
	<span style="font-size: 32px;">
		Quiz<span style="color: #5721f2;">4</span>u
	</span>

	<span style="font-size: 11px;">- zdaj za pierwszym -</span>
	<span style="font-size: 11px;">www.quiz4u.pl</span>
	<span style="font-size: 11px;">Test - ${quizName}</span>
</div>

          `)

		printWindow?.document.write(`
          <div style="display: flex; justify-content: center;">
          <table style="border-collapse: collapse;">
          <thead>
              <tr>
                   <th style="border: 1px solid black; padding: 5px;">NUMER PYTANIA</th>
                   <th style="border: 1px solid black; padding: 5px;">ODPOWIEDŹ</th>
              </tr>
          </thead>
          <tbody>

          `)

		questionsData.forEach((question: quiz, index: number) => {
			printWindow?.document.write(`
                    <tr>
                          <td style="border: 1px solid black; text-align: center;">${index + 1}</td>
                          <td style="border: 1px solid black; text-align: center;">${question.correctAnswer}</td>
                    </tr>
               `)
		})
		printWindow?.document.write(`
          </tbody>
          </table>
          </div>

          `)

		if (printWindow) {
			printWindow.document.close()
			printWindow.focus()
			printWindow.print()
			printWindow.onafterprint = function () {
				printWindow.close()
			}
		}
	}

	const [submitingError, setSubmitingError] = useState('')

	const form = useForm<FormValues>({
		mode: 'onSubmit',
	})

	const { register, handleSubmit, formState } = form
	const { errors, isSubmitting } = formState

	const onSubmit = async (data: FormValues) => {
		const { numberQuestions } = data

		if (numberQuestions > 0 && numberQuestions <= 50) {
			try {
				let url: string = ''
				if (type === 'normal') {
					url = `/api/getXQuestions?quizName=${quizName}&numberQuestions=${numberQuestions}&type=printTest`
				} else if (type === 'savedQuestions') {
					url = `/api/getXSavedQuestions?quizName=${quizName}&numberQuestions=${numberQuestions}`
				}
				const res = await fetch(url)
				const result = await res.json()
				if (res.status === 200) {
					form.reset()
					closeModal()
					handlePrint(result?.data)
				} else {
					setSubmitingError(result.message)
				}
			} catch (e) {
				setSubmitingError('Błąd serwera, spróbuj zalogować się później.')
			}
		} else {
			setSubmitingError('Podaj prawidłową ilość pytań')
		}
	}
	const maxQuestions = (questionsNumber as number) > 50 ? 50 : questionsNumber
	return (
		<Modal isOpen={isOpen} closeModal={closeModal} title={`Z ilu pytań ma składać się test - ${quizName} ?`}>
			<form className='max-w-[410px] w-full' onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className='max-w-[410px] w-full relative mb-[5px]'>
					<label htmlFor='numberInput'>Wybierz liczbę od 1 do {maxQuestions}:</label>
					<input
						className=' h-[50px] max-w-[410px] w-full pl-[20px] pr-[5px]  border-2  border-border-color rounded-[20px] text-gray-900 '
						type='number'
						id='numberQuestions'
						autoComplete='off'
						{...register('numberQuestions', {
							required: 'Pole jest wymagane',
							min: {
								value: 1,
								message: 'Minimalna ilość pytań którą możesz wydrukować to 1.',
							},
							max: {
								value: maxQuestions,
								message: `Maksymalna ilość pytań którą możesz wydrukować to ${maxQuestions}.`,
							},
						})}
					/>

					<span className='text-sm text-error-color  block my-[4px]'>{errors.numberQuestions?.message}</span>
				</div>
				{submitingError && <span className='text-sm text-error-color  block my-[4px]'>{submitingError}</span>}
				<button
					disabled={isSubmitting || Object.keys(errors).length > 0}
					className={`h-[50px] max-w-[410px] w-full bg-btn-violet-color  rounded-[20px] text-white cursor-pointer ${
						isSubmitting || Object.keys(errors).length > 0
							? 'bg-gray-600 hover:cursor-not-allowed hover:bg-gray-600'
							: ''
					} transition-colors hover:bg-btn-violet-color-hover`}>
					{isSubmitting ? <Loader /> : 'Drukuj test'}
				</button>
			</form>
		</Modal>
	)
}
