import { cn } from '@/lib/lib'
import { VariantProps, cva } from 'class-variance-authority'
import { FC } from 'react'
import React from 'react'

const AnswerViewVariants = cva(
	'wrapper flex-start border-boder-color flex  h-auto w-full max-w-[600px] items-center gap-4 border-t px-[20px] py-[15px] text-lg',
	{
		variants: {
			varaint: {
				default: '',
				correct: 'bg-correctAnswerLight/30 text-black dark:bg-correctAnswerDark/30 dark:text-white',
			},
		},
		defaultVariants: {
			varaint: 'default',
		},
	},
)

interface AnswerViewProps extends VariantProps<typeof AnswerViewVariants> {
	letter: string
	answer: string
}

const AnswerView: FC<AnswerViewProps> = ({ varaint, letter, answer }) => {
	return (
		<div className={cn(AnswerViewVariants({ varaint }))}>
			<div className='flex min-h-[50px]  min-w-[50px] items-center justify-center rounded-full border border-black text-black dark:border-white dark:text-white'>
				{letter}
			</div>
			<div>{answer}</div>
		</div>
	)
}

export default AnswerView
