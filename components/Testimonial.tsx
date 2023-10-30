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
			className='relative flex flex-col items-center justify-between gap-[20px] colorful-box   w-full px-[40px] py-[30px] rounded-[20px] md:max-w-[600px]'>
			<div className=''>
				<p>{text}</p>
			</div>
			<div className='flex flex-col justify-center items-center overflow-hidden'>
				<Image className='rounded-full ' width={70} height={70} src={image} alt={'avatar'} />
				<span className='mt-2 color-white'>{name}</span>
				<div className='flex gap-1 text-[#FFD700]'>
					<IconStarFilled size={18} />
					<IconStarFilled size={18} />
					<IconStarFilled size={18} />
					<IconStarFilled size={18} />
					<IconStarFilled size={18} />
				</div>
			</div>
			<div className='absolute top-[-20px] left-[0px]'>
				<IconQuote size={40} color={'white'} />
			</div>
			<div className='absolute bottom-[-20px] right-[0px]'>
				<IconQuote size={40} color={'white'} />
			</div>
		</div>
	)
}
