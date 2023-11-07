'use server'
import { getQuizDeatails } from '@/lib/getQuizDeatails'
import { EditQuizForm } from '@/components/form/EditQuizForm'
import { getIsAdminWithRedirect } from '@/lib/getIsAdminWithRedirect'

export default async function DeatailsPage({ params }: { params: { slug: string } }) {
	await getIsAdminWithRedirect()
	const quizName = decodeURIComponent(params.slug)
	const quizDeatails = await getQuizDeatails(quizName)

	return <EditQuizForm quizDeatails={quizDeatails} />
}
