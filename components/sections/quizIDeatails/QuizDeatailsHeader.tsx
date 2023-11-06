'use client'

import { IconEye, IconTrash } from '@tabler/icons-react'
import Link from 'next/link'
import { useState } from 'react'
import { Loader, Modal } from '../..'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Button from '../../ui/Button'
import { notification } from '@/lib/lib'

interface QuizDeatailsHeaderProps {
	quizName: string
}

interface FormValues {
	quizName: string
}

export const QuizDeatailsHeader = ({ quizName }: QuizDeatailsHeaderProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [submitingError, setSubmitingError] = useState('')

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
		const isCorrect = data?.quizName === quizName
		if (isCorrect) {
			setSubmitingError('')
		} else {
			setSubmitingError('Nazwa quizu nie zgadza się!')
			return
		}

		try {
			const res = await fetch('/api/delateQuiz', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ quizName }),
			})

			const result = await res.json()

			setSubmitingError(result.message)
			if (res.status === 200) {
				setSubmitingError('')
				notification('success', result.message)
				router.replace('/')
				router.refresh()
			}
		} catch (e) {
			setSubmitingError('Błąd serwera, spróbuj zalogować się później.')
		}
	}

	return (
		<div className='header flex items-center justify-between'>
			<h1 className='mx-[20px] my-[15px] text-[27px] text-black dark:text-white '>Quiz: {quizName}</h1>
			<div className='mr-[33px] flex gap-[10px]'>
				<Link href={`/quiz/${quizName}`}>
					<span className='block  cursor-pointer text-black transition-colors hover:text-light-text dark:text-white dark:hover:text-dark-text'>
						<IconEye width='40' height='40' />
					</span>
				</Link>
				<span
					onClick={openModal}
					className='block  cursor-pointer text-black transition-colors hover:text-error-color dark:text-white'
				>
					<IconTrash width='40' height='40' />
				</span>
				<Modal isOpen={isOpen} closeModal={closeModal} title={`Czy na pewnwo chcesz usunąć quiz: ${quizName} ?`}>
					<>
						<span className='mb-[8px] block'>Aby usunąć quiz wpisz poniżej nazwę quizu:</span>
						<form className='w-full max-w-[410px]' onSubmit={handleSubmit(onSubmit)} noValidate>
							<div className='relative mb-[5px] w-full max-w-[410px]'>
								<input
									className=' h-[50px] w-full max-w-[410px] rounded-[20px] border-2  border-border-color-light pl-[20px] pr-[50px] text-gray-900 dark:border-border-color-dark '
									type='text'
									id='quizName'
									autoComplete='off'
									{...register('quizName', {
										required: 'Pole jest wymagane',
									})}
								/>
								<span className='my-[4px] block  text-sm text-error-color'>{errors.quizName?.message}</span>
							</div>
							{submitingError && <span className='my-[4px] block  text-sm text-error-color'>{submitingError}</span>}

							<Button
								variant={isSubmitting || Object.keys(errors).length > 0 ? 'disabled' : 'default'}
								disabled={isSubmitting || Object.keys(errors).length > 0}
							>
								{isSubmitting ? <Loader /> : 'Usuń quiz'}
							</Button>
						</form>
					</>
				</Modal>
			</div>
		</div>
	)
}
