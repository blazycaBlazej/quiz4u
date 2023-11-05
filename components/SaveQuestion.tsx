'use client'

import { useState } from 'react'
import useSWR, { mutate } from 'swr'
import { useSession } from 'next-auth/react'
import { IconError404, IconStar, IconStarFilled } from '@tabler/icons-react'
import { Loader } from '.'
import { notification } from '@/lib/lib'

interface SaveQuestionProps {
	questionID: number
	quizName: string
}

const SaveQuestion = ({ questionID, quizName }: SaveQuestionProps) => {
	const { data: session } = useSession()
	const userID = session?.user?.id
	const [isLoading2, setIsLoading2] = useState(false)

	const fetcher = async (url: string) => {
		if (userID) {
			const res = await fetch(url)
			const result = await res.json()

			if (!res.ok) {
				const error = new Error(result.message)

				throw error
			}

			return result.isSaved
		}

		const error = new Error('Użytkownik jest niezalogowany.')

		throw error
	}

	const { data, error, isLoading } = useSWR(
		`/api/isQuestionIsSaved?questionID=${questionID}&userID=${userID}`,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		},
	)

	const saveQuestion = async () => {
		setIsLoading2(true)
		try {
			const res = await fetch('/api/saveQuestion', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ questionID, userID, quizName }),
			})
			const result = await res.json()

			if (res.ok) {
				mutate(`/api/isQuestionIsSaved?questionID=${questionID}&userID=${userID}`)
				notification('success', result.message)
			} else {
				mutate(`/api/isQuestionIsSaved?questionID=${questionID}&userID=${userID}`)
				notification('error', result.message)
			}
		} catch (e) {
			notification('error', 'Coś poszło nie tak.')
		}
		setIsLoading2(false)
	}

	const deletedSavedQuestion = async () => {
		setIsLoading2(true)
		try {
			const res = await fetch('/api/deleteOneSavedQuestion', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ questionID, userID }),
			})
			const result = await res.json()

			if (res.ok) {
				mutate(`/api/isQuestionIsSaved?questionID=${questionID}&userID=${userID}`)
				notification('success', result.message)
			} else {
				mutate(`/api/isQuestionIsSaved?questionID=${questionID}&userID=${userID}`)
				notification('error', result.message)
			}
		} catch (e) {
			notification('error', 'Coś poszło nie tak.')
		}
		setIsLoading2(false)
	}
	return (
		<>
			{userID ? (
				isLoading || isLoading2 ? (
					<Loader />
				) : error ? (
					<IconError404 onClick={() => notification('error', 'Coś poszło nie tak.')} width={28} height={28} />
				) : data === true ? (
					<span>
						<IconStarFilled
							onClick={deletedSavedQuestion}
							className={`text-light-text hover:text-light-text/50 dark:text-dark-text hover:dark:text-dark-text/60`}
							width={28}
							height={28}
						/>
					</span>
				) : (
					<span>
						<IconStar
							className='transition-colors hover:text-light-text/50 dark:hover:text-dark-text/60'
							onClick={saveQuestion}
							width={28}
							height={28}
						/>
					</span>
				)
			) : (
				<span>
					<IconStar
						onClick={() => notification('error', 'Aby zapisać pytanie musisz się zalogować.')}
						width={28}
						height={28}
					/>
				</span>
			)}
		</>
	)
}

export default SaveQuestion
