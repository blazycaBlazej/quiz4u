'use client'
import { FormEditQuizValues } from '@/types/types'
import { Switch } from '@headlessui/react'
import { Control, Controller } from 'react-hook-form'

export type AllowedNames = keyof FormEditQuizValues

export interface CustomSwitch {
	name: AllowedNames
	description: string
	defaultValue: boolean | undefined
	control: Control<FormEditQuizValues, any>
}

export const CustomSwitch = ({ name, description, control, defaultValue }: CustomSwitch) => {
	return (
		<div className='flex justify-between items-center'>
			<span className='text-lg'>{description}</span>
			<Controller
				name={name}
				control={control}
				defaultValue={defaultValue}
				render={({ field: { onChange, value } }) => (
					<Switch
						checked={value as boolean} // current state
						onChange={onChange} // update state in 'react-hook-form'
						className={`${value ? 'bg-btn-violet-color' : 'bg-main-font-color'}
relative inline-flex h-[22px] w-[42px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
						<span className='sr-only'>Use setting</span>
						<span
							aria-hidden='true'
							className={`${value ? 'translate-x-5' : 'translate-x-0'}
pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
						/>
					</Switch>
				)}
			/>
		</div>
	)
}
