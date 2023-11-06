'use server'

import { getIsAdminWithRedirect } from '@/lib/getIsAdminWithRedirect'
import { QuestionManager } from '@/components/sections/QuestionManager'

export default async function DeatailsPage({ params }: { params: { slug: string } }) {
	await getIsAdminWithRedirect()
	const quizName = decodeURIComponent(params.slug)

	return (
		<div className='flex w-full flex-col items-center'>
			<QuestionManager quizName={quizName} />
		</div>
	)
}
