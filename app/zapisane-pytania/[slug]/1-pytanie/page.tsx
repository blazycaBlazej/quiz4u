'use server'
import { Loader } from '@/components'
import OneQuestion from '@/components/OneQuestion'
import { getRandomSavedQuestion } from '@/lib/getRandomSavedQuestion'
import { Suspense } from 'react'

const oneSavedQuestionPage = async ({ params }: { params: { slug: string } }) => {
	const quizName = decodeURIComponent(params.slug)
	const data = await getRandomSavedQuestion(quizName)

	if (!data) return <div>Błąd serwera</div>
	if (data.data === null) return <div>{data.message}</div>
	if (data.data)
		return (
			<Suspense fallback={<Loader />}>
				<OneQuestion quizName={quizName} question={data.data[0]} />
			</Suspense>
		)
}

export default oneSavedQuestionPage
