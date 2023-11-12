import { IconDotsVertical } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'
import FlipMove from 'react-flip-move'
import { toast } from 'react-toastify'

interface ManagerOptionsProps {
	rowId: number
	optionIsOpen: null | number
	setOptionIsOpen: (rowId: number | null) => void
	toggleEditHandler: (rowId: number) => void
}

const ManagerOptions: FC<ManagerOptionsProps> = ({ rowId, optionIsOpen, setOptionIsOpen, toggleEditHandler }) => {
	const router = useRouter()

	const toggleMenuHandler = (id: number) => {
		if (optionIsOpen === id) {
			setOptionIsOpen(null)
		} else if (optionIsOpen === null) {
			setOptionIsOpen(id)
		} else {
			setOptionIsOpen(id)
		}
	}

	const delateElementHandler = async (id: number) => {
		setOptionIsOpen(null)

		async function delateElement() {
			try {
				const res = await fetch('/api/question', {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ id }),
				})

				const result = await res.json()
			} catch (e) {
				console.log('Błąd serwera, spróbuj zalogować się później.')
			}
		}

		toast.promise(delateElement, {
			pending: 'Pytanie jest usuwane.',
			success: 'Pytanie zostało usunięte.',
			error: 'Wystąpił błąd podczas usuwania pytania.',
		})

		router.refresh()
	}

	return (
		<div className='relative'>
			<div onClick={() => toggleMenuHandler(rowId)}>
				<IconDotsVertical className='block cursor-pointer text-black transition-colors  hover:text-btn-violet-color dark:text-white' />
			</div>

			<FlipMove
				duration={200}
				easing='linear'
				enterAnimation={{
					from: { transform: 'translateY(-30%) translateX(10%) ', opacity: '0' },
					to: { transform: 'translateY(0) translateX(0) ', opacity: '1' },
				}}
				leaveAnimation={{
					from: { transform: 'translateY(0) translateX(0) ', opacity: '1' },
					to: { transform: 'translateY(-30%) translateX(10%)  ', opacity: '0' },
				}}
			>
				{optionIsOpen === rowId && (
					<div className='absolute right-2 top-1 z-[22221] rounded-lg bg-element-hover-backgorund-light p-[10px] dark:bg-element-hover-backgorund-dark'>
						<ul>
							<li
								onClick={() => delateElementHandler(rowId)}
								className='mb-[5px] cursor-pointer hover:text-btn-violet-color dark:hover:text-white'
							>
								Usuń
							</li>
							<li
								onClick={() => toggleEditHandler(rowId)}
								className='cursor-pointer hover:text-btn-violet-color dark:hover:text-white'
							>
								Edytuj
							</li>
						</ul>
					</div>
				)}
			</FlipMove>
		</div>
	)
}

export default ManagerOptions
