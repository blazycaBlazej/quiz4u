'use client'
import { IconDice1, IconEye, IconGrain, IconTrash } from '@tabler/icons-react'
import Link from 'next/link'
import { useState } from 'react'
import { Loader, Modal } from '.'
import { notification } from '@/lib/lib'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface SavedQuestionsCardProps {
	quizName: string
	numberQuestions: number
}

const SavedQuestionsCard = ({ quizName, numberQuestions }: SavedQuestionsCardProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const { data: session } = useSession()
	const router = useRouter()
	function closeModal() {
		setIsOpen(false)
	}

	function openModal() {
		setIsOpen(true)
	}

	const deleteManySavedQuestions = async () => {
		setIsLoading(true)
		try {
			const userID = session?.user?.id
			const res = await fetch('/api/deleteManySavedQuestions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ quizName, userID }),
			})
			const result = await res.json()

			if (res.ok) {
				router.refresh()
				notification('success', result.message)
			} else {
				notification('error', result.message)
			}
		} catch (e) {
			notification('error', 'Coś poszło nie tak.')
		}
		setIsLoading(false)
		closeModal()
	}

	return (
		<div className='flex justify-between items-center p-[20px] colorful-box2 '>
			<div className='flex flex-col'>
				<span className='text-white text-lg'>{quizName}</span>
				<span className='text-sm'>Liczba zapisanych pytań: {numberQuestions}</span>
			</div>
			<div className='flex gap-2'>
				<Link href={`/zapisane-pytania/#`}>
					<span className='p-[5px] text-white cursor-pointer transition-colors hover:text-white/30'>
						<IconEye />
					</span>
				</Link>

				<Link href={`/zapisane-pytania/${quizName}/1-pytanie`}>
					<span className='p-[5px]  text-white cursor-pointer transition-colors hover:text-white/30'>
						<IconDice1 />
					</span>
				</Link>

				<Link href={`/zapisane-pytania/#`}>
					<span className='p-[5px]  text-white cursor-pointer transition-colors hover:text-white/30'>
						<IconGrain />
					</span>
				</Link>

				<Link href={`/zapisane-pytania/#`}>
					<span
						onClick={openModal}
						className='p-[5px]  text-white cursor-pointer transition-colors hover:text-white/30'>
						<IconTrash />
					</span>
				</Link>
			</div>
			<Modal
				isOpen={isOpen}
				closeModal={closeModal}
				title={`Czy na pewno chcesz usumąć zapisane pytania w quizie ${quizName} ?`}>
				<div className='flex justify-center gap-4'>
					<button
						onClick={deleteManySavedQuestions}
						className={` bg-btn-violet-color py-[8px] px-[15px] rounded-[6px] text-white cursor-pointer transition-colors hover:bg-btn-violet-color-hover`}>
						{isLoading ? <Loader /> : 'TAK'}
					</button>
					<button
						onClick={closeModal}
						className={` bg-btn-violet-color py-[8px] px-[15px] rounded-[6px] text-white cursor-pointer transition-colors hover:bg-btn-violet-color-hover`}>
						NIE
					</button>
				</div>
			</Modal>
		</div>
	)
}

export default SavedQuestionsCard
