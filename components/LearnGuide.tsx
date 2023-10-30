import React from 'react'
import { learnTrick } from '@/constans/constans'
import Image from 'next/image'
export const LearnGuide = () => {
	return (
		<section className=' mt-[50px]  w-full'>
			<h2 className='text-4xl text-white py-3'>Poradnik efektywnej nauki:</h2>
			<div className='flex items-center justify-between gap-3 min-w-full'>
				<div className='w-full'>
					{learnTrick.map((trick, index) => (
						<div
							className='flex items-center even:justify-end odd:justify-start even:text-white w-full  gap-[40px] mb-[50px]'
							key={index}>
							<div className='flex justify-center items-center w-14 h-14 rounded-full border border-btn-violet-color shadow-customNew flex-shrink-0 text-white max-w-14 '>
								{index + 1}
							</div>
							<p className='max-w-[800px] w-full '>{trick}</p>
						</div>
					))}
				</div>
				{/* <Image src={'/board.png'} width={400} height={400} alt={'board'} /> */}
			</div>
		</section>
	)
}
