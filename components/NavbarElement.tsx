import { NavbarElementProps } from '@/types/types'
import React from 'react'

export const NavbarElement = ({ index, name, isNew, isActive, icon }: NavbarElementProps) => {
	return (
		<li
			key={index}
			className={`flex justify-between px-5 text-main-font-color text-m py-[10px] transition-colors hover:bg-element-hover-backgorund 
               
               rounded-[12px] ${isActive ? `text-white bg-element-active-backgorund` : ``}`}>
			<span className='flex gap-3'>
				{icon}
				{name}
			</span>
			{isNew && (
				<div className=' bg-btn-violet-color rounded-[12px] shadow-customNew'>
					<span className='text-white py-[4px] px-[8px] text-[12px]'>NEW</span>
				</div>
			)}
		</li>
	)
}
