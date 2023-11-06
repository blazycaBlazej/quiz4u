import { cn } from '@/lib/lib'
import { VariantProps, cva } from 'class-variance-authority'
import { ButtonHTMLAttributes, FC } from 'react'

const buttonVariants = cva('w-full max-w-[43px] rounded-[10px] border  p-[10px] transition-colors ', {
	variants: {
		varaint: {
			default: '',
			correct: 'border-none text-white bg-correctAnswerLight dark:bg-correctAnswerDark',
			uncorrect: 'border-none text-white bg-incorrect-answer-quiz',
			unanswered: 'border-none text-white bg-element-active-backgorund-dark/50',
		},
		isActive: {
			default: '',
			active: 'colorful-box2 bg-colorful-gradient-light text-black dark:bg-colorful-gradient-dark dark:text-white',
			activeChecked: 'opacity-30',
		},
		isChecked: {
			default: '',
			checked: 'border-none bg-element-active-backgorund-dark/20',
			unChecked: 'border-element-active-backgorund-dark',
		},
	},
	defaultVariants: {
		varaint: 'default',
		isActive: 'default',
		isChecked: 'default',
	},
})

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const QuestionNavigationButton: FC<ButtonProps> = ({ className, varaint, isActive, isChecked, ...props }) => {
	return <button className={cn(buttonVariants({ varaint, isActive, isChecked, className }))} {...props} />
}
