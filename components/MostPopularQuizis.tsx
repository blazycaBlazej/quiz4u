import { quizzes } from '@/constans/constans'
import Image from 'next/image'
import React from 'react'

export const MostPopularQuizis = () => {
	return (
		<section className=''>
			<h2 className='text-black dark:text-white text-4xl text-center lg:text-left'>Popularne Quizy:</h2>
			<div className='flex justify-center flex-wrap gap-3  max-w-[1200px] w-full py-4'>
				{quizzes.map((quiz, index) => (
					<div
						className='relative w-full h-[243px] object-cover border border-border-btn rounded-[20px] overflow-hidden group cursor-pointer md:max-w-[330px] lg:max-w-[337px] xl:max-w-[305px] 2xl:max-w-[355px]'
						key={index}>
						<Image
							className='transform group-hover:scale-105 duration-300 object-cover w-full h-full'
							src={quiz.image}
							width={368}
							height={243}
							alt={quiz.name}
						/>
						<div className='flex items-center justify-center absolute left-0 bottom-0 w-full h-[50px] bg-element-backgorund-light dark:bg-element-backgorund-dark text-2xl text-black dark:text-white '>
							{quiz.name}
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
