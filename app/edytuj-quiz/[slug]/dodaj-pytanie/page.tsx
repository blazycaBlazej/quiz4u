'use server'
import { getQuizDeatails } from '@/lib/getQuizDeatails'
import { EditQuizForm } from '@/components/form/EditQuizForm'
import { getIsAdminWithRedirect } from '@/lib/getIsAdminWithRedirect'
import { QuizDeatailsHeader } from '@/components/sections/quizIDeatails/QuizDeatailsHeader'
import { TableComponent } from '@/components/sections/QuestionManager/QuestionManager'
import { AddQuestionForm } from '@/components/form/AddQuestionForm'

export default async function AddQuestions({ params }: { params: { slug: string } }) {
	await getIsAdminWithRedirect()
	const quizName = decodeURIComponent(params.slug)
	const quizDeatails = await getQuizDeatails(quizName)

	return <AddQuestionForm quizID={quizDeatails?.id} />
}
