import { NavbarElementProps } from '@/types/types'
import React from 'react'
import { signOut } from 'next-auth/react'

export const NavbarElement = ({ index, name, isNew, isActive, isVisible, isAdmin, icon }: NavbarElementProps) => {
	return (
		<li
			onClick={name == 'Wyloguj' ? async () => await signOut() : undefined}
			key={index}
			className={`flex justify-between px-5 text-m py-[13px] transition-colors hover:bg-element-hover-backgorund-light dark:hover:bg-element-hover-backgorund-dark
               
               rounded-[12px] ${
									isActive
										? `text-black dark:text-white bg-element-active-backgorund-light dark:bg-element-active-backgorund-dark`
										: ``
								}`}>
			<span className='flex gap-2 items-center'>
				{icon}

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
					<span className='text-white  py-[4px] px-[8px] text-[12px]'>NEW</span>
				</div>
			)}
		</li>
	)
}
