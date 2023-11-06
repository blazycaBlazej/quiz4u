import React from 'react'
import { learnTrick } from '@/constans/constans'

export const LearnGuide = () => {
	return (
		<section className=' mt-[50px]  w-full'>
			<h2 className='py-3 text-4xl text-black  dark:text-white'>Poradnik efektywnej nauki:</h2>
			<div className='flex min-w-full items-center justify-between gap-3'>
				<div className='w-full'>
					{learnTrick.map((trick, index) => (
						<div
							className='mb-[50px] flex w-full items-center gap-[40px] odd:justify-start  even:justify-end  even:text-black even:dark:text-white'
							key={index}
						>
							<div className='max-w-14 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-btn-violet-color text-black shadow-customNew  dark:text-white '>
								{index + 1}
							</div>
							<p className='w-full max-w-[800px] '>{trick}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
