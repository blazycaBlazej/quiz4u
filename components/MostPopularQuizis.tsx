import { quizzes } from '@/constans/constans'
import Image from 'next/image'
import React from 'react'

export const MostPopularQuizis = () => {
	return (
		<section>
			<h2 className='text-white text-4xl'>Popularne Quizy:</h2>
			<div className='flex flex-wrap gap-3  max-w-[1200px] w-full mt-[40px]'>
				{quizzes.map((quiz, index) => (
					<div
						className='relative max-w-[360px] h-[243px] w-full border border-border-btn rounded-[20px] overflow-hidden group cursor-pointer'
						key={index}>
						<Image
							className='transform group-hover:scale-105 	duration-300'
							src={quiz.image}
							width={368}
							height={243}
							alt={quiz.name}
						/>
						<div className='flex items-center justify-center absolute left-0 bottom-0 w-full h-[50px] bg-element-backgorund text-2xl  text-white '>
							{quiz.name}
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
