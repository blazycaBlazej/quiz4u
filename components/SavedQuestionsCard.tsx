'use client'
import { IconDice1, IconEye, IconGrain, IconNumber20Small, IconPrinter, IconTrash } from '@tabler/icons-react'
import Link from 'next/link'
import { useState } from 'react'
import { Loader, Modal } from '.'
import { notification } from '@/lib/lib'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { NumberQuestionsModal } from './NumberQuestionsModal'
import { PrintQuizModal } from './PrintQuizModal'

interface SavedQuestionsCardProps {
	quizName: string
	numberQuestions: number
}

const SavedQuestionsCard = ({ quizName, numberQuestions }: SavedQuestionsCardProps) => {
	const router = useRouter()
	const { data: session } = useSession()

	//delete modal
	const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	function closeDeleteModal() {
		setIsOpenDeleteModal(false)
	}

	function openDeleteModal() {
		setIsOpenDeleteModal(true)
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
		closeDeleteModal()
	}

	//questionNumbermodal
	const [isQuestionsModalOpen, setQuestionsModalOpen] = useState(false)

	function closeQuestionsModal() {
		setQuestionsModalOpen(false)
	}

	function openQuestionsModal() {
		setQuestionsModalOpen(true)
	}

	//print modal
	const [isPrintModalOpen, setPrintModalOpen] = useState(false)

	function closePrintModal() {
		setPrintModalOpen(false)
	}

	function openPrintModal() {
		setPrintModalOpen(true)
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

				{numberQuestions >= 20 && (
					<Link href={`/zapisane-pytania/${quizName}/x-pytan?q=20`}>
						<span className='p-[5px]  text-white cursor-pointer transition-colors hover:text-white/30'>
							<IconNumber20Small />
						</span>
					</Link>
				)}

				<Link href={`/zapisane-pytania/#`}>
					<span
						onClick={openQuestionsModal}
						className='p-[5px]  text-white cursor-pointer transition-colors hover:text-white/30'>
						<IconGrain />
					</span>
					<NumberQuestionsModal
						quizName={quizName}
						questionsNumber={numberQuestions}
						isOpen={isQuestionsModalOpen}
						closeModal={closeQuestionsModal}
						type='savedQuestions'
					/>
				</Link>

				<Link href={`/zapisane-pytania/#`}>
					<span
						onClick={openPrintModal}
						className='p-[5px]  text-white cursor-pointer transition-colors hover:text-white/30'>
						<IconPrinter />
					</span>
					<PrintQuizModal
						quizName={quizName}
						questionsNumber={numberQuestions}
						isOpen={isPrintModalOpen}
						closeModal={closePrintModal}
						type='savedQuestions'
					/>
				</Link>

				<Link href={`/zapisane-pytania/#`}>
					<span
						onClick={openDeleteModal}
						className='p-[5px]  text-white cursor-pointer transition-colors hover:text-white/30'>
						<IconTrash />
					</span>
				</Link>
			</div>
			<Modal
				isOpen={isOpenDeleteModal}
				closeModal={closeDeleteModal}
				title={`Czy na pewno chcesz usumąć zapisane pytania w quizie ${quizName} ?`}>
				<div className='flex justify-center gap-4'>
					<button
						onClick={deleteManySavedQuestions}
						className={` bg-btn-violet-color py-[8px] px-[15px] rounded-[6px] text-white cursor-pointer transition-colors hover:bg-btn-violet-color-hover`}>
						{isLoading ? <Loader /> : 'TAK'}
					</button>
					<button
						onClick={closeDeleteModal}
						className={` bg-btn-violet-color py-[8px] px-[15px] rounded-[6px] text-white cursor-pointer transition-colors hover:bg-btn-violet-color-hover`}>
						NIE
					</button>
				</div>
			</Modal>
		</div>
	)
}

export default SavedQuestionsCard
