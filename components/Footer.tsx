import Image from 'next/image'
import React from 'react'
import { Logo } from '.'

import { IconBrandFacebookFilled, IconBrandInstagram } from '@tabler/icons-react'
import { menuElements } from '@/constans/constans'

export const Footer = () => {
	return (
		<footer className='relative w-full p-[40px] text-black dark:text-white '>
			<div className='flex items-start justify-between'>
				<div className='flex flex-col'>
					<Logo />
					<div className='flex gap-3 '>
						<IconBrandFacebookFilled />
						<IconBrandInstagram />
					</div>
				</div>
				<div className='flex flex-col'>
					<ul>
						{menuElements.map((element, index) => (
							<li key={index}>{element.name}</li>
						))}
					</ul>
				</div>
				<div className='flex flex-col'>
					<span>Wsyzstkie prawa zastrzeżone Quiz4u @ 2023 </span>
				</div>
			</div>
		</footer>
	)
}
