import React from 'react'
import { roboto } from '../../fonts/fonts'

export const Logo = () => {
	return (
		<div
			className={`${roboto.className} flex flex-col gap-0 pb-[18px] pt-[20px] text-center leading-none tracking-wide text-black dark:text-white`}
		>
			<span className='text-[32px]'>
				Quiz<span className='text-btn-violet-color'>4</span>u
			</span>

			<span className='text-[11px] '>- zdaj za pierwszym -</span>
		</div>
	)
}
