'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { FormEditQuizValues, QuizDataDeatails } from '@/types/types'
import { CustomSwitch, Loader } from '.'
import { useRouter } from 'next/navigation'
import Button from './Button'
import { notification } from '@/lib/lib'

interface quizDeatailsComponentProps {
	quizDeatails: QuizDataDeatails | null
}

export const EditQuizForm = ({ quizDeatails }: quizDeatailsComponentProps) => {
	const [nameIsActive, setNameIsActive] = useState(true)
	const [descriptionIsActive, setDescriptionIsActive] = useState(true)

	const form = useForm<FormEditQuizValues>({
		mode: 'onSubmit',
	})

	const { register, control, handleSubmit, formState, getValues } = form
	const { errors, isSubmitting } = formState
	const router = useRouter()
	const onSubmit = async (data: FormEditQuizValues) => {
		try {
			const res = await fetch('/api/editQuiz', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id: quizDeatails?.id, ...data }),
			})
			const result = await res.json()
			if (res.status === 200) {
				router.refresh()
				router.push(result.pathname)
				notification('success', result.message)
			} else {
				notification('error', result.message)
			}
		} catch (e) {
			notification('error', 'Błąd serwera, spróbuj edytować quiz później')
		}
	}

	return quizDeatails ? (
		<div className='flex flex-col justify-center items-center gap-[20px] w-full my-[25px]'>
			<span className='text-3xl text-white px-[15px]'>Edytuj detale quizu</span>
			<div className='form-cointiner w-full flex flex-col px-[15px]'>
				<form className=' w-full' onSubmit={handleSubmit(onSubmit)} noValidate>
					<div className='wrapper w-full flex flex-col  justify-center sm:flex-row sm:gap-[50px]'>
						<div className='left-side w-full sm:max-w-[410px]'>
							{/* name */}
							<div className='w-full relative mb-[20px]'>
								<label
									htmlFor='name'
									className={`absolute  pointer-events-none transition-top-left bg-main-backgorund px-[4px] ${
										nameIsActive || getValues('name') ? 'top-[-10px] left-[15px]' : 'top-[12px] left-[20px]'
									}`}>
									Nazwa quizu
								</label>
								<input
									className=' h-[50px] w-full px-[20px] py-[10px] bg-main-backgorund border-2 border-border-color rounded-[20px] text-white'
									type='text'
									id='name'
									defaultValue={quizDeatails?.name}
									autoComplete='off'
									{...register('name', {
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
									onFocus={() => setNameIsActive(true)}
									onBlur={() => setNameIsActive(false)}
								/>
								<span className='text-sm text-error-color  block my-[4px]'>{errors.name?.message}</span>
							</div>
							{/* description */}
							<div className='w-full relative mb-[5px]'>
								<label
									htmlFor='description'
									className={`absolute  pointer-events-none transition-top-left bg-main-backgorund px-[4px] ${
										descriptionIsActive || getValues('description')
											? 'top-[-10px] left-[15px]'
											: 'top-[12px] left-[20px]'
									}`}>
									Opis quizu*
								</label>
								<textarea
									className='resize-none overflow-auto h-[310px] w-full px-[20px] py-[10px] bg-main-backgorund border-2 border-border-color rounded-l-[20px] text-white'
									id='description'
									defaultValue={quizDeatails?.description}
									{...register('description', {
										maxLength: {
											value: 450,
											message: 'Maksymalna długość opisy to 450',
										},
									})}
									onFocus={() => setDescriptionIsActive(true)}
									onBlur={() => setDescriptionIsActive(false)}
								/>
								<span className='text-sm text-error-color  block my-[4px]'>{errors.description?.message}</span>
							</div>
						</div>

						<div className='flex flex-col gap-2 max-w-[350px] w-full'>
							<span className='text-lg text-white '>Opcje: </span>
							<CustomSwitch
								name={'isActive'}
								control={control}
								defaultValue={quizDeatails?.isActive}
								description='Aktywny:'
							/>
							<CustomSwitch name={'isNew'} control={control} defaultValue={quizDeatails?.isNew} description='Nowy:' />
							<span className='text-lg text-white'>Tryby gry: </span>
							<CustomSwitch
								name={'randomize1Question'}
								control={control}
								defaultValue={quizDeatails?.randomize1Question}
								description='Losuje 1 pytanie:'
							/>
							<CustomSwitch
								name={'randomize20Questions'}
								control={control}
								defaultValue={quizDeatails?.randomize20Questions}
								description='Losuj 40 pytań:'
							/>
							<CustomSwitch
								name={'randomizeXQuestions'}
								control={control}
								defaultValue={quizDeatails?.randomizeXQuestions}
								description='Losuj X pytań:'
							/>
							<CustomSwitch
								name={'rankedGame'}
								control={control}
								defaultValue={quizDeatails?.rankedGame}
								description='Gra rankingowa:'
							/>
							<CustomSwitch
								name={'showAllQuestions'}
								control={control}
								defaultValue={quizDeatails?.showAllQuestions}
								description='Pokaż wszystkie pytania:'
							/>
							<CustomSwitch
								name={'printTest'}
								control={control}
								defaultValue={quizDeatails?.printTest}
								description='Drukuj test z losowymi pytaniami:'
							/>
							<CustomSwitch
								name={'competeWithFriends'}
								control={control}
								defaultValue={quizDeatails?.competeWithFriends}
								description='Rywalizuj ze znajomymi:'
							/>
						</div>
					</div>
					<div className='w-full flex flex-col items-center justify-center gap-[15px] mt-[30px]  '>
						<div className='max-w-[410px] w-full'>
							<Button
								variant={isSubmitting || Object.keys(errors).length > 0 ? 'disabled' : 'default'}
								disabled={isSubmitting || Object.keys(errors).length > 0}>
								{isSubmitting ? <Loader /> : 'Edytuj quiz'}
							</Button>
						</div>
					</div>
				</form>
			</div>
		</div>
	) : (
		<span>Error</span>
	)
}
