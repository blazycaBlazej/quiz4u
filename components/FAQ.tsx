'use client'

import { IconChevronUp } from '@tabler/icons-react'
import { Disclosure, Transition } from '@headlessui/react'
import React from 'react'
import { faq } from '@/constans/constans'

export const FAQ = () => {
	return (
		<section>
			<h2 className='py-4 text-4xl text-black dark:text-white'>FAQs</h2>
			<div className=' flex flex-col gap-4'>
				{faq.map((element, index) => (
					<Disclosure key={index}>
						{({ open }) => (
							<>
								<Disclosure.Button className='flex w-full items-center justify-between rounded-[20px] border bg-element-backgorund-light px-6 py-6 text-left  text-black dark:bg-element-backgorund-dark dark:text-white  '>
									<span className='text-xl'>{element.title}</span>
									<IconChevronUp
										className={`
										${open ? 'rotate-180 ' : 'rotate-0 '} h-9 w-9 transform text-btn-violet-color transition-transform duration-300`}
									/>
								</Disclosure.Button>
								<Transition
									enter=' transition transform ease-out duration-200'
									enterFrom='opacity-0 scale-0'
									enterTo='opacity-100 scale-100'
									leave='transition transform ease-in duration-200'
									leaveFrom='opacity-100 scale-100'
									leaveTo='opacity-0 scale-0'
								>
									<Disclosure.Panel className='z-[-999] px-4 pb-2 pt-4'>
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
