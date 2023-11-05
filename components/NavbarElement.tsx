import { NavbarElementProps } from '@/types/types'
import React from 'react'
import { signOut } from 'next-auth/react'

export const NavbarElement = ({ index, name, isNew, isActive, isVisible, isAdmin, icon }: NavbarElementProps) => {
	return (
		<li
			onClick={name == 'Wyloguj' ? async () => await signOut() : undefined}
			key={index}
			className={`text-m flex justify-between rounded-[12px] px-5 py-[13px] transition-colors hover:bg-element-hover-backgorund-light
               
               dark:hover:bg-element-hover-backgorund-dark 
			${
				isActive
					? `bg-element-active-backgorund-light text-black dark:bg-element-active-backgorund-dark dark:text-white`
					: ``
			}`}
		>
			<span className='flex items-center gap-2'>
				{icon}

				{isAdmin && (
					<span
						className={`block h-2 w-2  rounded-full shadow 
						${isVisible === true ? 'bg-green-500 shadow-customGreen' : isVisible === false ? 'bg-red-600 shadow-customRed' : ''}`}
					></span>
				)}

				{name}
			</span>
			{isNew && (
				<div className=' rounded-[12px] bg-btn-violet-color shadow-customNew'>
					<span className='px-[8px]  py-[4px] text-[12px] text-white'>NEW</span>
				</div>
			)}
		</li>
	)
}
