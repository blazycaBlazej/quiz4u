'use client'
import useSWR, { mutate } from 'swr'
import { Loader } from '@/components'
import { useSearchParams } from 'next/navigation'
import { XQuestionsQuiz } from '@/components/quiz/XQuestionsQuiz'

const fetcher = async (url: string) => {
	const res = await fetch(url)
	const result = await res.json()

	if (!res.ok) {
		const error = new Error(result.message)

		throw error
	}
	return result.data
}

const xQuestions = ({ params }: { params: { slug: string } }) => {
	const quizName = decodeURIComponent(params.slug)
	const searchParams = useSearchParams()
	const questionString: null | string = searchParams?.get('q')
	const quizType: null | string = searchParams?.get('t')
	let questionNumber: number = 0

	if (questionString) {
		questionNumber = +questionString
	}

	const { data, error, isLoading } = useSWR(
		`/api/getXQuestions?quizName=${quizName}&numberQuestions=${questionNumber}&type=${quizType}`,
		fetcher,
		{ revalidateOnFocus: false, revalidateOnReconnect: false },
	)

	const reloadQuestions = () => {
		mutate(`/api/getXQuestions?quizName=${quizName}&numberQuestions=${questionNumber}&type=${quizType}`)
	}

	const questions = data

	if (!quizType) {
		return <>error</>
	}
	if (isLoading) return <Loader />
	if (error) return <div>{error.message}</div>
	if (data)
		return (
			<XQuestionsQuiz
				questionNumber={questionNumber}
				questions={questions}
				quizName={quizName}
				reloadQuestions={reloadQuestions}
			/>
		)
}

export default xQuestions
