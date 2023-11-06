import { quizzes } from '@/constans/constans'
import Image from 'next/image'
import React from 'react'

export const MostPopularQuizis = () => {
	return (
		<section className=''>
			<h2 className='text-center text-4xl text-black dark:text-white lg:text-left'>Popularne Quizy:</h2>
			<div className='flex w-full max-w-[1200px] flex-wrap  justify-center gap-3 py-4'>
				{quizzes.map((quiz, index) => (
					<div
						className='border-border-btn group relative h-[243px] w-full cursor-pointer overflow-hidden rounded-[20px] border object-cover md:max-w-[330px] lg:max-w-[337px] xl:max-w-[305px] 2xl:max-w-[355px]'
						key={index}
					>
						<Image
							className='h-full w-full transform object-cover duration-300 group-hover:scale-105'
							src={quiz.image}
							width={368}
							height={243}
							alt={quiz.name}
						/>
						<div className='absolute bottom-0 left-0 flex h-[50px] w-full items-center justify-center bg-element-backgorund-light text-2xl text-black dark:bg-element-backgorund-dark dark:text-white '>
							{quiz.name}
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
