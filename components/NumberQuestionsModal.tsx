'use client'

import { Loader, Modal } from '.'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Button from './Button'

interface PrintQuizProps {
	quizName: string
	questionsNumber: number | null
	isOpen: boolean
	closeModal: () => void
	type: string
}

interface FormValues {
	numberQuestions: number
}

export const NumberQuestionsModal = ({ quizName, questionsNumber, isOpen, closeModal, type }: PrintQuizProps) => {
	const form = useForm<FormValues>({
		mode: 'onSubmit',
	})

	const { register, handleSubmit, formState } = form
	const { errors, isSubmitting } = formState
	const router = useRouter()

	const onSubmit = async (data: FormValues) => {
		const { numberQuestions } = data

		if (numberQuestions < 2) {
			if (type === 'normal') {
				router.push(`/quiz/${quizName}/1-pytanie`)
			} else if (type === 'savedQuestions') {
				router.push(`/zapisane-pytania/${quizName}/1-pytanie`)
			}
		} else {
			if (type === 'normal') {
				router.push(`/quiz/${quizName}/x-pytan?q=${numberQuestions}&t=randomizeXQuestions`)
			} else if (type === 'savedQuestions') {
				router.push(`/zapisane-pytania/${quizName}/x-pytan?q=${numberQuestions}`)
			}
		}
	}
	const maxQuestions = (questionsNumber as number) > 50 ? 50 : questionsNumber
	return (
		<Modal isOpen={isOpen} closeModal={closeModal} title={`Z ilu pytań ma składać się quiz - ${quizName} ?`}>
			<form className='w-full max-w-[410px]' onSubmit={handleSubmit(onSubmit)} noValidate>
				{typeof questionsNumber === 'number' && questionsNumber > 0 ? (
					<>
						<div className='relative mb-[5px] w-full max-w-[410px]'>
							<label htmlFor='numberInput'>Wybierz liczbę od 1 do {maxQuestions}:</label>
							<input
								className='h-[50px] w-full max-w-[410px] rounded-[20px] border-2 border-border-color-light pl-[20px] pr-[5px] text-gray-900 dark:border-border-color-dark'
								type='number'
								id='numberQuestions'
								autoComplete='off'
								{...register('numberQuestions', {
									required: 'Pole jest wymagane',
									min: {
										value: 1,
										message: 'Minimalna ilość pytań z którą możesz wygenerować quiz to 1.',
									},
									max: {
										value: maxQuestions as number,
										message: `Masksymalna ilość pytań z którą możesz wygenerować quiz to ${maxQuestions}.`,
									},
								})}
							/>

							<span className='my-[4px] block  text-sm text-error-color'>{errors.numberQuestions?.message}</span>
						</div>

						<Button
							variant={isSubmitting || Object.keys(errors).length > 0 ? 'disabled' : 'default'}
							disabled={isSubmitting || Object.keys(errors).length > 0}
						>
							{isSubmitting ? <Loader /> : 'Generuj quiz'}
						</Button>
					</>
				) : (
					<p>Nie możesz wygenerować quizu ponieważ quiz nie posiada pytań.</p>
				)}
			</form>
		</Modal>
	)
}
