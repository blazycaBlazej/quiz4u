import { quizzes } from '@/constans/constans'
import React from 'react'

export const MostPopularQuizis = () => {
	return (
		<section>
			<h2 className='text-white text-4xl'>Często rozwiązywane Quizy:</h2>
			<div>
				{quizzes.map((quiz, index) => (
					<div className=' ' key={index}></div>
				))}
			</div>
		</section>
	)
}
