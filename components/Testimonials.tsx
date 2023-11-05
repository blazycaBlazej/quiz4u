import React from 'react'
import { Testimonial } from '.'
import { testimonials } from '@/constans/constans'

export const Testimonials = () => {
	return (
		<section className='w-full '>
			<h2 className='pb-6 text-4xl text-black dark:text-white'>Opinie użytkowników naszej platformy:</h2>
			<div className='flex flex-col gap-4 md:flex-row '>
				{testimonials.map((element) => (
					<Testimonial testimonial={element} />
				))}
			</div>
		</section>
	)
}
