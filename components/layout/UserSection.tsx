'use client'

import Image from 'next/image'
import React from 'react'
import { IconChevronDown, IconMenu2 } from '@tabler/icons-react'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { NavbarElement } from './NavbarElement'
import { usePathname } from 'next/navigation'
import { userMenuElements } from '@/constans/constans'
import { useMenu } from '@/app/context/MenuProvider'
import { Logo } from '..'

type UserSectionProps = {
	userName: string | null | undefined
}

export const UserSection = ({ userName }: UserSectionProps) => {
	const pathname = usePathname()
	const { isMenuOpen, toggleMenu } = useMenu()

	return (
		<div className=' flex h-[82px]  w-full border-b border-solid border-border-color-light px-4 dark:border-border-color-dark '>
			<div className='flex w-full justify-between'>
				<div className='flex items-center gap-3'>
					<span
						onClick={toggleMenu}
						className='block cursor-pointer rounded-full p-[10px] transition-colors hover:bg-element-active-backgorund-light dark:hover:bg-element-active-backgorund-dark'
					>
						<IconMenu2 />
					</span>
					<span className='hidden sm:block'>
						<Logo />
					</span>
				</div>
				{userName && (
					<div className=' ml-auto flex items-center gap-4 pr-[30px]'>
						<span className='text-black dark:text-white'>
							Cześć, <span className='text-btn-violet-color'>{userName}</span>
						</span>

						<Menu as='div' className={'relative'}>
							<Menu.Button>
								<div className=' relative h-[42px] w-[42px] cursor-pointer  rounded-full border-2 border-btn-violet-color shadow-customNew'>
									<Image src={'/userMan.png'} width={42} height={42} alt='userImage' />
									<div className='absolute bottom-[-5px] right-0 flex h-[17px] w-[17px] items-center justify-center rounded-full bg-btn-violet-color'>
										<span className='p-[5px] text-[14px] text-black dark:text-white'>
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
								leaveTo='opacity-0 scale-0'
							>
								<Menu.Items
									className={`absolute right-0 mt-[28px] flex w-[228px] flex-col rounded-[20px] border border-border-color-light bg-element-backgorund-light p-[10px] dark:border-border-color-dark dark:bg-element-backgorund-dark`}
								>
									{userMenuElements.map((element, index) => {
										const isActive = pathname === element.pathname
										return (
											<Menu.Item key={index}>
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
				)}
			</div>
		</div>
	)
}
