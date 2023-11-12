'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormEditQuizValues, QuizDataDeatails } from '@/types/types'
import { CustomSwitch, Loader } from '..'
import { useRouter } from 'next/navigation'
import Button from '../ui/Button'

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
	const { errors, isSubmitting, isDirty } = formState
	const router = useRouter()
	const onSubmit = async (data: FormEditQuizValues) => {
		const { notification } = await import('@/lib/lib')
		if (isDirty) {
			try {
				const res = await fetch('/api/quiz', {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ id: quizDeatails?.id, ...data }),
				})
				const result = await res.json()
				if (res.status === 200) {
					router.refresh()
					router.push(result.pathname)
					await notification('success', result.message)
				} else {
					await notification('error', result.message)
				}
			} catch (e) {
				await notification('error', 'Błąd serwera, spróbuj edytować quiz później')
			}
		} else {
			await notification('error', 'Żadne pole nie zostało zmienione.')
		}
	}

	return quizDeatails ? (
		<div className='my-[25px] flex w-full flex-col items-center justify-center gap-[20px]'>
			<span className='px-[15px] text-3xl text-black  dark:text-white'>Edytuj detale quizu</span>
			<div className='form-cointiner flex w-full flex-col px-[15px]'>
				<form className=' w-full' onSubmit={handleSubmit(onSubmit)} noValidate>
					<div className='wrapper flex w-full flex-col  justify-center sm:flex-row sm:gap-[50px]'>
						<div className='left-side w-full sm:max-w-[410px]'>
							{/* name */}
							<div className='relative mb-[20px] w-full'>
								<label
									htmlFor='name'
									className={`transition-top-left  pointer-events-none absolute bg-main-bgn-light px-[4px] dark:bg-main-bgn-dark 
									${nameIsActive || getValues('name') ? 'left-[15px] top-[-10px]' : 'left-[20px] top-[12px]'}`}
								>
									Nazwa quizu
								</label>
								<input
									className=' h-[50px] w-full rounded-[20px] border-2 border-border-color-light bg-main-bgn-light px-[20px] py-[10px] text-black dark:border-border-color-dark dark:bg-main-bgn-dark dark:text-white'
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
								<span className='my-[4px] block  text-sm text-error-color'>{errors.name?.message}</span>
							</div>
							{/* description */}
							<div className='relative mb-[5px] w-full'>
								<label
									htmlFor='description'
									className={`transition-top-left  pointer-events-none absolute bg-main-bgn-light px-[4px] dark:bg-main-bgn-dark
									 ${descriptionIsActive || getValues('description') ? 'left-[15px] top-[-10px]' : 'left-[20px] top-[12px]'}`}
								>
									Opis quizu*
								</label>
								<textarea
									className='h-[310px] w-full resize-none overflow-auto rounded-l-[20px] border-2 border-border-color-light bg-main-bgn-light px-[20px] py-[10px] text-black dark:border-border-color-dark dark:bg-main-bgn-dark dark:text-white '
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
								<span className='my-[4px] block  text-sm text-error-color'>{errors.description?.message}</span>
							</div>
						</div>

						<div className='flex w-full max-w-[350px] flex-col gap-2'>
							<span className='text-lg text-black dark:text-white'>Opcje: </span>
							<CustomSwitch
								name={'isActive'}
								control={control}
								defaultValue={quizDeatails?.isActive}
								description='Aktywny:'
							/>
							<CustomSwitch name={'isNew'} control={control} defaultValue={quizDeatails?.isNew} description='Nowy:' />
							<span className='text-lg text-black dark:text-white '>Tryby gry: </span>
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
					<div className='mt-[30px] flex w-full flex-col items-center justify-center gap-[15px]  '>
						<div className='w-full max-w-[410px]'>
							<Button
								variant={isSubmitting || Object.keys(errors).length > 0 || !isDirty ? 'disabled' : 'default'}
								disabled={isSubmitting || Object.keys(errors).length > 0 || !isDirty}
							>
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
