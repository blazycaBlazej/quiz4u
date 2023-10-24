'use client'

import { useState } from 'react'
import { Loader, Modal } from '.'
import { useForm } from 'react-hook-form'
import { quiz } from '@/types/types'
import { useRouter } from 'next/navigation'
import { IconGrain } from '@tabler/icons-react'

interface PrintQuizProps {
	quizName: string
	questionsNumber: number | null
}

interface FormValues {
	numberQuestions: number
}

export const NumberQuestionsModal = ({ quizName, questionsNumber }: PrintQuizProps) => {
	const [isOpen, setIsOpen] = useState(false)
	console.log('xddd')
	function closeModal() {
		setIsOpen(false)
	}

	function openModal() {
		setIsOpen(true)
	}

	const form = useForm<FormValues>({
		mode: 'onSubmit',
	})

	const { register, handleSubmit, formState } = form
	const { errors, isSubmitting } = formState
	const router = useRouter()

	const onSubmit = async (data: FormValues) => {
		const { numberQuestions } = data
		console.log(numberQuestions)
		if (numberQuestions < 2) {
			router.push(`/quiz/${quizName}/1-pytanie`)
		} else {
			router.push(`/quiz/${quizName}/x-pytan?q=${numberQuestions}&t=randomizeXQuestions`)
		}
	}
	const maxQuestions = (questionsNumber as number) > 50 ? 50 : questionsNumber
	return (
		<>
			<Modal isOpen={isOpen} closeModal={closeModal} title={`Z ilu pytań ma składać się quiz - ${quizName} ?`}>
				<form className='max-w-[410px] w-full' onSubmit={handleSubmit(onSubmit)} noValidate>
					{typeof questionsNumber === 'number' && questionsNumber > 0 ? (
						<>
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
											message: 'Minimalna ilość pytań którą możesz wygenerować quiz to 1.',
										},
										max: {
											value: maxQuestions as number,
											message: `Masksymalna ilość pytań którą możesz wygenerować quiz to ${maxQuestions}.`,
										},
									})}
								/>

								<span className='text-sm text-error-color  block my-[4px]'>{errors.numberQuestions?.message}</span>
							</div>

							<button
								disabled={isSubmitting || Object.keys(errors).length > 0}
								className={`h-[50px] max-w-[410px] w-full bg-btn-violet-color  rounded-[20px] text-white cursor-pointer ${
									isSubmitting || Object.keys(errors).length > 0
										? 'bg-gray-600 hover:cursor-not-allowed hover:bg-gray-600'
										: ''
								} transition-colors hover:bg-btn-violet-color-hover`}>
								{isSubmitting ? <Loader /> : 'Generuj quiz'}
							</button>
						</>
					) : (
						<p>Nie możesz wygenerować quizu ponieważ quiz nie posiada pytań.</p>
					)}
				</form>
			</Modal>
			<li onClick={openModal} className='flex gap-2 transition-colors cursor-pointer hover:text-white'>
				<IconGrain className='text-white' />
				<span>Losuj x pytań</span>
			</li>
		</>
	)
}
