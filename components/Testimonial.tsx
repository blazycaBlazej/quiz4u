import React from 'react'
import { IconQuote, IconStarFilled } from '@tabler/icons-react'
import Image from 'next/image'
import { TestimonialProps } from '@/types/types'

interface testimonialObject {
	testimonial: TestimonialProps
}

export const Testimonial = ({ testimonial }: testimonialObject) => {
	const { text, name, image, id } = testimonial
	return (
		<div
			key={id}
			className='colorful-box2 relative flex w-full flex-col items-center justify-between gap-[20px] rounded-[20px]   bg-colorful-gradient-light px-[40px] py-[30px] dark:bg-colorful-gradient-dark md:max-w-[600px]'
		>
			<div className=''>
				<p>{text}</p>
			</div>
			<div className='flex flex-col items-center justify-center overflow-hidden'>
				<Image className='rounded-full ' width={70} height={70} src={image} alt={'avatar'} />
				<span className='color-white mt-2'>{name}</span>
				<div className='flex gap-1 text-[#FFD700]'>
					<IconStarFilled size={18} />
					<IconStarFilled size={18} />
					<IconStarFilled size={18} />
					<IconStarFilled size={18} />
					<IconStarFilled size={18} />
				</div>
			</div>
			<div className='absolute left-[0px] top-[-20px]'>
				<IconQuote size={40} color={'white'} />
			</div>
			<div className='absolute bottom-[-20px] right-[0px]'>
				<IconQuote size={40} color={'white'} />
			</div>
		</div>
	)
}
