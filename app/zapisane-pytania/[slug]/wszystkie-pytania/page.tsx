import { AllQuestionsListWrapper } from '@/components/AllQuestionsListWrapper'
import Await from '@/components/Await'

import { getSavedQuestionsWithPagination } from '@/lib/getQuestionsWithPagination'
import { Suspense } from 'react'
import Loading from './loading'

const xQuestions = async ({
	params,
	searchParams,
}: {
	params: { slug: string }
	searchParams: { [key: string]: string | string[] | undefined }
}) => {
	const quizName = decodeURIComponent(params.slug)

	const currentPage = typeof searchParams['strona'] === 'string' ? +searchParams['strona'] : 1
	const perPage = typeof searchParams['na-stronie'] === 'string' ? +searchParams['na-stronie'] : 10

	const dataPromise = getSavedQuestionsWithPagination(quizName, currentPage, perPage)

	return (
		<div className='w-full'>
			<h3 className='text-3xl text-white mt-[25px] w-full text-center'>
				Wysztkie zapisane pytania z quizu - {quizName}
			</h3>
			<Suspense fallback={<Loading />}>
				<Await promise={dataPromise}>
					{data => (
						<AllQuestionsListWrapper
							data={data}
							quizName={quizName}
							currentPage={currentPage}
							perPage={perPage}
							type='savedQuestions'
						/>
					)}
				</Await>
			</Suspense>
		</div>
	)
}

export default xQuestions