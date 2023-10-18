'use server'
import { getQuizDeatails } from '@/lib/getQuizDeatails'
import { EditQuizForm } from '@/components/EditQuizForm'
import { getIsAdminWithRedirect } from '@/lib/getIsAdminWithRedirect'
import { QuizDeatailsHeader } from '@/components/QuizDeatailsHeader'
import { TableComponent } from '@/components/TableComponent'
import { AddQuestionForm } from '@/components/AddQuestionForm'

export default async function AddQuestions({ params }: { params: { slug: string } }) {
	await getIsAdminWithRedirect()
	const quizName = decodeURIComponent(params.slug)
	const quizDeatails = await getQuizDeatails(quizName)

	return <AddQuestionForm quizID={quizDeatails?.id} />
}
