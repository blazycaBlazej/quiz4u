'use client'
import { IconEye, IconTrash } from '@tabler/icons-react'
import Link from 'next/link'
import { useState } from 'react'
import { Loader, Modal } from '.'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Button from './Button'
import { notification } from '@/lib/lib'
import { useMenu } from '@/app/context/MenuProvider'

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
		<div className='header flex justify-between items-center'>
			<h1 className='text-[27px] text-white mx-[20px] my-[15px] '>Quiz: {quizName}</h1>
			<div className='flex gap-[10px] mr-[33px]'>
				<Link href={`/quiz/${quizName}`}>
					<span className='block  cursor-pointer text-white transition-colors hover:text-main-font-color'>
						<IconEye width='40' height='40' />
					</span>
				</Link>
				<span onClick={openModal} className='block  cursor-pointer text-white transition-colors hover:text-error-color'>
					<IconTrash width='40' height='40' />
				</span>
				<Modal isOpen={isOpen} closeModal={closeModal} title={`Czy na pewnwo chcesz usunąć quiz: ${quizName} ?`}>
					<>
						<span className='block mb-[8px]'>Aby usunąć quiz wpisz poniżej nazwę quizu:</span>
						<form className='max-w-[410px] w-full' onSubmit={handleSubmit(onSubmit)} noValidate>
							<div className='max-w-[410px] w-full relative mb-[5px]'>
								<input
									className=' h-[50px] max-w-[410px] w-full pl-[20px] pr-[50px]  border-2  border-border-color rounded-[20px] text-gray-900 '
									type='text'
									id='quizName'
									autoComplete='off'
									{...register('quizName', {
										required: 'Pole jest wymagane',
									})}
								/>
								<span className='text-sm text-error-color  block my-[4px]'>{errors.quizName?.message}</span>
							</div>
							{submitingError && <span className='text-sm text-error-color  block my-[4px]'>{submitingError}</span>}

							<Button
								variant={isSubmitting || Object.keys(errors).length > 0 ? 'disabled' : 'default'}
								disabled={isSubmitting || Object.keys(errors).length > 0}>
								{isSubmitting ? <Loader /> : 'Usuń quiz'}
							</Button>
						</form>
					</>
				</Modal>
			</div>
		</div>
	)
}
