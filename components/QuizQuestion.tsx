import { IconError404, IconStarFilled } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { Loader } from '.'
import useSWR, { mutate } from 'swr'
import { useSession } from 'next-auth/react'
import { notification } from '@/lib/lib'

interface QuizQuestion {
	question: string
	questionNummber?: number
	questionID: number
	quizName: string
}

export const QuizQuestion = ({ question, questionNummber, questionID, quizName }: QuizQuestion) => {
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
		}
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
		<div className='wrapper relative flex justify-start w-full max-w-[600px] text-lg p-[20px] pr-[50px]'>
			{questionNummber ? (
				<>
					{questionNummber}. {question}
				</>
			) : (
				<>{question}</>
			)}

			<span className='absolute top-[20px] right-[20px] cursor-pointer transition-colors hover:text-white'>
				{userID ? (
					isLoading || isLoading2 ? (
						<Loader />
					) : error ? (
						<IconError404 onClick={() => notification('error', 'Coś poszło nie tak.')} width={28} height={28} />
					) : data === true ? (
						<span>
							<IconStarFilled onClick={deletedSavedQuestion} className={`text-white`} width={28} height={28} />
						</span>
					) : (
						<span>
							<IconStarFilled onClick={saveQuestion} width={28} height={28} />
						</span>
					)
				) : (
					<span>
						<IconStarFilled
							onClick={() => notification('error', 'Aby zapisać pytanie musisz się zalogować.')}
							width={28}
							height={28}
						/>
					</span>
				)}
			</span>
		</div>
	)
}
