import React from 'react'
import { roboto } from '../fonts/fonts'

export const Logo = () => {
	return (
		<div
			className={`${roboto.className} leading-none	flex flex-col gap-0 text-white pt-[26px] pb-[18px] text-center tracking-wide`}>
			<span className='text-[32px]'>
				Quiz<span className='text-btn-violet-color'>4</span>u
			</span>

			<span className='text-[11px] '>- zdaj za pierwszym -</span>
		</div>
	)
}
