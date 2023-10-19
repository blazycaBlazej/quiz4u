'use server'
import { getQuizDeatails } from '@/lib/getQuizDeatails'
import { EditQuizForm } from '@/components/EditQuizForm'
import { getIsAdminWithRedirect } from '@/lib/getIsAdminWithRedirect'
import { QuizDeatailsHeader } from '@/components/QuizDeatailsHeader'
import { TableComponent } from '@/components/TableComponent'
import { AddQuestionForm } from '@/components/AddQuestionForm'
import { getQuestions } from '@/lib/getQuestions'
import { Test } from '@/components/Test'

export default async function DeatailsPage({ params }: { params: { slug: string } }) {
	await getIsAdminWithRedirect()
	const quizName = decodeURIComponent(params.slug)
	// const quizDeatails = await getQuizDeatails(quizName)
	// const questions = await getQuestions(quizName)

	return (
		<div className='w-full flex flex-col items-center'>
			<TableComponent quizName={quizName} />
		</div>
	)
}
