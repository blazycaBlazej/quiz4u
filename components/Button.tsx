import { cn } from '@/lib/lib'
import { VariantProps, cva } from 'class-variance-authority'
import Link from 'next/link'
import { ButtonHTMLAttributes, FC } from 'react'

const buttonVariants = cva('text-lg text-white transition-colors', {
	variants: {
		variant: {
			default: 'bg-btn-violet-color hover:bg-btn-violet-color-hover cursor-pointer',
			orange: 'bg-[#FF5733] hover:bg-[#FF8D66] cursor-pointer',
			disabled: 'bg-gray-600 hover:bg-gray-600 cursor-not-allowed ',
		},
		rounded: {
			default: 'rounded-[20px]',
			sm: 'rounded-[8px]',
			none: 'rounded-[0px]',
		},
		size: {
			default: 'w-full py-[9px]',
			sm: 'px-[15px] py-[6px]',
		},
	},
	defaultVariants: {
		variant: 'default',
		rounded: 'default',
		size: 'default',
	},
})

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	href?: string
}

const Button: FC<ButtonProps> = ({ className, rounded, variant, href, size, ...props }) => {
	if (href) {
		return (
			<Link href={href}>
				<button className={cn(buttonVariants({ variant, rounded, size, className }))} {...props} />
			</Link>
		)
	}
	return <button className={cn(buttonVariants({ variant, rounded, size, className }))} {...props} />
}

export { Button, buttonVariants }

//buttonVariant({})

// interface ButtonProps {
// 	label: string | JSX.Element
// 	rounded?: number
// 	isDisabled?: boolean
// }

// const Button = ({ label, rounded = 20, isDisabled = false }: ButtonProps) => {
// 	return (
// 		<button
// 			disabled={isDisabled}
// 			style={{ borderRadius: `${rounded}px` }}
// 			className={`w-full py-[9px] text-lg text-white transition-colors  ${
// 				isDisabled
// 					? 'bg-gray-600 hover:cursor-not-allowed hover:bg-gray-600'
// 					: 'bg-btn-violet-color cursor-pointer hover:bg-btn-violet-color-hover'
// 			}`}>
// 			{label}
// 		</button>
// 	)
// }

export default Button
