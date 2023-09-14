'use client'
import Image from 'next/image'
import React from 'react'
import { IconChevronDown } from '@tabler/icons-react'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { NavbarElement } from './NavbarElement'
import { usePathname } from 'next/navigation'
import { userMenuElements } from '@/constans/constans'

export const UserSection = () => {
	const pathname = usePathname()
	return (
		<div className='flex h-[76px] py-[12px] border-b border-solid border-border-color w-full '>
			<div className=' flex items-center gap-4 ml-auto pr-[80px]'>
				<span className='text-white'>
					Cześć, <span className='text-btn-violet-color'>UserName!</span>
				</span>
				<Menu as='div' className={'relative'}>
					<Menu.Button>
						<div className=' relative w-[42px] h-[42px] rounded-full  border-2 border-btn-violet-color cursor-pointer shadow-customNew '>
							<Image src={'/userMan.png'} width={42} height={42} alt='userImage' />
							<div className='flex justify-center items-center absolute bg-btn-violet-color h-[17px] w-[17px] bottom-[-5px] right-0 rounded-full'>
								<span className='text-white text-[14px] p-[5px]'>
									<IconChevronDown size={15} />
								</span>
							</div>
						</div>
					</Menu.Button>
					<Transition
						enter=' transition transform ease-out duration-200'
						enterFrom='opacity-0 scale-0'
						enterTo='opacity-100 scale-100'
						leave='transition transform ease-in duration-200'
						leaveFrom='opacity-100 scale-100'
						leaveTo='opacity-0 scale-0'>
						<Menu.Items
							className={`absolute right-0 flex flex-col w-[228px] mt-[28px] p-[10px] bg-element-backgorund border border-border-color rounded-[20px]`}>
							{userMenuElements.map((element, index) => {
								const isActive = pathname === element.pathname
								return (
									<Menu.Item>
										<Link key={index} href={`${element.pathname}`}>
											<NavbarElement
												index={index}
												name={element.name}
												// isNew={element.isNew}
												isActive={isActive}
												icon={element.icon}
											/>
										</Link>
									</Menu.Item>
								)
							})}
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
		</div>
	)
}
