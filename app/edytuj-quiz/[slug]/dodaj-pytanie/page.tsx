'use server'

import { getQuizDeatails } from '@/lib/getQuizDeatails'
import { getIsAdminWithRedirect } from '@/lib/getIsAdminWithRedirect'
import { AddQuestionForm } from '@/components/form/AddQuestionForm'

export default async function AddQuestions({ params }: { params: { slug: string } }) {
	await getIsAdminWithRedirect()
	const quizName = decodeURIComponent(params.slug)
	const quizDeatails = await getQuizDeatails(quizName)

	return <AddQuestionForm quizID={quizDeatails?.id} />
}
