'use server'

import { getIsAdminWithRedirect } from '@/lib/getIsAdminWithRedirect'
import { Suspense } from 'react'
import Await from '@/components/Await'
import { getQuestionsWithPagination } from '@/lib/getSavedQuestionsWithPagination'
import Loading from './loading'
import QuestionManager from '@/components/sections/QuestionManager/QuestionManager'

export default async function DeatailsPage({
	params,
	searchParams,
}: {
	params: { slug: string }
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	await getIsAdminWithRedirect()
	const quizName = decodeURIComponent(params.slug)

	const currentPage = typeof searchParams['strona'] === 'string' ? +searchParams['strona'] : 1
	const perPage = typeof searchParams['na-stronie'] === 'string' ? +searchParams['na-stronie'] : 10

	const dataPromise = getQuestionsWithPagination(quizName, currentPage, perPage)

	return (
		<div className='flex w-full flex-col items-center'>
			<h3 className='mt-[25px] w-full text-center  text-3xl text-black dark:text-white'>
				Zarządzaj pytaniami - {quizName}
			</h3>
			<Suspense fallback={<Loading />}>
				<Await promise={dataPromise}>
					{(data) => <QuestionManager data={data} quizName={quizName} currentPage={currentPage} perPage={perPage} />}
				</Await>
			</Suspense>
		</div>
	)
}
