'use client'
import { IconChevronUp } from '@tabler/icons-react'
import { Disclosure, Transition } from '@headlessui/react'
import React from 'react'
import { faq } from '@/constans/constans'

export const FAQ = () => {
	return (
		<section>
			<h2 className='text-4xl text-white py-4'>FAQ</h2>
			<div className=' flex flex-col gap-4'>
				{faq.map((element, index) => (
					<Disclosure key={index}>
						{({ open }) => (
							<>
								<Disclosure.Button className='flex justify-between items-center w-full rounded-[20px] border  bg-element-backgorund text-white px-6 py-6 text-left  '>
									<span className='text-xl'>{element.title}</span>
									<IconChevronUp
										className={`${
											open ? 'rotate-180 ' : 'rotate-0 '
										} h-9 w-9 text-btn-violet-color transform transition-transform duration-300`}
									/>
								</Disclosure.Button>
								<Transition
									enter=' transition transform ease-out duration-200'
									enterFrom='opacity-0 scale-0'
									enterTo='opacity-100 scale-100'
									leave='transition transform ease-in duration-200'
									leaveFrom='opacity-100 scale-100'
									leaveTo='opacity-0 scale-0'>
									<Disclosure.Panel className='px-4 pt-4 pb-2 z-[-999]'>
										<p>{element.answer}</p>
									</Disclosure.Panel>
								</Transition>
							</>
						)}
					</Disclosure>
				))}
			</div>
		</section>
	)
}
