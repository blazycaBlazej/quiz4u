import React from 'react'
import { Testimonial } from '.'
import { testimonials } from '@/constans/constans'

export const Testimonials = () => {
	return (
		<section className='w-full '>
			<h2 className='text-4xl text-black dark:text-white pb-6'>Opinie użytkowników naszej platformy:</h2>
			<div className='flex gap-4 flex-col md:flex-row '>
				{testimonials.map(element => (
					<Testimonial testimonial={element} />
				))}
			</div>
		</section>
	)
}
