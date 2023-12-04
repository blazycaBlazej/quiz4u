'use client'
import { Dialog, Transition } from '@headlessui/react'
import { IconX } from '@tabler/icons-react'
import { Fragment } from 'react'

interface modalProps {
	isOpen: boolean
	closeModal: () => void
	title: string
	children: React.ReactNode
}
export const Modal = ({ isOpen, closeModal, title, children }: modalProps) => {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as='div' className='relative z-[1000]' onClose={closeModal}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-black bg-opacity-50' />
				</Transition.Child>

				<div className='fixed inset-0 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4 text-center'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<Dialog.Panel className='realative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title as='h3' className='mt-[10px] text-lg font-medium leading-6 text-gray-900'>
									{title}
								</Dialog.Title>
								<div className='mt-2'>{children}</div>
								<span
									onClick={closeModal}
									className='absolute right-2 top-2 cursor-pointer transition-colors hover:text-btn-violet-color dark:text-black hover:dark:text-btn-violet-color'
								>
									<IconX />
								</span>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}
