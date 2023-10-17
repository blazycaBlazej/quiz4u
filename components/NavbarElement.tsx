import { NavbarElementProps } from '@/types/types'
import React from 'react'
import { signOut } from 'next-auth/react'

export const NavbarElement = ({ index, name, isNew, isActive, isVisible, isAdmin }: NavbarElementProps) => {
	return (
		<li
			onClick={name == 'Wyloguj' ? async () => await signOut() : undefined}
			key={index}
			className={`flex justify-between px-5 text-main-font-color text-m py-[13px] transition-colors hover:bg-element-hover-backgorund 
               
               rounded-[12px] ${isActive ? `text-white bg-element-active-backgorund` : ``}`}>
			<span className='flex gap-2 items-center'>
				{/* {icon} */}

				{isAdmin && (
					<span
						className={`block h-2 w-2  rounded-full shadow ${
							isVisible === true
								? 'bg-green-500 shadow-customGreen'
								: isVisible === false
								? 'bg-red-600 shadow-customRed'
								: ''
						}`}></span>
				)}

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
